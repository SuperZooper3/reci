import { useState } from 'react';
import './App.css'
import { Button } from "@/components/ui/button"

function App() {  

  const [accounts, setAccounts] = useState<string[]>([]);
  const handleClick = async () => {
    const res = await fetch('http://localhost:3000/api/accounts');

    const accounts: string[] = await res.json();
    setAccounts(accounts);
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'> Reci Test </h1>
        {accounts.length === 0 && <Button onClick={handleClick}>Load accounts</Button>}

        {accounts.length > 0 && (
        <div>
          <h2>Accounts:</h2>
          <ul className='list-disc'>
            {accounts.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </>
  )
}

export default App
