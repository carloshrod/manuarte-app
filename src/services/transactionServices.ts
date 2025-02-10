import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const transactionServices = {
	getAll: async () => {
		try {
			const res = await axiosPrivate.get(ENV.API.TRANSACTIONS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitTransactionDto) => {
		return await axiosPrivate.post(ENV.API.TRANSACTIONS, body);
	}
};
