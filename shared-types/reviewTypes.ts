export type ReviewInput = {
    description: string,
    rating: number,
    account_id: number,
    recipe_id: number,
    images: ReviewImage[]
}

export type ReviewImage = {
    url: string,
    alt?: string,
}

export type Review = ReviewInput & {
    id: number,
    created_at: Date,
    username: string,
}

export type AvgRating = {
    avg: number;
}
