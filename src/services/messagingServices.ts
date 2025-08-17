import { ENV } from '@/config/env';
import axios from './axios';
import { formatCurrency } from '@/utils/formats';

const token = process.env.NEXT_PUBLIC_WA_TOKEN;

type templateParams = {
	customerName: string;
	docSerialNumber: string;
	total: number;
	docName: string;
};

export const messagingServices = {
	sendDocMessage: async ({
		recipientPhoneNumber,
		templateName,
		mediaId,
		params
	}: {
		recipientPhoneNumber: string;
		templateName: string;
		mediaId: string;
		params: templateParams;
	}) => {
		try {
			const body = {
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: recipientPhoneNumber,
				type: 'template',
				template: {
					name: templateName,
					language: {
						code: 'es_CO'
					},
					components: [
						{
							type: 'header',
							parameters: [
								{
									type: 'document',
									document: {
										filename: params?.docName,
										id: mediaId
									}
								}
							]
						},
						{
							type: 'body',
							parameters: [
								{
									type: 'text',
									text: params?.customerName
								},
								{
									type: 'text',
									text: `#${params?.docSerialNumber}`
								},
								{
									type: 'text',
									text: `${formatCurrency(params?.total)}`
								}
							]
						}
					]
				}
			};

			const res = await axios.post(ENV.WA.MESSAGES, body, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			return res;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	uploadMedia: async (doc: any) => {
		try {
			const formData = new FormData();
			formData.append('file', doc, 'cotizacion.pdf');
			formData.append('type', 'document');
			formData.append('messaging_product', 'whatsapp');

			const res = await axios.post(
				ENV.WA.MEDIA,
				{ messaging_product: 'whatsapp', file: doc },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					}
				}
			);

			if (res.status !== 200) {
				throw new Error('Error subiendo el documento');
			}

			return res.data.id;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
};
