import { Request, Response } from 'express';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  console.log("got call in createUser")
  const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return 
    }
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error});
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
