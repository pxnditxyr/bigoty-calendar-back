import { Request, Response } from 'express';
import { stringToObjectId } from '../helpers';

import Page from '../models/user/Page';

export const getPage = async ( req : Request, res : Response ) => {
  const uid = req.uid;

  const page = await Page.findOne({
    user: stringToObjectId( uid ),
    status: true
  });

  if ( !page ) {
    return res.status( 404 ).json({
      ok: false,
      msg: 'Page not found'
    });
  }
  return res.json({
    ok: true,
    page
  });
};

export const createNewPage = async ( req : Request, res : Response ) => {

  const uid = req.uid;
  const { title, description, content, profession, headerColor, headerImage, bgColor, bgImage } = req.body;

  const page = new Page({ title, description, content, profession, headerColor, headerImage, bgColor, bgImage });

  try {

    page.user = stringToObjectId( uid );
    await page.save();

    return res.status( 201 ).json({
      ok: true,
      page
    });
    
  } catch ( error ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const updatePage = async ( req : Request, res : Response ) => {
  const { id } = req.params;
  try {
    const page = await Page.findById( id );

    if ( !page ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Page not found'
      });
    }

    if ( page.user.toString() !== req.uid ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'You do not have permission to edit this page'
      });
    }
    const newPage = {
      ...req.body,
      user: req.uid
    };

    const updatedPage = await Page.findByIdAndUpdate( id, newPage, { new: true } );
    return res.json({
      ok: true,
      msg: 'Updated page',
      page: updatedPage
    });

  } catch ( error ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const deletePage = async ( req : Request, res : Response ) => {
  const { id } = req.params;
  try {
    const page = await Page.findById( id );
    if ( !page ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Page not found'
      });
    }

    if ( page.user.toString() !== req.uid ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'You do not have permission to delete this page'
      });
    }

    page.status = false;
    await Page.findByIdAndUpdate( id, page, { new: true } );

    return res.json({
      ok: true,
      msg: 'Page deleted'
    });

  } catch ( error ) {
    return res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

