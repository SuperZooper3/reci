import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RecipeModal from '../components/recipeModal';
import { getRecipe } from '@/services/recipeService';
import type { Review, Recipe } from '../../../shared-types';
import { Link, useParams } from 'react-router-dom';
import { getRecipeRatings } from '@/services/reviewService';
import ReviewCard from '@/components/reviewCard';
import { getColorBasedOnRating } from '@/utils/ratingUtils';

function RecipePage() {  
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchRecipeInformation = async () => {
    try {
      const recipe = await getRecipe(id!);
      const reviews = await getRecipeRatings(String(recipe.id));
      setRecipe(recipe);
      setReviews(reviews);
    } catch(e){
      alert(e);
    }
  };

  useEffect(() => {
    fetchRecipeInformation();
  }, []);

  if (!recipe) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="m-8 w-full flex !flex-row gap-6 items-center">
        <div>
          <h1 className="text-3xl">{recipe!.title}</h1>
          <span>
            By {recipe.display_name != null ? <Link to={`/account/${recipe.author_id}`} className="hover:underline">{recipe.display_name}</Link> : "Unknown user"} on {' '}
            {new Date(recipe!.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className={`w-15 h-15 text-xl border-2 rounded-full flex items-center justify-center ${getColorBasedOnRating(recipe.avg)}`}>
          {recipe.avg ?? "?"}
        </div>
      </div>
      <div className="recipe-body prose max-w-none">
        <ReactMarkdown>{recipe!.body}</ReactMarkdown>
      </div> 
      <div>
        <div className="text-3xl mt-15">
          Cooks
        </div>
        {reviews.length > 0 ? (
          <>
            <h2>Displaying top 10 cooks:</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCard review = {review}/>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No reviews to display</p>
        )}
      </div>
      <div>
        <RecipeModal />
      </div>
    </>
  )
}

export default RecipePage
