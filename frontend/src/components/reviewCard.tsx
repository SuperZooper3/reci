import type { FeedEntry, Review } from "../../../shared-types";

type ReviewProps = {
  normalReview?: Review;
  feedReview?: FeedEntry;
};

export default function ReviewCard({ normalReview, feedReview }: ReviewProps) {
  let mood = "hated";
  let color = "border-red-600";

  const rating = feedReview ? feedReview!.rating : normalReview!.rating;

  if (rating > 8) {
    mood = "loved";
    color = "border-green-600";
  } else if (rating > 5) {
    mood = "liked";
    color = "border-yellow-600";
  } else if (rating > 3) {
    mood = "disliked";
    color = "border-orange-600";
  }

  if (normalReview) {
    return (
      <div className="p-4 mb-4 border rounded-lg shadow">
        <div className="flex">
          <div className="text-xl flex !flex-row w-full gap-6">
            <span>{normalReview.username}</span>
            <span>{new Date(normalReview.created_at).toLocaleDateString()}</span>
            <span>{normalReview.rating}</span>
          </div>
          <div>
            {normalReview.description}
          </div>
        </div>
        
      </div>
    );
  }
  return (
    <div className="p-4 mb-4 border rounded-lg shadow">
      <div className="flex w-full">
        <div className="text-xl flex !flex-row w-full gap-6">
          <span>{feedReview!.username} {mood} {feedReview!.title}</span>
        </div>
        <div className="w-full !flex-row !justify-between mb-2"> 
          <span>{new Date(feedReview!.created_at).toLocaleDateString()}</span>
          <div className={`w-10 h-10 border-2 rounded-full ${color}`}> {feedReview!.rating}</div>
        </div>
        <div>
          {feedReview!.description}
        </div>
      </div>
      
    </div>
  );

}