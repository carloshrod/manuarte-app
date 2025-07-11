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

	update: async (
		body: { status: string; payments: Payment[] },
		billingId: string
	) => {
		return await axiosPrivate.put(`${ENV.API.BILLINGS}/${billingId}`, body);
	},

	cancel: async (serialNumber: string) => {
		return await axiosPrivate.delete(
			`${ENV.API.BILLINGS}/cancel/${serialNumber}`
		);
	},

	delete: async (billingId: string) => {
		return await axiosPrivate.delete(`${ENV.API.BILLINGS}/${billingId}`);
	}
};
