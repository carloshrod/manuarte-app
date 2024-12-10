import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const userServices = {
	getAllStaff: async () => {
		try {
			const res = await axiosPrivate.get(ENV.API.USERS, { server: true });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getAllCustomers: async () => {
		try {
			const res = await axiosPrivate.get(ENV.API.CUSTOMERS, { server: true });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getStaffRoles: async () => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.USERS}/roles`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	registerStaff: async (body: SubmitStaffDto) => {
		return await axiosPrivate.post(ENV.API.USERS, body);
	},

	updateStaff: async (
		body: SubmitStaffDto,
		{ personId, userId }: { personId: string; userId: string }
	) => {
		return await axiosPrivate.put(
			`${ENV.API.USERS}/${personId}/${userId}`,
			body
		);
	},

	deleteStaff: async (personId: string) => {
		return await axiosPrivate.delete(`${ENV.API.USERS}/${personId}`);
	}
};
