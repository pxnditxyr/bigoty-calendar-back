
import { Router } from 'express';
import { check } from 'express-validator';

import { deleteProfile, getProfile, setDepartament, updateProfile } from '../controllers';
import { isDate } from '../helpers';

import { jwtValidator, fieldValidators, isSuperUser } from '../middlewares';

const router = Router();

router.use( jwtValidator );

router.get( '/', getProfile );
router.put( '/update',
  [
    check( 'lastName', 'Last name is required' ).not().isEmpty(),
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'birthday', 'Birthday must be a date' ).custom( isDate ),
    check( 'username', 'Username is required' ).not().isEmpty(),
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password is required' ).isLength({ min: 6 }),
    fieldValidators
  ],
  updateProfile
);

router.delete( '/delete', deleteProfile );

router.use( isSuperUser );
router.put( '/set-departament/:departamentId', setDepartament );


export { router as profileRouter };
