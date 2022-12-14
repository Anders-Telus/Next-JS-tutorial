import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type ResponseBody = { message:{} }

export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  let weather = await getWeather ();
  console.log(weather,'Data is here');
  res.status(200).json({ message:weather.data })
}

function simpleStringify (object:any){
  // stringify an object, avoiding circular structures
  // https://stackoverflow.com/a/31557814
  var simpleObject:any = {};
  for (var prop in object ){
      if (!object.hasOwnProperty(prop)){
          continue;
      }
      if (typeof(object[prop]) == 'object'){
          continue;
      }
      if (typeof(object[prop]) == 'function'){
          continue;
      }
      simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

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
	

const getWeather = async () => {
  // resetting states
  
  const options = {    
    method: 'post',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {lat: 44.0, lon:22.0, appid:`${appID}`}
  };

let response = await axios.post('https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d');
  
return response
};