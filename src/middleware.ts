import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextRequest) {
	const session = await auth();
	const requestedPage = req.nextUrl.pathname;

	if (!session && requestedPage !== '/auth/login') {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	if (session && requestedPage === '/auth/login') {
		return NextResponse.redirect(new URL('/admin/dashboard', req.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/auth/login'] };
