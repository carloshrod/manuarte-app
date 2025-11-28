import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';
import { TransactionState, TransactionType } from '@/types/enums';

export type TransactionParams = {
	page?: number;
	pageSize?: number;
	state?: TransactionState;
	type?: TransactionType;
	stockId?: string;
	fromId?: string;
	toId?: string;
	dateStart?: string;
	dateEnd?: string;
};

export const transactionLibs = {
	getAll: async (params?: TransactionParams) => {
		try {
			const res = await axiosPrivate.get(ENV.API.TRANSACTIONS, {
				params
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getItems: async (transactionId: string, stockId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.TRANSACTIONS}/items/${transactionId}`,
				{
					params: { stockId }
				}
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitTransactionDto) => {
		return await axiosPrivate.post(ENV.API.TRANSACTIONS, body);
	},

	update: async (body: SubmitTransactionDto, transactionId: string) => {
		return await axiosPrivate.put(
			`${ENV.API.TRANSACTIONS}/transfer/${transactionId}`,
			body
		);
	}
};
