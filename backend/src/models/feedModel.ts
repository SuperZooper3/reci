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


// In practice, we'd do 1% but this helps us better illustrate the point
const viewRefreshChance = 0.1;

export async function getAnonFeed(): Promise<FeedEntry[]> {
    const getAnonFeedSQL = await loadSQL('getAnonFeed.sql');
    const result = await query<FeedEntry>(getAnonFeedSQL); 
    saveQueryResult("getAnonFeed", result);
    // Probabilistically refresh the view. 1% chance
    // In practice we would make this async, but we only have one DB connection so its fine
    if (Math.random() < viewRefreshChance) {
        const refreshAnonFeedSQL = await loadSQL('refreshAnonFeed.sql');
        const result = await query<FeedEntry>(refreshAnonFeedSQL); 
        saveQueryResult("refreshAnonFeed", result);
    }
    return result.rows;
};
