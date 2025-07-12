import type { FeedEntry } from "../../../shared-types";

const BASE_URL = 'http://localhost:3000/api/feed';

export async function getFeed(): Promise<FeedEntry[]> {
  const res = await fetch(BASE_URL, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error('Failed to return feed');
  }
    return res.json();
  };
