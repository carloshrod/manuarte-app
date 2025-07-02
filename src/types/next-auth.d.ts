/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			userId: string;
			email: string;
			roleId: string;
			roleName: string;
			shop: string;
			isoCode: string;
			mainStock: boolean;
			extraPermissions: string[];
			accessToken?: string;
			refreshToken?: string;
		};
		accessToken: string;
		refreshToken: string;
	}

	interface User {
		userId: string;
		email: string;
		accessToken: string;
		refreshToken: string;
	}
}
