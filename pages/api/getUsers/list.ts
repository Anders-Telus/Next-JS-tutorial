// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const cookies = new Cookies(req, res) //
  console.log(cookies.get('myCookieName'))
  console.log(req.headers)
  res.status(200).json({ name: cookies.get('myCookieName') })
}