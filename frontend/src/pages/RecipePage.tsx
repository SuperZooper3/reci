import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RecipeModal from '../components/recipeModal';
import { getRecipe } from '@/services/recipeService';
import { Review, type Recipe } from '../../../shared-types';
import { useParams } from 'react-router-dom';
import { getRecipeAverageRating, getRecipeRatings } from '@/services/reviewService';
import { getAccount } from '@/services/accountService';

function RecipePage() {  
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [avgRating, setAvgRating] = useState<number>();
  const [author, setAuthor] = useState<string | null>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchRecipeInformation = async () => {
    try {
      const recipe = await getRecipe(id!);
      const avgRating = await getRecipeAverageRating(id!); 
      const author = await getAccount(String(recipe.author_id));
      const reviews = await getRecipeRatings(String(recipe.id));
      setRecipe(recipe);
      setAvgRating(avgRating.avg);
      setAuthor(author.username);
      setReviews(reviews);
    } catch {
      alert("An error occurred while fetching recipes.");
    }
  };

  useEffect(() => {
    fetchRecipeInformation();
  }, []);

  if (!recipe) {
    return <>Loading...</>;
  }

  //click through to recipe uploader account/ review accounts?
  return (
    <>
      <div className="m-8 w-full flex !flex-row gap-6 items-center">
        <div>
          <h1 className="text-3xl">{recipe!.title}</h1>
          <span>
            By {author ? author : 'Unknown user'} on{' '}
            {new Date(recipe!.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="w-10 h-10 text-xl border-2 rounded-full flex items-center justify-center">
          {avgRating}
        </div>
      </div>
      <div className="recipe-body prose max-w-none">
        <ReactMarkdown>{recipe!.body}</ReactMarkdown>
      </div> 
      <div>
        <div className="text-3xl">
          Cooks
          {reviews.length > 0 ? (
            <>
              <h2>Displaying top 10 reviews:</h2>
              <ul>
                {reviews.map((review) => (
                  <li key={review.id} className="recipe-card p-4 mb-4 border rounded-lg shadow">
                    <h2>{recipe.title}</h2>
                    <div className="recipe-date text-sm text-gray-500 mb-2">
                      Created: {new Date(recipe.created_at).toLocaleDateString()}
                    </div>
                    <div className="recipe-body prose max-w-none">
                      <ReactMarkdown>{recipe.body}</ReactMarkdown>
                    </div>
                    <div className="recipe-meta mt-4 text-xs text-gray-400 flex gap-4">
                      <span>ID: {recipe.id}</span>
                      {recipe.author_id && <span>Author ID: {recipe.author_id}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No recipes to display</p>
          )}
        </div>
      </div>
      <div>
        <RecipeModal />
      </div>
    </>
  )
}

export default RecipePage
