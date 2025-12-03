import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

const { API } = ENV;

export const dashboardServices = {
	getStats: async () => {
		try {
			const res = await axiosPrivate.get(`${API.DASHBOARD}/stats`, {
				server: true
			});

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	},

	getTopSales: async (year?: number, month?: number) => {
		try {
			const params: { year?: number; month?: number } = {};
			if (year) params.year = year;
			if (month) params.month = month;

			const res = await axiosPrivate.get(`${API.DASHBOARD}/top-sales`, {
				params
			});

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	},

	getSalesReport: async (currency: string, year?: string, month?: string) => {
		try {
			const params: { year?: string; month?: string } = {};
			if (year) params.year = year;
			if (month) params.month = month;

			const res = await axiosPrivate.get<SalesReport>(
				`${API.DASHBOARD}/sales-report`,
				{
					params: { ...params, currency }
				}
			);

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	}
};
