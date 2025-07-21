import ReactMarkdown from "react-markdown";
import type { Recipe } from "../../../shared-types";
import { getColorBasedOnRating } from "@/utils/ratingUtils";
import { Link } from "react-router-dom";

type RecipeProps = {
  recipe: Recipe
};

export default function RecipeCard({ recipe }: RecipeProps) {
  return (
    <div key={recipe.id} className="recipe-card p-4 mb-4 border rounded-lg shadow">
      <div className="flex justify-between">
        <div>
          <Link to={`/recipe/${recipe.id}`} className="hover:underline text-2xl">{recipe.title}</Link>
          <div className="recipe-date text-sm text-gray-500 mb-2">
              Created by {recipe.display_name != null ? <Link to={`/account/${recipe.author_id}`} className="hover:underline">{recipe.display_name}</Link> : "unknown user"} on {new Date(recipe.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className={`flex justify-center items-center w-10 h-10 border-2 rounded-full ${getColorBasedOnRating(recipe.avg)}`}> {recipe.avg ?? "?"}</div>
      </div>
      <div className="recipe-body prose max-w-none">
          <ReactMarkdown>{recipe.body}</ReactMarkdown>
      </div>
    </div>
  );
}