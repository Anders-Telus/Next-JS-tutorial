import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type ResponseBody = { message: string }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>,
) {
  getWeather ()
  res.status(401).json({ message: 'Try again with the corrct password' })
}

const option: any = {
  method: 'post',
  url: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    lat: 44.0,
    lon: 44,
    appid:
      'https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d',
  },
}

const appID= 'e9151a3b6b68ef9c138552eac062260d'
	

const getWeather = () => {
  // resetting states
  
  const options = {    
    method: 'post',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {lat: 44.0, lon:22.0, appid:`${appID}`}
  };
  axios
    .request(options)
    .then(function (response:any) {
      console.log(response.data);
      const {data} = response;
      const newTemp = Math.ceil(data.main.temp);
      const newMinTemp = Math.ceil(data.main.temp_min);
      const newMaxTemp = Math.ceil(data.main.temp_max);
      
    })
    .catch(function (error:any) {
      console.error(error);
    
    });
};