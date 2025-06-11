import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";  
import { Input } from '@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import type { DisplayName } from '../../shared-types/index';

// This is bad. Fix later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Recipe = Record<string, any>;

function App() {  
  const [accounts, setAccounts] = useState<DisplayName[]>([]);
  const handleLoadAccounts = async () => {
    const res = await fetch('http://localhost:3000/api/accounts');

    const accounts: DisplayName[] = await res.json();
    setAccounts(accounts);
  };

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [accountId, setAccountId] = useState('');

  const handleLoadRecipes = async () => {
    if (!accountId) {
      alert('Please enter an Account ID');
      return;
    }

    const res = await fetch(`http://localhost:3000/api/recipes/account/${accountId}`);
    const recipes: Recipe[] = await res.json();
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
    </>
  )
}

export default App
