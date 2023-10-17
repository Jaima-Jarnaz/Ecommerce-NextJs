import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const url = request.nextUrl.clone();
  // console.log("url", url);
  let isLoggedIn = request.cookies.has("access_token");
  if (
    (request.nextUrl.pathname.startsWith("/auth/signin") ||
      request.nextUrl.pathname.startsWith("/auth/signup")) &&
    isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/auth/signin/:path*",
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   let cookie = request.cookies.get("access_token");
//   console.log(cookie);

//   // const allCookies = request.cookies.getAll();
//   // console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

//   // request.cookies.has("nextjs"); // => true
//   // request.cookies.delete("nextjs");
//   // request.cookies.has("nextjs"); // => false

//   // Setting cookies on the response using the `ResponseCookies` API
//   const response = NextResponse.next();
//   response.cookies.set("vercel", "fast");
//   response.cookies.set({
//     name: "vercel",
//     value: "fast",
//     path: "/",
//   });
//   cookie = response.cookies.get("vercel");
//   console.log(cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
//   // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

//   return response;
// }
