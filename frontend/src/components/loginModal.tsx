import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { login, createAccount } from '@/services/accountService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { AccountCreate } from "../../../shared-types"
import Cookies from 'js-cookie';


export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");

  const handleAttempt = async () => {
    if (newUser) {
      if (!password.trim() || !confirmPassword.trim() || !username.trim() || !displayname.trim()) {
        alert("Please fill in all details!");
        return;
      } else if (confirmPassword !== password) {
        alert("Passwords must match");
        return;
      }
    } else {
      if (!password.trim() || !username.trim()) {
        alert("Please fill in all details!");
        return;
      }
    }

    if (Cookies.get('authToken')){
      alert("Already logged in");
      return;
    }

    try {
      if (newUser){
        const accountInfo:AccountCreate = {
          display_name: displayname,
          password: password,
          username: username,
        }
        await createAccount(accountInfo);
        window.location.reload();
      } else {
        await login(username, password);
        window.location.reload();
      }
      
      setDisplayname("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (error) {
      console.error("Error signing in", error)
      alert("Incorrect credentials");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-3xl font-semibold cursor-pointer hover:underline">Login</span>
      </DialogTrigger>

      <DialogContent>
        <Tabs
          value={newUser ? "Sign Up" : "Login"}
          onValueChange={(val) => setNewUser(val === "Sign Up")}
          className="flex flex-col w-full"
        >
          <TabsList className="flex !flex-row">
             <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="Login">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="Sign Up">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Display Name"
                className="border p-2 rounded"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border p-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </TabsContent>

          <DialogFooter className="pt-4">
            <Button type="submit" onClick={handleAttempt} className="w-full">
              {newUser ? "Create Account" : "Login"}
            </Button>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
