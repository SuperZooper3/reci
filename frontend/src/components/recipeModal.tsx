import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addRecipe } from "@/services/recipeService"
import type { RecipeInput } from "../../../shared-types"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { type JWTData } from "../../../shared-types";

export default function RecipeModal() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all details!")
      return
    }

    try {  
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        alert("Please log in to add a recipe")
        return
      }

      const decoded = jwtDecode(authToken);
      const author_id = (decoded as JWTData).id;

      const reviewInput: RecipeInput = {
        title,
        body,
        author_id,
      };

      addRecipe(reviewInput)

      setOpen(false)
      
      setTitle("")
      setBody("")
    } catch (error) {
      console.error("Error adding recipe", error)
      alert("An error occurred while adding the recipe.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed bottom-6 right-6 z-50 shadow-xl rounded-lg w-28 h-20 text-1xl flex items-center justify-center"
        >
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
          <DialogDescription>
            Fill out the details below to add your recipe.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 w-full">
          <div className="grid gap-2 w-full min-w-0">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Recipe Title"
              className="w-full min-w-0 px-4 py-2 text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2 w-full min-w-0">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder="List ingredients and steps to cook the recipe!"
              rows={14}
              className="w-full min-w-0 px-4 py-2 text-base leading-relaxed resize-y"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between w-full">
          <Button type="submit" onClick={handlePost}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}