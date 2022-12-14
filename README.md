# Purpose of why we built this application

How can we manipulate request headers , json requests , security and how to use middlewear

## Getting Started

First, run the development server:

```bash
npm run install && npm run dev
# or
yarn install && yarn dev
```

## To Test out the middleware click on any of the nav bars to navigate to a route

- Look at a file called middleware to see the implementation

- The major work is how you structure this  config statement with out this we are unable to secure a route.

``code
export const config = {
    matcher: ['/api/users/:path*', '/api/admin/:path*']
};

``

## Pages and API

- Please route to /weather

this page does a few things. Please take note and look at the custom headers we set in the middlewear.

We can also redirect a user based on a guard we use in next.config.js and in ther middlewear its self. 

For example  this code will check if you are not authenticated or not.

``code
  if (isAdminRoute(pathname)) {
    console.log('made it to unauthorized')
    return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
  }

``


## Please sign up and obtain a API key from your new account

- <https://openweathermap.org/api/geocoding-api#reverse_how>

## Test out the weather from Toronto

43.6532° N, 79.3832° W
