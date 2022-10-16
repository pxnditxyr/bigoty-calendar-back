import { NextFunction, Request, Response } from 'express';

import User from '../models/user/User';

export const isSuperUser = async ( req : Request, res : Response, next : NextFunction ) => {
  const uid = req.uid;

  try {

    const user = await User.findOne({ _id: uid, status: true });

    if ( !user ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'Invalid credentials',
      });
    }

    if ( user.role !== 'SUPER_USER' ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'You do not have permission to perform this action',
      });
    }
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
  next();
};
