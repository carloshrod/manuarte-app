import { ENDPOINTS } from '@/config/env';
import axios from 'axios';

export const userServices = {
	getAllUsers: async () => {
		try {
			const res = await axios.get(ENDPOINTS.USERS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getAllCustomers: async () => {
		try {
			const res = await axios.get(ENDPOINTS.CUSTOMERS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
