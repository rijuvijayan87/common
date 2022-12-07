import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { extractJWT } from '../libs/utils';

interface User {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = extractJWT(req);
  if (!jwtToken) {
    return next();
  }
  try {
    const user = jwt.verify(jwtToken, process.env.JWT_KEY!) as User;
    req.currentUser = user;
  } catch (error) {}

  next();
};
