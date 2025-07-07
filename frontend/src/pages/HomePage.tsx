import { getFeed } from "@/services/feedService";
import { useEffect, useState } from "react";
import type { FeedEntry } from "../../../shared-types";
import ReviewCard from "@/components/reviewCard";

function HomePage() {  
  
  const [feed, setFeed] = useState<FeedEntry[]>([]);

  const fetchFeed = async () => {
    try {
      const feed = await getFeed();
      setFeed(feed);
    } catch(e){
      alert(e);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  
  return (
    <>
    <div>
      {feed.length > 0 ? (
        <>
          <ul>
            {feed.map((review) => ( 
              <li key={review.id}>
                <ReviewCard review={review}/>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Our chefs are searching for more recipes to recommend...</p>
      )}
    </div>
    </>
  )
}

export default HomePage
