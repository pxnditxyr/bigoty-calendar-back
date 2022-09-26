import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import People from '../models/user/People';
import User from '../models/user/User';

import { getUserByEmail, getUserByUsername } from './user';

export const signUpUser = async ( req : Request, res : Response ) => {

  try {
    const { lastName, name, birthday, username, email, password, role } = req.body;

    const existUserWithEmail = await getUserByEmail( email );
    const existUserWithUsername = await getUserByUsername( username );

    if ( Boolean( existUserWithEmail || Boolean( existUserWithUsername ) ) ) {
      return res.status( 400 ).json({
        ok: false,
        msg: {
          email: existUserWithEmail ? 'Email already exist' : null,
          username: existUserWithUsername ? 'Username already exist' : null
        }
      });
    }

    const people = new People({ lastName, name, birthday });
    const peopleUid = people._id;

    const user = new User({ username, email, password, role, peopleUid });
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync( password, salt );

    await people.save();
    await user.save();

    return res.status( 201 ).json({
      ok: true,
      msg: 'created user',
      uid: user._id,
      lastName: people.lastName,
      name: people.name,
      username: user.username,
      email: user.email,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
      error,
    });
  }

};

export const signInUser = async ( req : Request, res : Response ) => {

  try {

    const { user, password } = req.body;

    return res.json({ 
      ok: true,
      msg: 'sign in user',
      body: req.body,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
      error,
    });
  }

};

export const renewToken = async ( req : Request, res : Response ) => {
  return res.json({ 
    ok: true,
    msg: 'renew token'
  });
}


