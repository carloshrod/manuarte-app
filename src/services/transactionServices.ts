import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const transactionServices = {
	getAll: async (toId?: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.TRANSACTIONS, {
				params: { toId }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getItems: async (transactionId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.TRANSACTIONS}/items/${transactionId}`
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitTransactionDto) => {
		return await axiosPrivate.post(ENV.API.TRANSACTIONS, body);
	}
};
