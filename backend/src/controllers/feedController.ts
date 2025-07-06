import { Request, Response } from "express";
import * as auth from '../utils/auth.js'
import { getFeedService } from "src/services/feedService.js";

export const getFeed = async (req: Request, res: Response) => {
  try {
    // Check the user's session to see if they're signed in and have a userID
    const jwt = req.cookies.authToken;
  
    let userID = null;
    if (jwt) {
      userID = auth.verifyAndReadJWT(jwt).id;
    }

    const reviews = await getFeedService(userID)

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching feed', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
