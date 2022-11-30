import { NextRequest, NextResponse, userAgent } from 'next/server'
import axios from 'axios'
import { NextApiResponse } from 'next'
import Cookies from 'cookies'

type ResponseBody = { message: string }

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/api/admin')
}

const isUserRoute = (pathname: string) => {
  return pathname.startsWith('/api/users')
}

const isExternalApi = (pathName: string) => {
  return pathName.startsWith('api.openweathermap')
}
const weather = () => {
  const options = {
    method: 'post',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      lat: '43.65',
      lon: '43.65',
      appid: 'e9151a3b6b68ef9c138552eac062260d',
    },
  }
  axios
    .request(options)
    .then(function (response: any) {
      const { data } = response
      console.log(response, 'middleware test with api call')
      return  response.status(200).json({data: response})

  //    return response.json(200, response)
    })

    .catch(function (error: any) {})
}

export async function middleware(req: NextRequest, res: NextApiResponse<any>) {
  console.log(req.cookies, 'cookies made it')

  console.log(req, 'NextRequest')
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/weather')) {
    const cookies = new Cookies(req, res)
   console.log(cookies, 'got cookies')
  
   const { device } = userAgent(req)
   const deviceType = device.type = 'mobile'
   const response = NextResponse.next()
   response.headers.append('device-type', deviceType)

   response.headers.append('data',cookies);

    //Test API Call
   let getWeather = await weather();
   return NextResponse.rewrite(new URL('/api/auth/unauthorized', req.url))
return NextResponse.rewrite('/api/auth/unauthorized');
   
   //new Response(JSON.stringify(getWeather))
  // return NextResponse.json({getWeather}); 

  }

  if (isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/weather:path*', '/api/admin/:path*'],
}
