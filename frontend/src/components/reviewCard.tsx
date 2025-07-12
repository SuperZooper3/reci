import { getColorBasedOnRating, getMoodBasedOnRating } from "@/utils/ratingUtils";
import type { Review } from "../../../shared-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link, useNavigate } from "react-router-dom";

type ReviewProps<T extends Review> = {
  review: T
};

export default function ReviewCard<T extends Review>({ review }: ReviewProps<T>) {
  return (
    <div className="p-4 mb-4 border rounded-lg shadow flex flex-col">
      <div className="flex w-full flex-col">
        <div className="text-xl flex flex-row w-full gap-6">
          <span>
            <Link to={`/account/${review.account_id}`} className="hover:underline">{review.username}</Link>
             {` ${getMoodBasedOnRating(review.rating)} `}
            {"title" in review ? <Link to={`/recipe/${review.recipe_id}`} className="hover:underline">{review.title as string} </Link> : "this"}
          </span>
        </div>
        <div className="w-full flex flex-row !justify-between mb-2">
          <span>{new Date(review.created_at).toLocaleDateString()}</span>
          <div className={`flex justify-center items-center w-10 h-10 border-2 rounded-full ${getColorBasedOnRating(review.rating)}`}> {review.rating}</div>
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