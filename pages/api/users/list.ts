import type { NextApiRequest, NextApiResponse } from 'next';
import { User, users } from "../../../data/mockUsers";

type Data = {
  data: User[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const simpleUsers: User[] = users.filter((user: User) => user.role === "user");

  res.status(200).json({ data: simpleUsers });
};
