import type { NextApiRequest, NextApiResponse } from 'next';
import { User, users } from '../../../data/data';

type Data = {
  data: User[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const simpleUsers: User[] = users.filter((user) => user.role === "admin");

  res.status(200).json({ data: simpleUsers });
};

