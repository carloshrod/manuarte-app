import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';
import { mapBillingBody } from '@/services/utils';
import { BillingStatus, PaymentMethod } from '@/types/enums';

export type BillingParams = {
	page?: number;
	pageSize?: number;
	shopId: string;
	serialNumber?: string;
	status?: BillingStatus;
	paymentMethods?: PaymentMethod;
	customerName?: string;
	dateStart?: string;
	dateEnd?: string;
};

export const billingLibs = {
	getAll: async (params: BillingParams) => {
		try {
			const res = await axiosPrivate.get(ENV.API.BILLINGS, { params });

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
		body: {
			status: string;
			payments: Payment[];
			stockId: string;
			items: BillingItem[];
			comments: string;
		},
		billingId: string
	) => {
		return await axiosPrivate.put(`${ENV.API.BILLINGS}/${billingId}`, body);
	},

	cancel: async (serialNumber: string) => {
		return await axiosPrivate.delete(
			`${ENV.API.BILLINGS}/cancel/${serialNumber}`
		);
	}
};
