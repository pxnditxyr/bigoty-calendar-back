
import { Router } from 'express';
import { createDomain, createFullDomain, createSubdomain, deleteDomain, deleteSubdomain, getAllDomains, getDomain, getSubdomain, updateDomain, updateSubdomain } from '../controllers';
import { isSuperUser, jwtValidator } from '../middlewares';

const router = Router();

router.use( jwtValidator );
router.use( isSuperUser );

router.get( '/get-all', getAllDomains );

router.post( '/new-full-domain', createFullDomain );

router.get( '/domain/:domainName', getDomain );
router.post( '/domain/new-domain', createDomain );
router.put( '/domain/update-domain/:domainName', updateDomain );
router.delete( '/domain/delete-domain/:domainName', deleteDomain );

router.get( '/subdomain/:subdomainName', getSubdomain );
router.post( '/subdomain/new-subdomain/:domainName', createSubdomain );
router.put( '/subdomain/update-subdomain/:subdomainName', updateSubdomain );
router.delete( '/subdomain/delete-subdomain/:subdomainName', deleteSubdomain );

export { router as lookupRouter };
