import { ENDPOINTS } from '@/config/env';
import axios from 'axios';

export const DashboardServices = {
	getStats: async () => {
		try {
			const res = await axios.get(`${ENDPOINTS.DASHBOARD}/stats`);

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	},

	getMonthlySales: async () => {
		try {
			const res = await axios.get(`${ENDPOINTS.DASHBOARD}/monthly-sales`);

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	},

	getTopSales: async (month: number) => {
		try {
			const res = await axios.get(`${ENDPOINTS.DASHBOARD}/top-sales/${month}`);

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	}
};
