import { client } from '../db.js';
import { loadSQL } from '../utils/sqlLoader.js';
import { FeedEntry } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"

export async function getUserFeed(user_id: number): Promise<FeedEntry[]> {
    const getUserFeedSQL = await loadSQL('getUserFeed.sql');
    const { rows } = await client.query(getUserFeedSQL, [user_id]); 
    saveQueryResult("getUserFeed", rows);
    return rows;
};

export async function getAnonFeed(): Promise<FeedEntry[]> {
    const getAnonFeedSQL = await loadSQL('getAnonFeed.sql');
    const { rows } = await client.query(getAnonFeedSQL); 
    saveQueryResult("getAnonFeed", rows);
    return rows;
};
