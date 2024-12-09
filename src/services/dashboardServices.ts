import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

const { API } = ENV;

export const dashboardServices = {
	getStats: async (month: number) => {
		try {
			const res = await axiosPrivate.get(`${API.DASHBOARD}/stats`, {
				server: true,
				params: { month }
			});

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	}
};
