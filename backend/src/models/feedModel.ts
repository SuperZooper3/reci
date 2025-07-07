import { loadSQL } from '../utils/sqlLoader.js';
import { FeedEntry } from '../../../shared-types/index.js';
import { saveQueryResult } from "../utils/saveQueryResult.js"
import { query } from "../utils/query.js"

export async function getUserFeed(user_id: number): Promise<FeedEntry[]> {
    const getUserFeedSQL = await loadSQL('getUserFeed.sql');
    const result = await query<FeedEntry>(getUserFeedSQL, [user_id]); 
    saveQueryResult("getUserFeed", result);
    return result.rows;
};

export async function getAnonFeed(): Promise<FeedEntry[]> {
    const getAnonFeedSQL = await loadSQL('getAnonFeed.sql');
    const result = await query<FeedEntry>(getAnonFeedSQL); 
    saveQueryResult("getAnonFeed", result);
    return result.rows;
};
