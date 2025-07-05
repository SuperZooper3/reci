import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { createAccount, deleteAccount } from '@/services/accountService';
import { isLoggedIn } from '@/services/authService';

function RecipePage() {  
  const navigate = useNavigate();
  const [loggedInAccount, setLoggedInAccount] = useState(false);

  const login = async () => {
    try {
      //TODO: remove this. Only here for testing purposes
      await createAccount({username: "test", display_name: "sally", password: "test"});
      setLoggedInAccount(isLoggedIn());
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
    } catch(e) {
      alert(e);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  //TODO: Remove the login button. Only here for testing.
  return (
    <>
      <Button onClick={login}>Login</Button>
      {loggedInAccount ? <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
      : <span>Please log in</span>}
    </>
  )
}

export default RecipePage
