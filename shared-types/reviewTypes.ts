export type ReviewInput = {
    description: string,
    rating: number,
    account_id: number,
    recipe_id: number
}
  
export type Review = ReviewInput & {
    id: number,
    created_at: Date,
}
  