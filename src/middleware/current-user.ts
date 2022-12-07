import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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
  const jwtTokenHeader = req.header('Authorization');
  console.log(`JWT TOKEN IN HEADER :${jwtTokenHeader}`);

  const jwtToken = jwtTokenHeader?.replace('Bearer ', '');
  console.log(`JWT TOKEN :${jwtToken}`);
  if (!jwtToken) {
    return next();
  }
  try {
    const user = jwt.verify(jwtToken, process.env.JWT_KEY!) as User;
    console.log(`USER : ${JSON.stringify(user)}`);

    req.currentUser = user;
  } catch (error) {}

  next();
};
