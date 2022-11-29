const getWeather = () => {
    // resetting states
    setErr(false);

    setTemp(Number);
    const options = {
        method: 'post',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {lat: `${lat}`, lon: `${long}`, appid:`${appID}`}
    };
    axios
        .request(options)
        .then(function (response:any) {
            console.log(response.data);
            const {data} = response;
            const newTemp = Math.ceil(data.main.temp);
            const newMinTemp = Math.ceil(data.main.temp_min);
            const newMaxTemp = Math.ceil(data.main.temp_max);
            setTemp(newTemp);
            setMinTemp(newMinTemp);
            setMaxTemp(newMaxTemp);
        })
        .catch(function (error:any) {
            console.error(error);
            setErr(true);
        });
};