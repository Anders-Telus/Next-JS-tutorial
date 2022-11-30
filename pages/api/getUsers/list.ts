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

export async function getServerSideProps({ req, res }) {
  //   const { data } = await axios.post('https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d',config);
  //console.log(cookies.get('myCookieName'))
  // console.log(data, 'ServerProps')
  //	console.log(data.headers);
  //	const cookies = new Cookies(data)// Create a cookies instance
  const cookies = new Cookies(req, res) //
  return { props: cookies.get('myCookieName') }
}
