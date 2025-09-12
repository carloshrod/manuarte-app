import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const financialFlowServices = {
	getCurrentCashSession: async (shopId: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.CASH_SESSION}/${shopId}/current`
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getCashSessionByDate: async (shopId: string, date: string) => {
		try {
			const res = await axiosPrivate.get(`${ENV.API.CASH_SESSION}/${shopId}`, {
				params: { date }
			});

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	openCashSession: async (
		body: {
			declaredOpeningAmount: number;
			initialPiggyBankAmount?: number;
			comments?: string;
		},
		shopId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/open`,
			body
		);
	},

	closeCashSession: async (
		body: { declaredClosingAmount: number; comments?: string },
		shopId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/close`,
			body
		);
	},

	createCashMovement: async (body: SubmitCashMovementDto, shopId: string) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/movements`,
			body
		);
	},

	withdrawFromPiggyBank: async (
		body: { amount: number; comments: string },
		shopId: string
	) => {
		return await axiosPrivate.post(
			`${ENV.API.CASH_SESSION}/${shopId}/piggy-bank-withdraw`,
			body
		);
	},

	getBankTransferMovements: async (shopId: string, date?: string) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.CASH_SESSION}/${shopId}/bank-movements`,
				{ params: { date } }
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	}
};
