export type RecipeCustom = {
  title: string,
  body: string,
  created_at: Date
}

export type Recipe = RecipeCustom & {
  id: number,
  author_id: number
}