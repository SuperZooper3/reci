export type RecipeInput = {
  title: string,
  body: string,
  author_id: number
}

export type Recipe = RecipeInput & {
  id: number,
  created_at: Date,
  username: string,
}
