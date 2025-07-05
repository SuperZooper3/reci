import { Review, Recipe, Account } from './index';

export type FeedEntry = Review & Recipe & Account & {
    followee_id: number | null | undefined // will be null if they're not followed by you, or undefined for anon users
};
// the rest of the following data is technically returned by the query through it's *, but its not useful

