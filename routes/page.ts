import { Router } from 'express';
import { check } from 'express-validator';

import { createNewPage, deletePage, getPage, updatePage } from '../controllers';
import { fieldValidators, jwtValidator } from '../middlewares';

const router = Router();

router.use( jwtValidator );

router.get( '/', getPage );

router.post(
  '/new-page',
  [
    check( 'title', 'Title is required' ).not().isEmpty(),
    fieldValidators
  ],
  createNewPage
);

router.put(
  '/update',
  [
    check( 'title', 'Title is required' ).not().isEmpty(),
    fieldValidators
  ],
  updatePage
);
router.delete( '/delete', deletePage );

export { router as pageRouter };

