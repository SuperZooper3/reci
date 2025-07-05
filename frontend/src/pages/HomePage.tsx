import { getFeed } from "@/services/feedService";
import { useEffect, useState } from "react";
import type { Recipe } from "../../../shared-types";
import RecipeCard from "@/components/recipeCard";

function HomePage() {  
  
  const [feed, setFeed] = useState<Recipe[]>([]);

  const fetchFeed = async () => {
    try {
      const feed = await getFeed();
      setFeed(feed);
    } catch(e){
      alert(e);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  
  return (
    <>
    <div>
      {feed.length > 0 ? (
        <>
        <h2>Displaying top 10 results:</h2>
          <ul>
            {feed.map((recipe) => (
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
    </>
  )
}

export default HomePage
