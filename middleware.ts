import { NextRequest, NextResponse, userAgent } from 'next/server'
import axios from 'axios'
import { NextApiResponse } from 'next'

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/api/admin');
}
const weather:any = async () => {
  console.log('made it')
  const options = {
    method: 'post',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      lat: '43.65',
      lon: '43.65',
      appid: 'e9151a3b6b68ef9c138552eac062260d',
    },
  }
  console.log('testing api')

  axios
    .request(options)
    .then((response: any) => {
      const { data } = response;
      console.log(response, 'middleware test with api call');
      return data;
    })
    .catch(function (error: any) {console.log(error,'http error')})
}

export async function middleware(req: NextRequest, res: NextApiResponse<any>) {
  
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/weather')) {
    const response = NextResponse.next();
    let getData = await  weather();
    req.headers.set('Access-Control-Allow-Origin', '*')
    req.cookies.set('myCookieName', 'anders')
    req.headers.set('anders', 'lind')
    response.headers.append('device-type', '007 phones')
    response.headers.append('device-type', getData)
    response.headers.append('agora', 'Made it')
    response.headers.set('set-cookie', 'toronto weather is very cold')
    response.cookies.set('cookie-monster','give me a cookie')
    
    return response
  }

  if (isAdminRoute(pathname)) {
    const response = NextResponse.next()
    console.log('made it to unauthorized')
   let getData =  weather();
  
   response.headers.append('device-type', getData.data)
   response.cookies.set('cookiesssr',getData.data)
    return response
   //return response;
  return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
  }

  return NextResponse.next()
}
export const config = {
  runtime: 'experimental-edge',
  matcher: ['/weather:path*', '/api/admin/:path*'],
}
