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

export default function RecipeModal() {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")

  const template = `# Ingredients
  - 
  # Steps
  1. 
  2. 
  `
  const [body, setBody] = useState(template)

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Please fill in all details!")
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          author_id: 2, // TODO: This is hardcoded until we can get author id from auth
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add recipe')
      }

      setOpen(false)
      
      setTitle("")
      setBody(template)
    } catch (error) {
      console.error("Error adding recipe", error)
      alert("An error occurred while adding the recipe.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
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
