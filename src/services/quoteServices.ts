import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';
import { mapQuoteBody } from './utils';

export const quoteServices = {
	getAll: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.QUOTES, {
				params: { shopSlug }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getOne: async ({
		serialNumber
	}: {
		serialNumber: string;
		server?: boolean;
	}) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.QUOTES}/${serialNumber}`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitQuoteDto) => {
		const mappedBody = mapQuoteBody(body);
		return await axiosPrivate.post(ENV.API.QUOTES, mappedBody);
	},

	update: async (body: SubmitQuoteDto, quoteId: string) => {
		const mappedBody = mapQuoteBody(body);
		return await axiosPrivate.put(`${ENV.API.QUOTES}/${quoteId}`, mappedBody);
	},

	delete: async (quoteId: string) => {
		return axiosPrivate.delete(`${ENV.API.QUOTES}/${quoteId}`);
	}
};
