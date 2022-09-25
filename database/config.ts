import moongose from 'mongoose';

export const dbConnection = async () => {
  try {
    await moongose.connect( process.env.DB_CNN || '' )
    console.log( 'Database online' );
  } catch ( error : any ) {
    throw new Error( 'Error to connect to database' );
  }
}
