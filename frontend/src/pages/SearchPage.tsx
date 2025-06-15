import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";  
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import RecipeModal from '../components/recipeModal';
import { filterRecipes } from '@/services/recipeService';
import type { Recipe } from '../../../shared-types';

function SearchPage() {  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterRecipes = async () => {
    try {
      const recipes = await filterRecipes(searchTerm);
      setRecipes(recipes);
    } catch {
      alert("An error occurred while fetching recipes.")
    }
  };

  useEffect(() => {
    handleFilterRecipes();
  }, []);

  return (
    <>
      <div>
        <h2 className='text-2xl font-bold'> Recipes </h2>
        <div className='flex items-center space-x-2 my-2'>
          <Input
            type="text"
            placeholder="Enter search text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-40"
          />
          <Button onClick={handleFilterRecipes}>Search recipes</Button>
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
        <RecipeModal />
      </div>
    </>
  )
}

export default SearchPage
