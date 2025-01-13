import User, { IUser } from '../models/user.model';

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const addUser = async (userData: { name: string; email: string; password: string }): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};
