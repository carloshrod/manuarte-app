/* eslint-disable no-unused-vars */
import { JwtPayload } from 'jwt-decode';

declare module 'jwt-decode' {
	interface JwtPayload {
		user: {
			id: string;
			email: string;
			roleId: string;
			roleName: string;
			shop: string;
			mainStock: boolean;
			extraPermissions: string[];
		};
	}
}
