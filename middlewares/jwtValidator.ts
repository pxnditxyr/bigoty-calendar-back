import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

interface IPayload {
  uid: string;
  lastName: string;
  name: string;
  email: string;
  username: string;
}

export const jwtValidator = ( req : Request, res : Response, next : NextFunction ) => {
  // x-token headers
  const token = req.header( 'x-token' );

  if ( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'There is no token in the request'
    });
  }

  try {

    const { uid, lastName, name, email, username } = jwt.verify( token, process.env.SECRET_JWT_SEED || '' ) as IPayload;

    req.uid = uid;
    req.lastName = lastName;
    req.name = name;
    req.email = email;
    req.username = username;

  } catch ( error : any ) {

    return res.status( 401 ).json({
      ok: false,
      msg: 'Token is not valid'
    });
  }

  next();
};
