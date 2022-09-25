import { Request, Response } from 'express';

export const signUpUser = async ( req : Request, res : Response ) => {
  return res.status( 201 ).json({
    ok: true,
    msg: 'created usexd',
    body: req.body,
  });
};

export const signInUser = async ( req : Request, res : Response ) => {
  return res.json({ 
    ok: true,
    msg: 'sign in user',
    body: req.body,
  });
};

export const renewToken = async ( req : Request, res : Response ) => {
  return res.json({ 
    ok: true,
    msg: 'renew token'
  });
}


