import axios from 'axios'
export const getWeather = () => {
    // resetting states
   // setErr(false);

   // setTemp(Number);
    const options = {
        method: 'post',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {lat: 55.0, lon: 33.0, appid:'https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d'}
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