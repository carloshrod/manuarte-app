import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import { AUTH_RULES } from './utils/utils';

export async function middleware(req: NextRequest) {
	const session = await auth();
	const requestedPage = req.nextUrl.pathname;

	if (!session && requestedPage !== '/auth/login') {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	const roleName = session?.user?.roleName as string;
	const extraPermissions = session?.user?.extraPermissions || [];

	const roleRules = AUTH_RULES[roleName] || {
		defaultPath: '/auth/login',
		allowedPaths: []
	};

	const hasRoleAccess = roleRules.allowedPaths.includes(requestedPage);
	const hasExtraPermissionAccess = extraPermissions.some(permission => {
		const permissionToPathMap: Record<string, string> = {
			'product-read': '/admin/products',
			'estimate-read': '/admin/quotes',
			'billing-read': '/admin/invoices',
			'stock-read': '/admin/stock',
			'transaction-read': '/admin/stock-transfers'
		};
		return permissionToPathMap[permission] === requestedPage;
	});

	if (
		session &&
		!hasRoleAccess &&
		!hasExtraPermissionAccess &&
		requestedPage !== roleRules.defaultPath
	) {
		return NextResponse.redirect(new URL(roleRules.defaultPath, req.url));
	}

	// Si está en login pero ya tiene sesión, redirigir según su rol
	if (session && requestedPage === '/auth/login') {
		return NextResponse.redirect(new URL(roleRules.defaultPath, req.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/auth/login'] };
