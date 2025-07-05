import { Request, Response } from "express";
import * as feedModel from '../models/feedModel.js';
import * as auth from '../utils/auth.js'

export const getFeed = async (req: Request, res: Response) => {
  try {
    // Check the user's session to see if they're signed in and have a userID
    const jwt = req.cookies.authToken;
  
    if (jwt) {
      // Signed in
      const { id: user_id } = auth.verifyAndReadJWT(jwt);
      const reviews = await feedModel.getUserFeed(user_id);
      res.json(reviews);
    } else {
      // Anon version
      const reviews = await feedModel.getAnonFeed();
      res.json(reviews);
    }
  } catch (error) {
    console.error('Error fetching feed', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
