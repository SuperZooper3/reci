import { useState } from 'react';
import './App.css'

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
        <h1> Reci Test </h1>
        {users.length === 0 && <button onClick={handleClick}>Load users</button>}

        {users.length > 0 && (
        <div>
          <h2>Users:</h2>
          <ul>
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
