import { Request, Response } from 'express';

import User from '../models/user/User';
import Subdomain from '../models/lookup/Subdomain';
import Organization from '../models/organization/Organization';
import Departament, { IDepartament } from '../models/organization/Departament';
import { Types } from 'mongoose';

export const createDepartament = async ( req : Request, res : Response ) => {
  const  { name, description, type, level, organization } = req.body;
  try {
    const typeDepartament = await Subdomain.findOne({ name: type, status: true });
    if ( !typeDepartament ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The departament type is not valid'
      });
    }
    const organizationDepartament = await Organization.findOne({ name: organization, status: true });
    if ( !organizationDepartament ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The organization is not valid'
      });
    }
    const departament = new Departament({
      name,
      description,
      type: typeDepartament._id,
      level,
      organization: organizationDepartament._id,
    });

    await departament.save();

    return res.status( 201 ).json({
      ok: true,
      departament,
    });
    
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const updateDepartament = async ( req : Request, res : Response ) => {
  const { name, description, type, level } = req.body;
  const { id } = req.params;
  try {
    const departament = await Departament.findOne({ _id: id, status: true });
    if ( !departament ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Departament not found',
      });
    }
    const typeDepartament = await Subdomain.findOne({ name: type, status: true });
    if ( !typeDepartament ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The departament type is not valid'
      });
    }
    const newDepartament = {
      name,
      description,
      type: typeDepartament._id,
      level,
    };
    await Departament.findByIdAndUpdate( id, newDepartament, { new: true } );
    return res.status( 200 ).json({
      ok: true,
      departament,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const deleteDepartament = async ( req : Request, res : Response ) => {
  const { id } = req.params;
  try {
    const departament = await Departament.findOne({ _id: id, status: true });
    if ( !departament ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Departament not found',
      });
    }
    await Departament.findByIdAndUpdate( id, { status: false }, { new: true } );
    return res.status( 200 ).json({
      ok: true,
      msg: 'Departament deleted',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

interface IDepartamentTable extends IDepartament {
  _id: Types.ObjectId;
}

export const getAllDepartaments = async ( req : Request, res : Response ) => {
  try {
    const departaments = await Departament.find({ status: true });
    const departamentsTable = departaments.map( async ( { _id, name, description, type, level, organization } : IDepartamentTable ) => {
      const organizationDepartament = await Organization.findOne({ _id: organization, status: true });
      const typeDepartament = await Subdomain.findOne({ _id: type, status: true });
      return {
        _id,
        name,
        description,
        type: typeDepartament?.name,
        level,
        organization: organizationDepartament?.name,
      };
    });

    const departamentsTablePromise = await Promise.all( departamentsTable );

    return res.status( 200 ).json({
      ok: true,
      departaments: departamentsTablePromise,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const getDepartamentsByOrganization = async ( req : Request, res : Response ) => {
  const { id } = req.params;
  try {
    const departaments = await Departament.find({ organization: id, status: true });
    const departamentsTable = departaments.map( async ( { _id, name, description, type, level, organization } : IDepartamentTable ) => {
      const organizationDepartament = await Organization.findOne({ _id: organization, status: true });
      const typeDepartament = await Subdomain.findOne({ _id: type, status: true });
      return {
        _id,
        name,
        description,
        type: typeDepartament?.name,
        level,
        organization: organizationDepartament?.name,
      };
    });

    const departamentsTablePromise = await Promise.all( departamentsTable );

    return res.status( 200 ).json({
      ok: true,
      departaments: departamentsTablePromise,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const getDepartamentByUser = async ( req : Request, res : Response ) => {
  const uid = req.uid;
  try {
    const user = await User.findById( uid );
    if ( !user ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'User not found',
      });
    }

    if ( user.role === 'USER_ROLE' ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'User does not belong to any organization',
      });
    }

    const departament = await Departament.findOne({ _id: user.departament, status: true }).populate( 'organization' );
    if ( !departament ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Departament not found',
      });
    }
    return res.status( 200 ).json({
      ok: true,
      departament,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};
