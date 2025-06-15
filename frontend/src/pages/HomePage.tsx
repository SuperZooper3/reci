import { useState } from 'react';
import { Button } from "@/components/ui/button";  
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import RecipeModal from '../components/recipeModal';
import type { DisplayName } from '../../../shared-types/index';
import { getRecipesFromAccount } from '@/services/RecipeService';
import { getRecipeAverageRating } from '@/services/reviewService';
import { getAccounts } from '@/services/accountService';
import type { Recipe } from '../../../shared-types/index';

function HomePage() {  
  const [accounts, setAccounts] = useState<DisplayName[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [accountId, setAccountId] = useState('');
  const [parsedRating, setParsedRating] = useState('');  
  const [recipeID, setRecipeID] = useState('');

  const handleLoadRecipeAverageRating = async () => {
    if (!recipeID) {
      alert('Please enter a Recipe ID');
      return;
    }

    const data = await getRecipeAverageRating(recipeID);
          
    let parsedRating: string;
    
    if (data.avg === null) {
      parsedRating = "No Ratings";
    } else {
      parsedRating = data.avg.toString();
    }
    
    setParsedRating(parsedRating);
  };

  const handleLoadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
  
  const handleLoadRecipes = async () => {
    if (!accountId) {
      alert('Please enter an Account ID');
      return;
    }

    const recipes = await getRecipesFromAccount(accountId);
    setRecipes(recipes);
  };


  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'> Reci Test </h1>
        {accounts.length === 0 && <Button onClick={handleLoadAccounts}>Load accounts</Button>}

        {accounts.length > 0 && (
        <div>
          <h2>Accounts:</h2>
          <ul className='list-disc'>
            {accounts.map((item, index) => (
              <li key={index}>{item.display_name}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
      <div>
        <h2 className='text-2xl font-bold'> Get Recipes </h2>
        <div className='flex items-center space-x-2 my-2'>
          <Input
            type="number"
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountId(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleLoadRecipes}>Load recipes</Button>
        </div>

        <div className="recipes-container">
          {recipes.length > 0 ? (
            <ul className="recipe-list">
              {recipes.map((recipe) => (
                <li key={recipe.id} className="recipe-card p-4 mb-4 border rounded-lg shadow">
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
          ) : (
            <p>No recipes to display</p>
          )}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-bold'> Get Recipe Average Rating </h2>
        <div className='flex items-center space-x-2 my-2'>
          <Input
            type="number"
            placeholder="Enter Recipe ID"
            value={recipeID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeID(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleLoadRecipeAverageRating}>Load Average Rating</Button>
        </div>

        <div className="ratings-container">
          <div className="mt-2 text-sm text-gray-700">
            Average Rating: {parsedRating}
          </div>
        </div>
      </div>

      <div>
        <RecipeModal />
      </div>
    </>
  )
}

export default HomePage
