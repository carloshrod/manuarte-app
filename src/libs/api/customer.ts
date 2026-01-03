import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

type AllCustomersApiResponse = {
	customers: Customer[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
};

export type CustomerParams = {
	page?: number;
	pageSize?: number;
	isoCode?: string;
	dni?: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	cityName?: string;
};

export const customerLibs = {
	getAllCustomers: async (params?: CustomerParams) => {
		try {
			const res = await axiosPrivate.get<AllCustomersApiResponse>(
				ENV.API.CUSTOMERS,
				{ params }
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getCustomerById: async (customerId: string, server: boolean = false) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.CUSTOMERS}/${customerId}`, {
				server
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getCustomerStats: async (customerId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.CUSTOMERS}/stats/${customerId}`,
				{
					server: true
				}
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getTopCustomers: async (params?: CustomerParams) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.CUSTOMERS}/top`, {
				params
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	registerCustomer: async (body: SubmitCustomerDto) => {
		return await axiosPrivate.post(ENV.API.CUSTOMERS, body);
	},

	updateCustomer: async (body: SubmitCustomerDto, personId: string) => {
		return await axiosPrivate.put(`${ENV.API.CUSTOMERS}/${personId}`, body);
	},

	deleteCustomer: async (personId: string) => {
		return await axiosPrivate.delete(`${ENV.API.CUSTOMERS}/${personId}`);
	},

	searchCustomer: async (search: string, isoCode: string) => {
		const res = await axiosPrivate.get(`${ENV.API.CUSTOMERS}/search`, {
			params: { search, isoCode }
		});

		if (res.status === 200) {
			return res.data;
		}
	}
};
