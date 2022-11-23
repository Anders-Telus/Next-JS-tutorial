import { NextResponse,userAgent ,NextRequest} from 'next/server'


// Runs only on matched pages, because of config
export function middleware(request: NextRequest) {

  //authorization
  const role = request.headers.get("authorization") ?? '';
  const { pathname } = request.nextUrl;

  if (isUserRoute(pathname) && ["user", "admin"].includes(role)) {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
  }

  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
  }
  //check headers
  if(checkHeaders(request)){
  // 
  NextResponse.next();
  }

  if(checkSecretKey(request)){
    NextResponse.next();
  }
  if(protectedRouteWithSecretParams(request)){
    NextResponse.next();
  }

  if(checkPathNames(request)){
    NextResponse.next();
  }
  
}

const checkHeaders = (request: NextRequest)=>{
  const hostname = request.headers.get('host')
  const { device } = userAgent(request)

  // If example.com visited from mobile, redirect to m.example.com
  if (hostname === 'example.com' && device.type === 'mobile') {
    const url = request.nextUrl.clone()
    url.hostname = 'm.example.com'
    return NextResponse.redirect(url)
  }

  // If m.example.com visited, rewrite to /pages/mobile
  if (hostname === 'm.example.com') {
    const url = request.nextUrl.clone()
    url.pathname = '/mobile' +  url.pathname
    return NextResponse.rewrite(url)
  }
}


//bots

// secret key
const checkSecretKey = (request: NextRequest) => {
  const secretKey = 'artichoke'
  if (request.nextUrl.pathname === '/api/query') {
    const headerKey = request.headers.get('secret-key')

    // If secret keys match, allow access
    if (headerKey === secretKey) {
      return NextResponse.next()
    }

    // Otherwise, redirect to your custom error page
    const url = request.nextUrl.clone()
    url.pathname = '/unauthorised'
    return NextResponse.redirect(url)
  }
}

const protectedRouteWithSecretParams = (request)=> {
    if (request.url.includes("/protected")) {
  
        // Get the secret from the url params
        const urlParams = new URLSearchParams(request.nextUrl.search);
        const secret = urlParams.get("secret");
      
        // Check if secret exists, if it does
        // then it must be correct.
        if (secret && secret === "mysecret") {
      
          // If secret matches we will continue
          // to the protected route.
          return NextResponse.next();
      
        } else {
      
          // If the secret doesn't exist or is incorrect
          // we'll redirect to the index (Home) page.
          return NextResponse.redirect("http://localhost:3000/");
        }
}
}


const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/api/admin');
}

const isUserRoute = (pathname: string) => {
  return pathname.startsWith('/api/users');
}


const checkPathNames = (request: NextRequest) => {
  const hostname = request.headers.get('host')

  // If on beta.example.com, redirect to example.com/beta
  if (hostname === 'beta.example.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'example.com'
    url.pathname = '/beta' + url.pathname
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: ['/about', '/articles/:path*'],
}
