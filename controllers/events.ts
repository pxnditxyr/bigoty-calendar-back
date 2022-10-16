import { Request, Response } from 'express';
import { stringToObjectId } from '../helpers';

import Event from '../models/event/Event';
import People from '../models/user/People';
import User from '../models/user/User';

export const getEvents = async ( req : Request, res : Response ) => {
  const events = await Event.find({ user: stringToObjectId( req.uid ), status: true })

  const eventsWithNameAndId = events.map( async ( event ) => {
    const user = await User.findById( event.user );
    if ( !user ) return;
    const people = await People.findById( user.people );
    if ( !people ) return;
    return {
      _id: event._id,
      title: event.title,
      start: event.start,
      end: event.end,
      note: event.note,
      bgColor: event.bgColor,
      user: {
        _id: user._id,
        name: people.name + ' ' + people.lastName
      }
    }
  });

  res.json({
    ok: true,
    events: await Promise.all( eventsWithNameAndId ),
  });
};

export const createNewEvent = async ( req : Request, res : Response ) => {
  const { title, note, start, end, bgColor } = req.body;

  const event = new Event({ title, note, start, end, bgColor });

  try {
    event.user = stringToObjectId( req.uid );
    await event.save();

    res.json({
      ok: true,
      msg: 'Created new event',
      event
    });
  } catch ( error : any ) {
    res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }

};

export const updateEvent = async ( req : Request, res : Response ) => {

  const { id } = req.params;

  try {

    const event = await Event.findById( id );

    if ( !event ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Event not found'
      });
    }

    if ( event.user.toString() !== req.uid ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'You do not have permission to edit this event'
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid
    };

    const updatedEvent = await Event.findByIdAndUpdate( id, newEvent, { new: true } );

    res.json({
      ok: true,
      msg: 'Updated event',
      event: updatedEvent

    });
  } catch ( error : any ) {
    res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

export const deleteEvent = async ( req : Request, res : Response ) => {

  const { id } = req.params;
  try {
    const event = await Event.findById( id );
    if ( !event ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Event not found'
      });
    }

    if ( event.user.toString() !== req.uid ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'You do not have permission to delete this event'
      });
    }

    // await Event.findByIdAndDelete( id );
    event.status = false;
    await Event.findByIdAndUpdate( id, event, { new: true } );

    res.json({
      ok: true,
      msg: 'Deleted Event successfully'
    });
  } catch ( error : any ) {
    res.status( 500 ).json({
      ok: false,
      msg: 'Please contact the administrator'
    });
  }
};

