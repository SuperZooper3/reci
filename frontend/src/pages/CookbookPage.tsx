import { useEffect, useState } from "react";
import type { Recipe } from "../../../shared-types";
import { getSavedRecipes } from "@/services/recipeService";
import RecipeCard from "@/components/recipeCard";
import Cookies from 'js-cookie';

function CookbookPage() {  
  
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loggedInAccount] = useState(Cookies.get('authToken'));

  const fetchSavedRecipes = async () => {
    try {
      const recipes = await getSavedRecipes();
      setSavedRecipes(recipes);
    } catch(e){
      alert(e);
    }
  };

  useEffect(() => {
    if (loggedInAccount) {
      fetchSavedRecipes();
    } 
  }, []);
  
  return (
    <>
      {loggedInAccount ? (
        <div className="flex flex-col items-center space-x-2 my-2">
          <h1 className="text-xl mb-5">Cookbook</h1>
          {savedRecipes.length > 0 ? (
            <>
              <ul className="w-full">
                {savedRecipes.map((recipe) => ( 
                  <li key={recipe.id}>
                    <RecipeCard recipe={recipe}/>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Cookbook is empty</p>
          )}
        </div>
      )
      : <p>Log in to view your cookbook</p> 
      }
    </>

  )
}

export default CookbookPage
