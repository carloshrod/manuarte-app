import { notification } from 'antd';
import PDFDoc from '@/components/admin/common/PDF/PDFDoc';
import { messagingServices } from '@/services/messagingServices';
import { quoteLibs } from '@/libs/api/quote';
import { billingLibs } from '@/libs/api/billing';
import { DiscountType } from '@/types/enums';
import { pdf } from '@react-pdf/renderer';

const usePdf = () => {
	const calculateTotals = (data: Quote | Billing) => {
		const items = data?.items;
		const discountType = data?.discountType;
		const discount = data?.discount;
		const shipping = data?.shipping;
		const subtotal = items?.reduce(
			(acc, item) => acc + Number(item.totalPrice),
			0
		);

		const isFixedDiscount = discountType === DiscountType.FIXED;

		const discountLabel =
			!data?.discountType || isFixedDiscount
				? 'DESCUENTO'
				: `DESCUENTO (${discount}%)`;

		const discountValue =
			(!discountType || isFixedDiscount
				? Number(discount)
				: subtotal * (Number(discount) / 100)) || 0;

		const total = subtotal - discountValue + Number(shipping);

		return { subtotal, discountValue, discountLabel, total };
	};

	const generatePDFBlob = async ({
		isQuote,
		data,
		shopSlug
	}: {
		isQuote: boolean;
		data: Quote | Billing;
		shopSlug: string;
	}) => {
		const blob = await pdf(
			<PDFDoc isQuote={isQuote} data={data} shopSlug={shopSlug} />
		).toBlob();
		return blob;
	};

	const sendPdf = async ({
		isQuote,
		data,
		shopSlug
	}: {
		isQuote: boolean;
		data: Quote | Billing;
		shopSlug: string;
	}) => {
		try {
			const doc = await generatePDFBlob({ isQuote, data, shopSlug });
			const mediaId = await messagingServices.uploadMedia(
				doc,
				data.serialNumber
			);

			const customerName = data?.fullName?.toUpperCase() ?? 'CONSUMIDOR FINAL';
			const recipientPhoneNumber = `${data?.callingCode}${data?.phoneNumber}`;
			const { total } = calculateTotals(data);

			const messageData = {
				templateName: isQuote ? 'send_quote' : 'send_billing',
				mediaId,
				params: {
					customerName,
					docSerialNumber: data?.serialNumber,
					total,
					docName: `${isQuote ? 'CTZ' : 'FCT'}-${data?.serialNumber}`
				}
			};

			// Enviar al cliente
			const res = await messagingServices.sendDocMessage({
				recipientPhoneNumber,
				...messageData
			});

			if (res?.status === 200) {
				notification.success({
					message: 'Documento enviado con éxito'
				});
			}

			// Enviar copia al número de WhatsApp de la tienda
			const shopPhoneNumber =
				data?.countryIsoCode === 'CO'
					? process.env.NEXT_PUBLIC_SHOP_CO_PHONE_NUMBER
					: process.env.NEXT_PUBLIC_SHOP_EC_PHONE_NUMBER;

			const res2 = await messagingServices.sendDocMessage({
				recipientPhoneNumber: shopPhoneNumber as string,
				...messageData
			});

			if (res2?.status === 200) {
				notification.success({
					message: 'Copia del documento enviada a la tienda'
				});
			}
		} catch (error) {
			notification.error({ message: 'Error al enviar documento' });
		}
	};

	const sendPdfAfterCreateDoc = async ({
		isQuote,
		serialNumber,
		shopSlug
	}: {
		isQuote: boolean;
		serialNumber: string;
		shopSlug: string;
	}) => {
		const newQuoteData = isQuote
			? await quoteLibs.getOne({ serialNumber })
			: await billingLibs.getOne({ serialNumber });

		await sendPdf({
			isQuote,
			data: newQuoteData,
			shopSlug
		});
	};

	return { calculateTotals, generatePDFBlob, sendPdf, sendPdfAfterCreateDoc };
};

export default usePdf;
