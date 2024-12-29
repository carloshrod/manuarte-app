import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const quoteServices = {
	getAll: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.QUOTES, {
				params: { shopSlug },
				server: true
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getOne: async (serialNumber: string) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.QUOTES}/${serialNumber}`, {
				server: true
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
