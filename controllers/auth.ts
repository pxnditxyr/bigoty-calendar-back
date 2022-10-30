import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import People from '../models/user/People';
import User from '../models/user/User';

import { generateJWT } from '../helpers'

export const signUpUser = async ( req : Request, res : Response ) => {

  const { lastName, name, birthday, username, email, password } = req.body;

  try {
    const existUserWithEmail = await User.findOne({ email, status: true });
    const existUserWithUsername = await User.findOne({ username, status: true });

    if ( Boolean( existUserWithEmail ) || Boolean( existUserWithUsername ) ) {
      return res.status( 400 ).json({
        ok: false,
        msg: {
          email: existUserWithEmail ? 'Email already exist' : null,
          username: existUserWithUsername ? 'Username already exist' : null
        }
      });
    }

    const peopleData = new People({ lastName, name, birthday });
    const people = peopleData._id;

    const user = new User({ username, email, password, people });
    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync( password, salt );

    await peopleData.save();
    await user.save();

    const token = await generateJWT( user._id.toString(), peopleData.lastName, peopleData.name, user.email, user.username );

    return res.status( 201 ).json({
      ok: true,
      msg: 'created user',
      uid: user._id,
      lastName: peopleData.lastName,
      name: peopleData.name,
      username: user.username,
      email: user.email,
      birthday: peopleData.birthday,
      token,
    });
  } catch ( error : any ) {
    console.log( error );
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }

};

export const signInUser = async ( req : Request, res : Response ) => {

  try {

    const { user: userData, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: userData },
        { username: userData }
      ]
    });
    if ( !user ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'User or password incorrect'
      });
    }
    if ( user.status === false ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'This user does not exist'
      });
    }

    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'User or password incorrect'
      });
    }

    const people = await People.findById( user.people );

    if ( !people ) {
      return res.status( 500 ).json({
        ok: false,
        msg: 'Please contact the administrator'
      });
    }

    const token = await generateJWT( user._id.toString(), people.lastName, people.name, user.email, user.username );

    return res.json({ 
      ok: true,
      msg: 'sign in user',
      uid: user._id,
      lastName: people.lastName,
      name: people.name,
      username: user.username,
      email: user.email,
      birthday: people.birthday,
      token,
    });

  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }

};

export const renewToken = async ( req : Request, res : Response ) => {

  try {
    const { uid } = req;
    const user = await User.findById( uid );
    const people = await People.findById( user?.people );
    if ( !user || !people ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }
    const token = await generateJWT( uid, people.lastName, people.name, user.email, user.username );
    return res.json({ 
      ok: true,
      msg: 'renew token',
      uid,
      lastName: people.lastName,
      name: people.name,
      username: user.username,
      email: user.email,
      birthday: people.birthday,
      token,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
}


