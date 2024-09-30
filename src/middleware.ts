import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('session'); // Adjust cookie name if needed

    // If there's no token and the path is protected, redirect to login
    if (!token && req.nextUrl.pathname.startsWith('/recommendations') ) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect', req.nextUrl.pathname); // Store intended path
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/codex', '/profile'],
  }