
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
    check( 'lastName', 'Last name must be at least 3 characters and only letters and spaces' ).isLength( { min: 3 } ).matches( /^[a-zA-Z ]+$/ ),
    check( 'name', 'Name must be at least 2 characters and only letters and spaces' ).isLength( { min: 2 } ).matches( /^[a-zA-Z ]+$/ ),
    check( 'birthday', 'Birthday is required' ).custom( isDate ),
    check( 'username', 'Username must be at least 4 characters and only contain lowercase letters and numbers' ).isLength( { min: 4 } ).matches( /^[a-z0-9]+$/ ),
    check( 'email', 'Email is required' ).isEmail(),
    fieldValidators
  ],
  updateProfile
);

router.delete( '/delete', deleteProfile );

router.use( isSuperUser );
router.put( '/set-departament/:departamentId', setDepartament );


export { router as profileRouter };
