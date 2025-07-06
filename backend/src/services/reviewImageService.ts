import { Review } from '../../../shared-types/index.js';
import { getReviewImagesByID } from 'src/models/reviewModel.js';

export async function fetchImagesForReviews<T extends Review>(reviews: T[]): Promise<T[]> {
    for (const review of reviews) {
        review.images = await getReviewImagesByID(review.id);
    }
    return reviews;
}
