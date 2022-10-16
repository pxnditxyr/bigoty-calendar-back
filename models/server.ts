import express, { Application } from 'express';
import cors from 'cors';

import { authRouter, departamentRouter, eventsRouter, lookupRouter, organizationRouter, pageRouter, profileRouter } from '../routes';
import { dbConnection } from '../database';

export class Server {

  private app : Application;
  private port : string;
  private apiPaths = {
    auth: '/api/auth',
    events: '/api/events',
    page: '/api/page',
    profile: '/api/profile',
    lookup: '/api/lookup',
    organization: '/api/organization',
    departament: '/api/departament',
  }

  constructor () {
    this.app = express();
    this.port = process.env.PORT || '4000';

    this.connectToDatabase();
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.static( 'public' ) );
  }

  routes () {
    this.app.use( this.apiPaths.auth, authRouter );
    this.app.use( this.apiPaths.events, eventsRouter );
    this.app.use( this.apiPaths.page, pageRouter );
    this.app.use( this.apiPaths.profile, profileRouter );
    this.app.use( this.apiPaths.lookup, lookupRouter );
    this.app.use( this.apiPaths.organization, organizationRouter );
    this.app.use( this.apiPaths.departament, departamentRouter );
  }

  async connectToDatabase () {
    await dbConnection();
  }

  listen () {
    this.app.listen( this.port, () => {
      console.log( `Server running on port ${ this.port }` );
      console.log( `http://localhost:${ this.port }` );
    });
  }
}
