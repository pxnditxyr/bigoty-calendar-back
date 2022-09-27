import jwt from 'jsonwebtoken';

export const generateJWT = ( uid : string, lastName : string, name : string, email : string, username : string ) : Promise<string> => {

  return new Promise( ( resolve, reject ) => {

    const payload = { uid, lastName, name, email, username };

    jwt.sign( payload, process.env.SECRET_JWT_SEED || '', {
      expiresIn: '24h'
    }, ( error, token ) => {
      if ( error ) {
        console.log( error );
        reject( 'Could not generate token' );
      }
      if ( token ) 
        resolve( token );
    })
  });
}
