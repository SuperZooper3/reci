export type FeedEntry = {
    description: string,
    created_at: string,
    rating: number,
    recipe_id: number,
    title: string,
    account_id: number,
    display_name: string,
    username: string,
    followee_id: number | null | undefined // will be null if they're not followed by you, or undefined for anon users
};
