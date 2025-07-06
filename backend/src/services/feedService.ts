import * as feedModel from '../models/feedModel.js';
import { fetchImagesForReviews } from './reviewService.js';

export async function getFeedService(userID: number | null) {
    let reviews = null;
    if (userID) {
        reviews = await feedModel.getUserFeed(userID);
    } else {
        reviews = await feedModel.getAnonFeed();
    }

    reviews = await fetchImagesForReviews(reviews);
    console.log(reviews);
    return reviews;
} 