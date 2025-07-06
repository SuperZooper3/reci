import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";  
import { Input } from '@/components/ui/input';
import RecipeModal from '../components/recipeModal';
import { filterRecipes } from '@/services/recipeService';
import type { Recipe } from '../../../shared-types';
import RecipeCard from '@/components/recipeCard';

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

        <div>
          {recipes.length > 0 ? (
            <>
            <h2>Displaying top 10 results:</h2>
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <RecipeCard recipe={recipe}/>
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

export default SearchPage
