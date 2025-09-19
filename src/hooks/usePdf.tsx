import PDFDoc from '@/components/admin/common/PDF/PDFDoc';
import { billingServices } from '@/services/billingServices';
import { messagingServices } from '@/services/messagingServices';
import { quoteServices } from '@/services/quoteServices';
import { DiscountType } from '@/types/enums';
import { pdf } from '@react-pdf/renderer';
import { notification } from 'antd';

const usePdf = () => {
	const calculateTotals = (data: Quote | Billing) => {
		const items = data?.items;
		const discountType = data?.discountType;
		const discount = data?.discount;
		const shipping = data?.shipping;
		const subtotal = items.reduce(
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
			const mediaId = await messagingServices.uploadMedia(doc, data.serialNumber);

			const customerName = data?.fullName?.toUpperCase() ?? 'CONSUMIDOR FINAL';
			const recipientPhoneNumber = `${data?.callingCode}${data?.phoneNumber}`;
			const { total } = calculateTotals(data);

			const res = await messagingServices.sendDocMessage({
				recipientPhoneNumber,
				templateName: isQuote ? 'send_quote' : 'send_billing',
				mediaId,
				params: {
					customerName,
					docSerialNumber: data?.serialNumber,
					total,
					docName: `${isQuote ? 'CTZ' : 'FCT'}-${data?.serialNumber}`
				}
			});

			if (res?.status === 200) {
				notification.success({
					message: 'Documento enviado con éxito'
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
			? await quoteServices.getOne({ serialNumber })
			: await billingServices.getOne({ serialNumber });

		await sendPdf({
			isQuote,
			data: newQuoteData,
			shopSlug
		});
	};

	return { calculateTotals, generatePDFBlob, sendPdf, sendPdfAfterCreateDoc };
};

export default usePdf;
