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

	getAssignablePermissions: async (userId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.USERS}/assignable-permissions/${userId}`
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	registerStaff: async (body: SubmitStaffDto) => {
		return await axiosPrivate.post(ENV.API.USERS, body);
	},

	setPermissions: async (
		body: { extraPermissions: string[] },
		userId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.USERS}/set-permissions/${userId}`,
			body
		);
	},

	updateStaff: async (body: SubmitStaffDto, personId: string) => {
		return await axiosPrivate.put(`${ENV.API.USERS}/${personId}`, body);
	},

	deleteStaff: async (personId: string) => {
		return await axiosPrivate.delete(`${ENV.API.USERS}/${personId}`);
	},

	registerCustomer: async (body: SubmitCustomerDto) => {
		return await axiosPrivate.post(ENV.API.CUSTOMERS, body);
	},

	updateCustomer: async (body: SubmitCustomerDto, personId: string) => {
		return await axiosPrivate.put(`${ENV.API.CUSTOMERS}/${personId}`, body);
	},

	deleteCustomer: async (personId: string) => {
		return await axiosPrivate.delete(`${ENV.API.CUSTOMERS}/${personId}`);
	}
};
