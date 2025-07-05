import { Review } from '../../../shared-types/index.js';
import { getReviewImagesByID } from 'src/models/reviewModel.js';

export async function fetchImagesForReviews(reviews: Review[]) {
    for (const review of reviews) {
        review.images = await getReviewImagesByID(review.id);
    }
    return reviews;
}
