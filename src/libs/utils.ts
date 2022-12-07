import { Request } from 'express';

export const extractJWT = (req: Request) => {
  const jwtTokenHeader = req.header('Authorization');
  return jwtTokenHeader?.replace('Bearer ', '');
};
