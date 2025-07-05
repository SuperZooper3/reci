import { cn } from "@/lib/utils"
import type { ReviewInput } from "../../../shared-types";
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
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { addReview } from "@/services/reviewService"

type SliderProps = React.ComponentProps<typeof Slider>

export default function CookModal({ className, ...props }: SliderProps) {

  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(5)

  const handlePost = async () => {
    if (!description.trim()) {
      alert("Please fill in all details!")
      return
    }

    try {
      const reviewInput: ReviewInput = {
        description,
        rating,
        recipe_id: 1, // TODO
        account_id: 2 // TODO
      };
      
      addReview(reviewInput);
      
      setDescription("")
      setRating(5)
      setOpen(false)
    } catch (error) {
      console.error("Error adding cook", error)
      alert("An error occurred while adding the cook.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle>Add Cook</DialogTitle>
          <DialogDescription>
            Fill out the details below to add your cook.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 w-full">
          <div className="grid gap-2 w-full min-w-0">
            <Textarea
              id="body"
              placeholder="Your review here..."
              rows={14}
              className="w-full min-w-0 px-4 py-2 text-base leading-relaxed resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full p-4 bg-gray-100 rounded">
          <Slider
            defaultValue={[5]}
            value={[rating]}
            onValueChange={([val]) => setRating(val)}
            max={10}
            step={1}
            className={cn(className)}
            {...props}
          />
          <div>Rating: {rating}</div>
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