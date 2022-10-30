import { Router } from 'express';
import { check } from 'express-validator';

import { renewToken, signInUser, signUpUser } from '../controllers';
import { isDate } from '../helpers';
import { fieldValidators, jwtValidator } from '../middlewares';

const router = Router();

router.post(
  '/signup',
  [
    check( 'lastName', 'Last name must be at least 3 characters and only letters and spaces' ).isLength( { min: 3 } ).matches( /^[a-zA-Z ]+$/ ),
    check( 'name', 'Name must be at least 2 characters and only letters and spaces' ).isLength( { min: 2 } ).matches( /^[a-zA-Z ]+$/ ),
    check( 'birthday', 'Birthday is required' ).custom( isDate ),
    check( 'username', 'Username must be at least 4 characters and only contain lowercase letters and numbers' ).isLength( { min: 4 } ).matches( /^[a-z0-9]+$/ ),
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password must be at least 6 characters, and contain at least one number and one letter and one special character' ).isLength( { min: 6 } ).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ ),
    fieldValidators 
  ],
  signUpUser
);

router.post(
  '/signin',
  [
    check( 'user', 'Username or Email is required' ).not().isEmpty(),
    check( 'password', 'Password is required' ).not().isEmpty(),
    fieldValidators
  ],
  signInUser
);

router.get( '/renew-token', jwtValidator, renewToken );

export { router as authRouter };
