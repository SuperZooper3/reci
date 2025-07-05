import type { Review } from "../../../shared-types";

type ReviewProps = {
  review: Review
};

export default function RecipeCard({ review }: ReviewProps) {
  return (
    <div key={recipe.id} className="recipe-card p-4 mb-4 border rounded-lg shadow">
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
    </div>
  );
}