import { cn } from "@/lib/utils"
import type { ReviewImage, ReviewInput } from "../../../shared-types";
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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { type JWTData } from "../../../shared-types";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

type SliderProps = React.ComponentProps<typeof Slider>

export default function CookModal({ className, recipeId, refreshReviews, ...props }: SliderProps & { recipeId: number, refreshReviews: () => void }) {

  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(5)
  const [imageURL, setImageURL] = useState("")
  const [alt, setAlt] = useState("")
  const [images, setImages] = useState<ReviewImage[]>([])

  const handlePost = async () => {
    if (!description.trim()) {
      alert("Please fill in all details!")
      return
    }

    try {
      const authToken = Cookies.get('authToken');

      if (!authToken) {
        alert("Please log in to add a review")
        return
      }

      const decoded = jwtDecode(authToken);
      const account_id = (decoded as JWTData).id;

      const reviewInput: ReviewInput = {
        description,
        rating,
        recipe_id: recipeId,
        account_id,
        images
      };
      
      await addReview(reviewInput);
      
      setDescription("");
      setRating(5);
      setOpen(false);
      refreshReviews();
    } catch (error) {
      console.error("Error adding cook", error);
      alert("An error occurred while adding the cook. Make sure you haven't cooked this recipe before.");
    }
  }

   const handleAddImage = () => {
    if (!imageURL.trim()) {
      alert("Image URL cannot be empty");
      return;
    }

    setImages((prevImages) => [...prevImages, {url: imageURL, alt: alt}]);
    setImageURL("");
    setAlt("");
   }

   const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
        <div>
          <div className="flex gap-2 flex-row mb-2 items-center">
            <div className="flex-1 flex flex-col gap-1">
              <Input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Insert image URL"/>
              <Input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Add a description"/>
            </div> 
            <Button onClick={handleAddImage}>+</Button>
          </div> 
          {
            images.length > 0 &&
            <ScrollArea className="bg-gray-100 h-72 p-2 rounded">
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-center gap-2 mt-1 mb-1">
                <div className="flex flex-col bg-white flex-1 rounded p-1" key={index}>
                  <div className="break-all">{image.url}</div>
                  <div className="break-all text-gray-500 text-xs">{image.alt}</div>
                </div> 
                <Button onClick={() => handleRemoveImage(index)} variant="destructive">X</Button>
              </div> 
            ))}
            </ScrollArea>
          } 
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