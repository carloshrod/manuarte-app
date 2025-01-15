import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const shopServices = {
	getAll: async (server: boolean = true) => {
		try {
			const res = await axiosPrivate.get(ENV.API.SHOPS, { server });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
