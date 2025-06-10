export type RecipeInput = {
  title: string,
  body: string,
  created_at: Date
}

export type Recipe = RecipeInput & {
  id: number,
  author_id: number
}