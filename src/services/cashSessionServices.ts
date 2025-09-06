import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const cashSessionServices = {
	getOne: async (shopId: string) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.CASH_SESSION}/${shopId}`);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	open: async (
		body: { declaredOpeningAmount: number; comments?: string },
		shopId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/open`,
			body
		);
	},

	close: async (
		body: { declaredClosingAmount: number; comments?: string },
		shopId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/close`,
			body
		);
	},

	createMovement: async (body: SubmitCashMovementDto, shopId: string) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/movements`,
			body
		);
	}
};
