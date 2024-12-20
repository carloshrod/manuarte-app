import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import { AUTH_RULES } from './utils/utils';
import { ROUTES } from './utils/routes';

const { LOGIN, PRODUCTS, QUOTES, INVOICES, STOCK, STOCK_TRANSACTIONS } = ROUTES;

export async function middleware(req: NextRequest) {
	const session = await auth();
	const requestedPage = req.nextUrl.pathname;

	if (!session && requestedPage !== LOGIN) {
		return NextResponse.redirect(new URL(LOGIN, req.url));
	}

	const roleName = session?.user?.roleName as string;
	const extraPermissions = session?.user?.extraPermissions || [];

	const roleRules = AUTH_RULES[roleName] || {
		defaultPath: LOGIN,
		allowedPaths: []
	};

	const hasRoleAccess = roleRules.allowedPaths.includes(requestedPage);
	const hasExtraPermissionAccess = extraPermissions.some(permission => {
		const permissionToPathMap: Record<string, string> = {
			'product-read': PRODUCTS,
			'estimate-read': QUOTES,
			'billing-read': INVOICES,
			'stock-read': STOCK,
			'transaction-read': STOCK_TRANSACTIONS
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

	if (session && requestedPage === LOGIN) {
		return NextResponse.redirect(new URL(roleRules.defaultPath, req.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*', '/auth/login'] };
