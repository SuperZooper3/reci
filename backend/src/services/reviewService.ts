import { Review, ReviewInput } from '../../../shared-types/index.js';
import { getReviewImagesByID } from 'src/models/reviewModel.js';
import * as reviewModel from '../models/reviewModel.js';

export async function fetchImagesForReviews<T extends Review>(reviews: T[]): Promise<T[]> {
    for (const review of reviews) {
        review.images = await getReviewImagesByID(review.id);
    }
    return reviews;
}

export async function addReviewService(review: ReviewInput) {
    const addedReview = await reviewModel.addReview(review);
    await reviewModel.addImagesToReview(addedReview.id, review.images);
}
