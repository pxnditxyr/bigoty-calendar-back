import { Router } from 'express';

import { createDepartament, deleteDepartament, getAllDepartaments, getDepartamentsByOrganization, getDepartamentByUser, updateDepartament } from '../controllers/departament';
import { isSuperUser, jwtValidator } from '../middlewares';

const router = Router();

router.use( jwtValidator );

router.get( '/user', getDepartamentByUser );

router.use( isSuperUser );

router.get( '/', getAllDepartaments );
router.get( '/:organizationId', getDepartamentsByOrganization );
router.post( '/new-departament', createDepartament );
router.put( '/update-departament/:id', updateDepartament );
router.delete( '/delete-departament/:id', deleteDepartament );


export { router as departamentRouter };
