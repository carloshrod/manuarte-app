import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const stockItemServices = {
	getAll: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.STOCK_ITEMS, {
				params: { shopSlug }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getHistory: async (productVariantId: string, stockId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.STOCK_ITEMS}/${productVariantId}/${stockId}`
			);

			if (res.status === 200) {
				return res.data;
			}
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitStockItemDto) => {
		return await axiosPrivate.post(ENV.API.STOCK_ITEMS, body);
	},

	update: async (body: SubmitStockItemDto, stockItemId: string) => {
		return await axiosPrivate.put(
			`${ENV.API.STOCK_ITEMS}/${stockItemId}`,
			body
		);
	},

	delete: async (stockItemId: string) => {
		return await axiosPrivate.delete(`${ENV.API.STOCK_ITEMS}/${stockItemId}`);
	}
};
