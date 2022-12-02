import {useState} from 'react';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'



  const Weather = () => {
	const [lat, setLat] = useState('');
	const [long, setLong] = useState('');
	const [temp, setTemp] = useState(Number);
	const [minTemp, setMinTemp] = useState(Number);
	const [maxTemp, setMaxTemp] = useState(Number);
	const [err, setErr] = useState(false);
	const appID= 'e9151a3b6b68ef9c138552eac062260d'
	/**
	 *
	 * fetch weather information of the given city
	 */
	const getWeather = () => {
		// resetting states
		setErr(false);

		setTemp(Number);
		const options = {
			method: 'post',
			url: '/api/weatherAPI',
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
	return (
		<div className="flex justify-center items-center h-screen flex-col">
			<div>
				<h2 className="font-raleway text-5xl font-extrabold mb-10 sm:text-4xl">
					Agora Weather App
					Toronto -> 43.6532° N, 79.3832° W
				</h2>
			</div>
			<div className="flex sm:flex-col">
				<input
					type="text"
					placeholder="Lat..."
					className="outline-indigo mr-6 rounded-sm pl-4 w-64 font-raleway sm:mr-0 sm:mb-4 sm:py-1"
					onChange={e => setLat(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Long..."
					className="outline-indigo mr-6 rounded-sm pl-4 w-64 font-raleway sm:mr-0 sm:mb-4 sm:py-1"
					onChange={e => setLong(e.target.value)}
				/>
				<button
					onClick={getWeather}
					className="outline-none border-none font-bold font-raleway px-12 py-2 rounded-sm bg-indigo-300 text-gray-700 transition duration-300 hover:bg-indigo-600 hover:text-white"
				>
					Search
				</button>
			</div>
			{temp && (
				<div className="mt-10 flex flex-col justify-start bg-indigo-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
					<div className="flex mb-4">
						<p className="w-64 sm:w-41">Temperature:</p>
						<p>{temp} ° C</p>
					</div>
					<div className="flex mb-4 sm:w-41">
						<p className="w-64">Temperature Min:</p>
						<p>{minTemp}° C</p>
					</div>
					<div className="flex">
						<p className="w-64 sm:w-41">Temperature Max:</p>
						<p>{maxTemp}° C</p>
					</div>
				</div>
			)}
			{err && (
				<div className="mt-10 bg-red-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
					<p>Couldn't fetch weather results.</p>
				</div>
			)}
		</div>
	);
};

export async function getServerSideProps(req: NextApiRequest,
	res: NextApiResponse<any>) {
	
	    const { data } = await axios.post('https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=e9151a3b6b68ef9c138552eac062260d');
	   console.log(req,'middleware get headers');

		//console.log(NextRequestMetaSymbol?.toString(),'get meta data');
	//const cookies = req.headers.cookie;
		return {props:data};
}

export default Weather;