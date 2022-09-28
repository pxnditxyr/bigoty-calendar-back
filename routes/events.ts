
import { Router } from 'express';
import { check } from 'express-validator';
import { createNewEvent, deleteEvent, getEvents, updateEvent } from '../controllers';
import { isDate } from '../helpers';
import { fieldValidators, jwtValidator } from '../middlewares';

const router = Router();

router.use( jwtValidator );

router.get( '/', getEvents );

router.post(
  '/new-event',
  [
    check( 'title', 'Title is required' ).not().isEmpty(),
    check( 'start', 'Start date is required and must be a valid date' ).custom( isDate ),
    check( 'end', 'End date is required and must be a valid date' ).custom( isDate ),
    fieldValidators
  ],
  createNewEvent
);

router.put(
  '/update/:id',
  [
    check( 'title', 'Title is required' ).not().isEmpty(),
    check( 'start', 'Start date is required and must be a valid date' ).custom( isDate ),
    check( 'end', 'End date is required and must be a valid date' ).custom( isDate ),
    fieldValidators
  ],
  updateEvent
);
router.delete( '/delete/:id', deleteEvent );
//
export { router as eventsRouter };
