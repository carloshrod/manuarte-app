import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

type WhatsAppProxyBody = {
	url: string;
	data: any;
	fbToken: string;
};

export const whatsAppLibs = {
	proxy: async (body: WhatsAppProxyBody | FormData) => {
		const res = await axiosPrivate.post(ENV.API.WA_PROXY, body);

		return res;
	}
};
