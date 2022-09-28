import { Router } from 'express';
import { check } from 'express-validator';

import { renewToken, signInUser, signUpUser } from '../controllers';
import { fieldValidators, jwtValidator } from '../middlewares';

const router = Router();

router.post(
  '/signup',
  [
    check( 'lastName', 'Last name is required' ).not().isEmpty(),
    check( 'name', 'Name is required' ).not().isEmpty(),
    check( 'birthday', 'Birthday is required' ).not().isEmpty(),
    check( 'username', 'Username is required' ).not().isEmpty(),
    check( 'email', 'Email is required' ).isEmail(),
    check( 'password', 'Password is required' ).isLength({ min: 6 }),
    check( 'confirmPassword', 'Confirm password is required' ).isLength({ min: 6 }),
    fieldValidators 
  ],
  signUpUser
);

router.post(
  '/signin',
  [
    check( 'user', 'Username or Email is required' ).not().isEmpty(),
    check( 'password', 'Password is required' ).isLength({ min: 6 }),
    fieldValidators
  ],
  signInUser
);

router.get( '/renew-token', jwtValidator, renewToken );

export { router as authRouter };
