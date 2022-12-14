import axios from "axios";


 const WeatherApi = async () => {

// const option = {
//     method: 'post',
//     url: 'https://api.openweathermap.org/data/2.5/weather',
//     params: {
//       lat: 44.0,
//       lon: 44,
//       appid:
//         'https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d',
//     },
//   }
  
  const appID= 'e9151a3b6b68ef9c138552eac062260d'
      
    let response = await axios.post(
      `https://api.openweathermap.org/data/2.5/weather`,{lat: 44.0, lon:22.0, appid:`${appID}`}
    ).catch((error) => {
      console.log(error)
    })
      return response
  };
export default WeatherApi