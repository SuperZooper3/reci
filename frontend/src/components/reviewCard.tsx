import type { Review } from "../../../shared-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ReviewProps<T extends Review> = {
  review: T
};

export default function ReviewCard<T extends Review>({ review }: ReviewProps<T>) {
  let mood = "hated";
  let color = "border-red-600";

  if (review.rating > 8) {
    mood = "loved";
    color = "border-green-600";
  } else if (review.rating > 5) {
    mood = "liked";
    color = "border-yellow-600";
  } else if (review.rating > 3) {
    mood = "disliked";
    color = "border-orange-600";
  }

  return (
    <div className="p-4 mb-4 border rounded-lg shadow flex flex-col">
      <div className="flex w-full flex-col">
        <div className="text-xl flex flex-row w-full gap-6">
          <span>{review.username} {mood} {"title" in review ? (review.title as string) : "this"}</span>
        </div>
        <div className="w-full flex flex-row !justify-between mb-2"> 
          <span>{new Date(review.created_at).toLocaleDateString()}</span>
          <div className={`flex justify-center items-center w-10 h-10 border-2 rounded-full ${color}`}> {review.rating}</div>
        </div>
        <div className="text-center">
          {review.description}
        </div>
      </div>
      { 
        review.images.length > 0 &&
        <div className="max-w-md mx-auto pt-16">
          <Carousel className="w-64">
            <CarouselContent>
              {review.images.map((image, index) => (
                <CarouselItem key={index} className="aspect-square w-64">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      }
    </div>
  );

}