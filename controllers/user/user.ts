import User from '../../models/user/User';

export const getUserById = async ( id : string )  => {
  const user = await User.findById( id );
  return user;
};

export const getUserByEmail = async ( email : string )  => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserByUsername = async ( username : string )  => {
  const user = await User.findOne({ username });
  return user;
};

export const getUserByEmailOrUsername = async ( userData : string )  => {
  const user = await User.findOne({ $or: [{ email: userData }, { username: userData }] });
  return user;
}
