import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export type StockItemParams = {
	stockId: string;
	page?: number;
	pageSize?: number;
	productName?: string;
	productVariantName?: string;
	report?: boolean;
};

export type StockItemHistoryParams = {
	stockItemId: string;
	page?: number;
	pageSize?: number;
	dateStart?: string;
	dateEnd?: string;
	type?: string;
	identifier?: string;
};

export const stockItemLibs = {
	getAllByStock: async (params: StockItemParams) => {
		try {
			const res = await axiosPrivate.get(ENV.API.STOCK_ITEMS, { params });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getOneByStock: async (productVariantId: string, stockId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.STOCK_ITEMS}/${productVariantId}/${stockId}`
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getHistory: async (params: StockItemHistoryParams) => {
		try {
			const { stockItemId, ...restParams } = params;
			const res = await axiosPrivate.get(
				`${ENV.API.STOCK_ITEMS}/history/${stockItemId}`,
				{ params: restParams }
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
