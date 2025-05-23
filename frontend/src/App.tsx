import { useState } from 'react';
import './App.css'
import { Button } from "@/components/ui/button"

function App() {  

  const [users, setUsers] = useState<string[]>([]);
  const handleClick = async () => {
    const res = await fetch('http://localhost:3000/api/users');

    const users: string[] = await res.json();
    setUsers(users);
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'> Reci Test </h1>
        {users.length === 0 && <Button onClick={handleClick}>Load users</Button>}

        {users.length > 0 && (
        <div>
          <h2>Users:</h2>
          <ul className='list-disc'>
            {users.map((item: string, index: number) => (
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
