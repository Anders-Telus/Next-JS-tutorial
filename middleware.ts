import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { NextApiResponse } from 'next';

type ResponseBody = { message: string };

const isAdminRoute = (pathname: string) => {
    return pathname.startsWith('/api/admin');
}

const isUserRoute = (pathname: string) => {
    return pathname.startsWith('/api/users');
}

const isExternalApi = (pathName: string) =>  {
  return pathName.startsWith('api.openweathermap');
}
const weather =()=>{
  const options = {
    method: 'post',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    params: {lat:'43.65', lon:'43.65', appid:'e9151a3b6b68ef9c138552eac062260d'}
  };
  axios
    .request(options)
    .then(function (response:any) {
      console.log(response.data);
      const {data} = response;
      const newTemp = Math.ceil(data.main.temp);
      const newMinTemp = Math.ceil(data.main.temp_min);
      const newMaxTemp = Math.ceil(data.main.temp_max);
      return response.json(401);
    //  setTemp(newTemp);
   //   setMinTemp(newMinTemp);
    //  setMaxTemp(newMaxTemp);
    })
    .catch(function (error:any) {
      console.error(error);
    //  setErr(true);
    });
}

export async function middleware(req: NextRequest,  res: NextApiResponse<any>) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/weather")){
 //  await weather();
    console.log(res,'middleware' );
   // return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
   // return NextResponse.next();
  }
 
  const role = req.headers.get("authorization") ?? '';


//   if (isUserRoute(pathname)) {
    
//       return NextResponse.redirect(new URL('/api/getUsers/list'));
  
//   }
//  //   

//   if (isAdminRoute(pathname) && role !== "admin") {
//     return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
//   }



  return NextResponse.next();
}

export const config = { matcher: '/((?!.*\\.).*)' }

// export const config = {
//     matcher: ['/api/']
// };
