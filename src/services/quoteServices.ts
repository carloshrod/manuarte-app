import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';
import { mapQuoteBody } from './utils';

export const quoteServices = {
	getAllQuotes: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.QUOTES, {
				params: { shopSlug }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getOneQuote: async ({
		serialNumber,
		server = true
	}: {
		serialNumber: string;
		server?: boolean;
	}) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.QUOTES}/${serialNumber}`, {
				server
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	createQuote: async (body: SubmitQuoteDto) => {
		const mappedBody = mapQuoteBody(body);
		return await axiosPrivate.post(ENV.API.QUOTES, mappedBody);
	},

	updateQuote: async (body: SubmitQuoteDto, quoteId: string) => {
		const mappedBody = mapQuoteBody(body);
		return await axiosPrivate.put(`${ENV.API.QUOTES}/${quoteId}`, mappedBody);
	},

	deleteQuote: async (quoteId: string) => {
		return axiosPrivate.delete(`${ENV.API.QUOTES}/${quoteId}`);
	}
};
