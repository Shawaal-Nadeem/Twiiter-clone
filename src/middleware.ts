import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // if (request.nextUrl.pathname.startsWith('/home') || request.nextUrl.pathname.startsWith('/profiles')) {
    //     return NextResponse.redirect(new URL('/login',request.url))
    // }
}
