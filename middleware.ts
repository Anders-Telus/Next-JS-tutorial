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
  console.log('made it');
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
    .then((response: any) => {
      const { data } = response
      console.log(response, 'middleware test with api call')
      return data;

      //    return response.json(200, response)
    })

    .catch(function (error: any) {})
}

export async function middleware(req: NextRequest, res: NextApiResponse<any>) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/weather')) {
    const response = NextResponse.next();
    const cookies = new Cookies(req, res)
     req.cookies.set('myCookieName', 'anders');
    req.headers.set('anders','lind');
    let getWeather = await weather()

    const { device } = userAgent(req)
    const deviceType = (device.type = 'mobile')
   
    response.headers.append('device-type', deviceType)
    response.headers.append('agora', 'Made it')
    response.headers.set('set-cookie', 'anders-was-here')
    response.headers.set('x-modified-edge', JSON.stringify(getWeather))

    //Test API Call
   // let getWeather = await weather()
    return response
  }

  if (isAdminRoute(pathname)) {
    console.log('made it to unauthorized')
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/weather:path*', '/api/admin/:path*'],
}
