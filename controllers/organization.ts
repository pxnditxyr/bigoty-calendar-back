import { Request, Response } from 'express';

import Organization from '../models/organization/Organization';
import Subdomain from '../models/lookup/Subdomain';
import { Types } from 'mongoose';



export const createOrganization = async ( req : Request, res : Response ) => {

  try {
    const { name, email, website, direction, image, type } = req.body;

    const organizationType = await Subdomain.findOne({ name: type, status: true });

    if ( !organizationType ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The organization type is not valid'
      });
    }

    const organization = new Organization({
      name,
      email,
      website,
      direction,
      image,
      type: organizationType._id,
    });

    await organization.save();

    return res.status( 201 ).json({
      ok: true,
      organization,
    });

  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const updateOrganization = async ( req : Request, res : Response ) => {

  const { name, email, website, direction, image, type } = req.body;
  const { id } = req.params;

  try {

    const organization = await Organization.findOne({ _id: id, status: true });

    if ( !organization ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Organization not found',
      });
    }

    const organizationType = await Subdomain.findOne({ name: type, status: true });
    
    if ( !organizationType ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The organization type is not valid'
      });
    }

    const newOrganization = {
      name,
      email,
      website,
      direction,
      image,
      type: organizationType._id,
    };

    await Organization.findByIdAndUpdate( id, newOrganization, { new: true } );

    return res.status( 200 ).json({
      ok: true,
      msg: 'Organization updated',
    });
      
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const deleteOrganization = async ( req : Request, res : Response ) => {
  
  const { id } = req.params;

  try {

    const organization = await Organization.findOne({ _id: id, status: true });

    if ( !organization ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Organization not found',
      });
    }

    await Organization.findByIdAndUpdate( id, { status: false }, { new: true } );

    return res.status( 200 ).json({
      ok: true,
      msg: 'Organization deleted',
    });
      
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
}
export const getAllOrganizations = async ( req : Request, res : Response ) => {
  try {
    const organizations = await Organization.find({ status: true });
    return res.status( 200 ).json({
      ok: true,
      organizations,
    });
      
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const getOrganizationsByName = async ( req : Request, res : Response ) => {
  const name = req.params.name;
  try {
    const organizations = await Organization.find({ name: new RegExp( name, 'i' ), status: true });
    return res.status( 200 ).json({
      ok: true,
      organizations,
    });
      
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
}
