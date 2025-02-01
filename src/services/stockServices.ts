import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const stockServices = {
	getAllItems: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.STOCK_ITEMS, {
				params: { shopSlug }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
