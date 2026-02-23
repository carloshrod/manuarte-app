import { whatsAppLibs } from '@/libs/api/whatsapp';
import { ENV } from '@/config/env';
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
			if (!token) {
				throw new Error('WhatsApp access token no disponible');
			}

			const data = {
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
									text: `${params?.docSerialNumber}`
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

			const body = {
				url: ENV.WA.MESSAGES,
				data,
				fbToken: token
			};

			const res = await whatsAppLibs.proxy(body);

			return res;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	uploadMedia: async (doc: any, serialNumber: string) => {
		try {
			if (!token) {
				throw new Error('WhatsApp access token no disponible');
			}

			const formData = new FormData();
			formData.append('file', doc, `${serialNumber}.pdf`);
			formData.append('messaging_product', 'whatsapp');
			formData.append('url', ENV.WA.MEDIA);
			formData.append('fbToken', token);

			const res = await whatsAppLibs.proxy(formData);

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
