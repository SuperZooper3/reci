export type ReviewInput = {
    description: string,
    rating: number,
    account_id: number
}
  
export type Review = ReviewInput & {
    id: number,
    created_at: Date,
    recipe_id: number
}
  