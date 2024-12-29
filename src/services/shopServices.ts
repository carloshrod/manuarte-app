import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const shopServices = {
	getAll: async () => {
		try {
			const res = await axiosPrivate.get(ENV.API.SHOPS, { server: true });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
