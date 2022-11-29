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

export async function middleware(req: NextRequest,  res: NextApiResponse<any>) {
  const role = req.headers.get("authorization") ?? '';
  const { pathname } = req.nextUrl;

  if (isUserRoute(pathname)) {
    
      return NextResponse.redirect(new URL('/api/getUsers/list'));
  
  }
 //   

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
  }



  return NextResponse.next();
}


export const config = {
    matcher: ['/api/users/:path*', '/api/admin/:path*', '/weather']
};
