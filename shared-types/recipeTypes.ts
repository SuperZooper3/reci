export type RecipeInput = {
  title: string,
  body: string,
  author_id: number
}

export type Recipe = RecipeInput & AvgRating & {
  id: number,
  created_at: Date,
  display_name: string,
}

export type AvgRating = {
    avg?: number | null;
}
