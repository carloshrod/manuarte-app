import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';
import { mapBillingBody } from './utils';

export const billingServices = {
	getAll: async (shopSlug: string) => {
		try {
			const res = await axiosPrivate.get(ENV.API.BILLINGS, {
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
			const res = await axiosPrivate.get(`${ENV.API.BILLINGS}/${serialNumber}`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	create: async (body: SubmitBillingDto) => {
		const mappedBody = mapBillingBody(body);
		return await axiosPrivate.post(ENV.API.BILLINGS, mappedBody);
	},

	cancel: async (serialNumber: string) => {
		return await axiosPrivate.delete(`${ENV.API.BILLINGS}/${serialNumber}`);
	}
};
