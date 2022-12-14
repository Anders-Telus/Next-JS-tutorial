import type { NextApiRequest, NextApiResponse } from 'next'

import WeatherApi from '../../components/WeatherAPI'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  let getWeather = await WeatherApi();
  console.log(getWeather,'get weather api')
  res.status(200).json({ getWeather })
}
