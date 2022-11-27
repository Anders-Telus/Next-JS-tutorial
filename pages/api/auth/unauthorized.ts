import type { NextApiRequest, NextApiResponse } from 'next';
import { User, users } from "../../../data/mockUsers";

type Data = {
  data: User[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const simpleUsers: User[] = users.filter((user: User) => user.role === "user");

  res.status(401).json({ data: simpleUsers });
};
