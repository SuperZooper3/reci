import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { deleteAccount, login } from '@/services/accountService';
import { isLoggedIn } from '@/services/authService';
import Cookies from 'js-cookie';

function RecipePage() {  
  const navigate = useNavigate();
  const [loggedInAccount, setLoggedInAccount] = useState(!!Cookies.get('authToken'));

  const handleLogin = async () => {
    try {
      //TODO: remove this. Only here for testing purposes
      await login("russel", "123");
      setLoggedInAccount(isLoggedIn());
      window.location.reload();
    } catch(e) {
      alert(e);
    }
  };

  const handleDeleteAccount = async() => {
    try {
      await deleteAccount();
      //From FE, can only delete cookie by overriding with expiry in the past
      document.cookie = "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
      navigate("/");
      window.location.reload();
    } catch(e) {
      alert(e);
    }
    
  };

  const handleLogout = async() => {
    try {
      document.cookie = "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
      navigate("/");
      window.location.reload();
    } catch(e) {
      alert(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  //TODO: Remove the login button. Only here for testing.
  return (
    <>
      
      {loggedInAccount ? 
      <div>
        <Button onClick={handleLogout}>Logout</Button>
        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
      : <div>
          <span>Please log in</span>
          <Button onClick={handleLogin}>Login</Button>
        </div>
        }
    </>
  )
}

export default RecipePage
