import { type Review } from "./reviewTypes";

export type FeedEntry = Review & {
    display_name: string
    title: string,
};
