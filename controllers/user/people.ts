import People from '../../models/user/People'

export const getPeopleById = async ( id : string ) => {
  const people = await People.findById( id );
  return people;
};
