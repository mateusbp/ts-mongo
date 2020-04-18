import { Types } from 'mongoose';

import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.send('Invalid ID');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.send('User not found');
    }

    return res.json(user);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create(req.body);
    }

    return res.json(user);
  }
}

export default new UserController();
