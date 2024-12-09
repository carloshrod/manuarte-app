import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const userServices = {
	getAllUsers: async () => {
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
	}
};
