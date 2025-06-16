# Recipe Database Seed Data Generator

This directory contains scripts to generate seed data for the recipe database using real recipe data from a JSON file.

## Setup Instructions

## Requirements

- Python 3.9+
- [Click Download Recipes from the Eightportions Recipes Dataset](https://eightportions.com/datasets/Recipes/#fn:1) and unzip the folder and place ONLY the 'recipes_raw_nosource_ar.json' file in the seed directory
- Dependencies listed in `requirements.txt`

### 1. Create and Activate Virtual Environment

**On Windows (PowerShell):**
```powershell
# Navigate to the seed directory
cd backend/sql/seed

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```cmd
# Navigate to the seed directory
cd backend\sql\seed

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate.bat
```

**On macOS/Linux:**
```bash
# Navigate to the seed directory
cd backend/sql/seed

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the ETL Script

```bash
python etl_from_json.py
```

This will:
- Load recipe data from `recipes_raw_nosource_ar.json`
- Generate fake user accounts, reviews, follows, and saved recipes
- Create a `big_seed.sql` file directly in the parent SQL directory (`../big_seed.sql`)

The application will automatically use `big_seed.sql` if it exists, otherwise it will fall back to the default `seed.sql`.

### 4. Deactivate Virtual Environment (Optional)

When you're done, you can deactivate the virtual environment:

```bash
deactivate
```

## Configuration

You can modify the following constants in `etl_from_json.py` to adjust the generated data:

- `N_RECIPES`: Number of recipes to sample (default: 10,000)
- `N_EXTRA_USERS`: Additional users beyond recipe authors (default: 1,500)
- `N_REVIEWS`: Number of reviews to generate (default: 25,000)
- `N_FOLLOWS`: Number of follow relationships (default: 30,000)
- `N_SAVES`: Number of saved recipe relationships (default: 20,000)
