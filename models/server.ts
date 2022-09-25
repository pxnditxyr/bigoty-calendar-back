import express, { Application } from 'express';
import cors from 'cors';

import { authRouter } from '../routes';

export class Server {

  private app : Application;
  private port : string;
  private apiPaths = {
    auth: '/api/auth',
  }

  constructor () {
    this.app = express();
    this.port = process.env.PORT || '4000';

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
  }

  listen () {
    this.app.listen( this.port, () => {
      console.log( `Server running on port ${ this.port }!!` );
      console.log( `http://localhost:${ this.port }` );
    });
  }
}
