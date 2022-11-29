# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## To Test out the middleware click on any of the nav bars to navigate to a route

- Look at a file called middleware to see the implementation

- The major work is how you structure this  config statement with out this we are unable to secure a route.

``code
export const config = {
    matcher: ['/api/users/:path*', '/api/admin/:path*']
};

``

## Please sign up and obtain a API key from your new account

- <https://openweathermap.org/api/geocoding-api#reverse_how>

## Test out the weather from Toronto

43.6532° N, 79.3832° W
