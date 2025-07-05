export type ReviewInput = {
    description: string,
    rating: number,
    account_id: number,
    recipe_id: number
}

export type ReviewImage = {
    url: string,
    alt: string,
}

export type Review = ReviewInput & {
    id: number,
    created_at: Date,
    username: string,
    images: ReviewImage[]
}

export type AvgRating = {
    avg: number;
}
