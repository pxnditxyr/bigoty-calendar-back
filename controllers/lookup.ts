import { Request, Response } from 'express';
import Domain from '../models/lookup/Domain';
import Subdomain, { ISubdomain } from '../models/lookup/Subdomain';


export const getAllDomains = async ( req : Request, res : Response ) => {
  try {
    const domains = await Domain.find({ status: true });
    const subdomains = await Subdomain.find({ status: true });

    const table = domains.map( domain => {
      return {
        id: domain._id,
        name: domain.name,
        subdomains: subdomains.filter( subdomain => subdomain.domain.toString() === domain._id.toString() )
      }
    });

    return res.json({
      ok: true,
      table,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
}

export const getDomain = async ( req : Request, res : Response ) => {
  const { domainName } = req.params;
  try {
    const domain = await Domain.findOne({ name: domainName });

    if ( !domain ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Domain not found',
      });
    }
    const subdomains = await Subdomain.find({ domain: domain._id, status: true });

    const table = {
      id: domain._id,
      name: domain.name,
      subdomains: Boolean( subdomains ) ? subdomains : [],
    };

    return res.json({
      ok: true,
      table,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const createFullDomain = async ( req : Request, res : Response ) => {

  const { name, description, subdomains } = req.body;
  try {
    const existDomain = await Domain.findOne({ name, status: true });
    if ( existDomain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The domain already exists',
      });
    }
    const domain = new Domain({ name, description });
    await domain.save();

    const subdomainsToSave = subdomains.map( ( { name, description, observations, parent } : ISubdomain ) => {
      return new Subdomain({ name, description, observations, parent, domain: domain._id });
    });

    await Subdomain.insertMany( subdomainsToSave );
    return res.json({
      ok: true,
      msg: 'Domain created',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const createDomain = async ( req : Request, res : Response ) => {
  const { name, description } = req.body;
  try {
    const existDomain = await Domain.findOne({ name, status: true });
    if ( existDomain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The domain already exists',
      });
    }
    const domain = new Domain({ name, description });
    await domain.save();
    return res.json({
      ok: true,
      msg: 'Domain created',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const updateDomain = async ( req : Request, res : Response ) => {

  const { name, description } = req.body;
  const { domainName } = req.params;

  try {

    const domain = await Domain.findOne({ name: domainName, status: true });
    if ( !domain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The domain does not exist',
      });
    }
    const newDomain = { name, description };
    await Domain.findByIdAndUpdate( domain._id, newDomain, { new: true } );
    return res.json({
      ok: true,
      msg: 'Domain updated',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const deleteDomain = async ( req : Request, res : Response ) => {
  const { domainName } = req.params;
  try {
    const domain = await Domain.findOne({ name: domainName, status: true });
    if ( !domain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The domain does not exist',
      });
    }
    await Domain.findByIdAndUpdate( domain._id, { status: false }, { new: true } );
    return res.json({
      ok: true,
      msg: 'Domain deleted',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const getSubdomain = async ( req : Request, res : Response ) => {
  const { subdomainName } = req.params;
  try {
    const subdomain = await Subdomain.findOne({ subdomainName, status: true });
    if ( !subdomain ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Subdomain not found',
      });
    }
    return res.json({
      ok: true,
      subdomain,
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const createSubdomain = async ( req : Request, res : Response ) => {
  const { name, description, observations, parent } = req.body;
  const { domainName } = req.params;
  try {
    const domain = await Domain.findOne({ name: domainName, status: true });
    if ( !domain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The domain does not exist',
      });
    }
    const existSubdomain = await Subdomain.findOne({ name, status: true });
    if ( existSubdomain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The subdomain already exists',
      });
    }
    const subdomain = new Subdomain({ name, description, observations, parent, domain: domain._id });
    await subdomain.save();
    return res.json({
      ok: true,
      msg: 'Subdomain created',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const updateSubdomain = async ( req : Request, res : Response ) => {
  const { name, description, observations, parent } = req.body;
  const { subdomainName } = req.params;
  try {
    const subdomain = await Subdomain.findOne({ name: subdomainName, status: true });
    if ( !subdomain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The subdomain does not exist',
      });
    }
    const newSubdomain = { name, description, observations, parent };
    await Subdomain.findByIdAndUpdate( subdomain._id, newSubdomain, { new: true } );
    return res.json({
      ok: true,
      msg: 'Subdomain updated',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const deleteSubdomain = async ( req : Request, res : Response ) => {
  const { subdomainName } = req.params;
  try {
    const subdomain = await Subdomain.findOne({ name: subdomainName, status: true });
    if ( !subdomain ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'The subdomain does not exist',
      });
    }
    await Subdomain.findByIdAndUpdate( subdomain._id, { status: false }, { new: true } );
    return res.json({
      ok: true,
      msg: 'Subdomain deleted',
    });
  } catch ( error : any ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};
