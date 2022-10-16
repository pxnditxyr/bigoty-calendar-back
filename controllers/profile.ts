import { Request, Response } from 'express';

import User from '../models/user/User';
import People from '../models/user/People';
import Departament from '../models/organization/Departament';

export const getProfile = async ( req : Request, res : Response ) => {
  const uid = req.uid;

  try {
    // uid and status = true
    const user = await User.findOne({ _id: uid, status: true });

    if ( !user ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }

    const people = await People.findById( user.people );

    if ( !people ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }

    return res.json({
      ok: true,
      uid: user._id,
      lastName: people.lastName,
      name: people.name,
      username: user.username,
      email: user.email,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const updateProfile = async ( req : Request, res : Response ) => {

  const uid = req.uid;

  try {

    const user = await User.findById( uid );
    if ( !user ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }

    const people = await People.findById( user.people );
    if ( !people ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }

    const { lastName, name, birthday, username, email, password } = req.body;

    if ( user.username !== username ) {
      const existUsername = await User.findOne({ username });
      if ( existUsername ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'Username already exists'
        });
      }
    }
    if ( user.email !== email ) {
      const existEmail = await User.findOne({ email });
      if ( existEmail ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'Email already exists'
        });
      }
    }

    await People.findByIdAndUpdate( people._id, { lastName, name, birthday });
    await User.findByIdAndUpdate( user._id, { username, email, password });

    return res.json({
      ok: true,
      msg: 'User updated'
    });

  } catch ( error : any ) {
    console.log( error );
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const deleteProfile = async ( req : Request, res : Response ) => {
  const uid = req.uid;

  try {
    const user = await User.findById( uid );
    if ( !user ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }
    const people = await People.findById( user.people );

    if ( !people ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found'
      });
    }

    people.status = false;
    user.status = false;

    await People.findByIdAndUpdate( people._id, people, { new: true } );
    await User.findByIdAndUpdate( user._id, user, { new: true } );

    return res.json({
      ok: true,
      msg: 'User deleted'
    });

  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const setDepartament = async ( req : Request, res : Response ) => {
  const uid = req.uid;
  const { departamentId } = req.params;

  try {
    const departament = await Departament.findById({ _id: departamentId, status: true });

    if ( !departament ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Departament not found'
      });
    }
    await People.findByIdAndUpdate( uid, { departament }, { new: true } );
    return res.json({
      ok: true,
      msg: 'Departament updated'
    });

  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
}
