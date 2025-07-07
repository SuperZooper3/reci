import json, random, textwrap, itertools, datetime, pathlib
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

# -------- CONFIG --------
JSON_PATH     = "recipes_raw_nosource_ar.json"
N_RECIPES     = 10_000
N_EXTRA_USERS = 1_500
N_REVIEWS     = 25_000
N_FOLLOWS     = 30_000
N_SAVES       = 20_000
SEED_SQL      = "../big_seed.sql"

# LOAD & SAMPLE
with open(JSON_PATH, "r", encoding="utf8") as f:
    raw = json.load(f) # one big dict keyed by id
records = list(raw.values())
# Filter out empty recipes that are missing required fields
valid_records = [r for r in records if 'title' in r and 'ingredients' in r and 'instructions' in r]
print(f"Filtered {len(records) - len(valid_records)} invalid recipes out of {len(records)} total")
random.seed(1)
recipes = random.sample(valid_records, N_RECIPES)

# Image generator
FOODISH_CATS = [
    "biryani", "burger", "dessert", "dosa",
    "idly", "pasta", "pizza", "rice",
]

def foodish_url():
    """
    Deterministically builds a URL that Foodish already hosts.
    """
    cat = random.choice(FOODISH_CATS)
    idx = random.randint(1, 34)
    return f"https://foodish-api.com/images/{cat}/{cat}{idx}.jpg"


# ACCOUNT TABLE
#   - one author per recipe
#   - plus a pool of extra users for reviews/follows/saves
accounts = []
uid_counter = itertools.count(start=1)
author_ids  = {}

def new_account():
    return {
        "id": next(uid_counter),
        "display_name": fake.first_name(),
        "username": fake.unique.user_name(),
        "password": '$2b$10$SdTudisOtiAxevwmzYt4xOuP3bEV7FDnL8NuEc0aI6pQilnNfOkWa', # 123
        "created_at": datetime.combine(fake.date_between("-5y"), datetime.min.time()) + timedelta(
            seconds=fake.random_int(min=0, max=86399)
        )
    }

for r in recipes:
    aid = new_account()
    accounts.append(aid)
    author_ids[r["title"]] = aid["id"] # map recipe to author_id

for _ in range(N_EXTRA_USERS):
    accounts.append(new_account())

# RECIPE TABLE
def ingredients_md(lst):
    return "\n".join(f"- {item}" for item in lst)

def format_instructions(instructions_text):
    """Format instructions with proper line breaks and paragraph separation."""
    if not instructions_text:
        return ""
    
    # Split by existing newlines and clean up
    lines = instructions_text.split('\n')
    formatted_lines = []
    
    for line in lines:
        line = line.strip()
        if line:  # Skip empty lines
            # Wrap long lines at reasonable length
            if len(line) > 80:
                wrapped = textwrap.fill(line, width=80, break_long_words=False, break_on_hyphens=False)
                formatted_lines.extend(wrapped.split('\n'))
            else:
                formatted_lines.append(line)
    return '\n\n'.join(formatted_lines)

recipes_rows = []
for r in recipes:
    formatted_instructions = format_instructions(r["instructions"])
    
    body = textwrap.dedent(f"""
        ## Ingredients
        {ingredients_md(r["ingredients"])}

        ## Instructions
        {formatted_instructions}
    """).strip()
    
    recipes_rows.append({
        "title":         r["title"].replace("'", "''"),   # escape single quotes
        "body":          body.replace("'", "''"),
        "author_id":     author_ids[r["title"]],
        "created_at":    datetime.combine(fake.date_between("-5y"), datetime.min.time()) + timedelta(
            seconds=fake.random_int(min=0, max=86399)
        )
    })

# REVIEWS
# First, assign each recipe a "true quality" rating
recipe_true_ratings = {}
for i, rec in enumerate(recipes_rows):
    recipe_id = i + 1  # serial PK starts at 1
    # Generate a base quality rating with slight bias toward higher ratings
    true_rating = random.gauss(mu=7.5, sigma=1.8)
    true_rating = max(1.0, min(10.0, true_rating))
    recipe_true_ratings[recipe_id] = round(true_rating, 1)

def generate_rating_for_recipe(recipe_id):
    """Generate a rating for a specific recipe, distributed around its true quality."""
    true_rating = recipe_true_ratings[recipe_id]
    # Add some noise around the true rating (smaller sigma for more realistic clustering)
    rating = random.gauss(mu=true_rating, sigma=0.8)
    # Clamp to valid range (1.0 to 10.0)
    rating = max(1.0, min(10.0, rating))
    return round(rating, 1)

reviews = []
for _ in range(N_REVIEWS):
    acc = random.choice(accounts)
    rec = random.choice(recipes_rows)
    recipe_id = recipes_rows.index(rec) + 1
    
    reviews.append({
        "description": fake.sentence(nb_words=12).replace("'", "''"),
        "rating":      generate_rating_for_recipe(recipe_id),
        "recipe_id":   recipe_id,
        "account_id":  acc["id"],
        "created_at":  datetime.combine(fake.date_between(start_date=acc["created_at"]), datetime.min.time()) + timedelta(
            seconds=fake.random_int(min=0, max=86399)
        )
    })

# REVIEW IMAGES
review_images = []
IMG_PER_REVIEW = (0, 3)

for rid, _row in enumerate(reviews, start=1):
    for _ in range(random.randint(*IMG_PER_REVIEW)):
        review_images.append({
            "url"      : foodish_url(),
            "alt"      : fake.sentence(nb_words=5).rstrip('.').replace("'", "''"),
            "review_id": rid
        })

# FOLLOWERS & SAVED
uids = [u["id"] for u in accounts]
def unique_pairs(n):
    seen = set()
    while len(seen) < n:
        a, b = random.sample(uids, 2)
        if (a, b) not in seen:
            seen.add((a, b))
    return list(seen)

followers_pairs = unique_pairs(N_FOLLOWS)
saves_pairs = set()
while len(saves_pairs) < N_SAVES:
    saves_pairs.add((random.choice(uids), random.randrange(1, N_RECIPES+1)))

# EMIT SQL
def insert_sql(table, cols, rows):
    col_list = ",".join(cols)
    tuples = ",".join(
        "(" + ",".join(str(v) if isinstance(v, (int,float))
                        else f"'{v}'" for v in (row[c] for c in cols)) + ")"
        for row in rows
    )
    return f"INSERT INTO {table} ({col_list}) VALUES\n{tuples};\n\n"

with open(SEED_SQL, "w", encoding="utf8") as f:
    # Begin transaction for atomicity
    f.write("BEGIN;\n")
    # Accounts
    f.write(insert_sql("Account",
                       ["display_name","username","password","created_at"],
                       accounts))
    # Recipes (id uses SERIAL, so omit)
    f.write(insert_sql("Recipe",
                       ["title","body","author_id","created_at"],
                       recipes_rows))
    # Reviews
    f.write(insert_sql("Review",
                       ["description","rating","recipe_id","account_id","created_at"],
                       reviews))
    # Review images
    f.write(insert_sql("ReviewImage",
                       ["url","alt","review_id"],
                       review_images))
    # Followers
    f.write(insert_sql("Follower",
                       ["follower_id","followee_id"],
                       [{"follower_id":a,"followee_id":b} for a,b in followers_pairs]))
    # Saves
    f.write(insert_sql("SavedRecipe",
                       ["account_id","recipe_id"],
                       [{"account_id":a,"recipe_id":r} for a,r in saves_pairs]))
    # Commit transaction
    f.write("COMMIT;\n")

print(f"Wrote {SEED_SQL} with:"
      f"\n{len(accounts)} accounts"
      f"\n{len(recipes_rows)} recipes"
      f"\n{len(reviews)} reviews"
      f"\n{len(review_images)} review images"
      f"\n{len(followers_pairs)} follower edges"
      f"\n{len(saves_pairs)} saved-recipe rows")
