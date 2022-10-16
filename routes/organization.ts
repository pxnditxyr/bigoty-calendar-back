
import { Router } from 'express';
import { createOrganization, deleteOrganization, getAllDomains, getAllOrganizations, getOrganizationsByName, updateOrganization } from '../controllers';
import { isSuperUser, jwtValidator } from '../middlewares';

const router = Router();

router.use( jwtValidator );
router.use( isSuperUser );

router.get( '/', getAllOrganizations );
router.get( '/:name', getOrganizationsByName );

router.post( '/new-organization', createOrganization );
router.put( '/update-organization/:id', updateOrganization  );
router.delete( '/delete-organization/:id', deleteOrganization );

export { router as organizationRouter };
