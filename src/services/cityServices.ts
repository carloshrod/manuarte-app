import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const cityServices = {
	search: async (search: string) => {
		const res = await axiosPrivate.get(`${ENV.API.CITIES}/search`, {
			params: { search }
		});

		if (res.status === 200) {
			return res.data;
		}
	}
};
