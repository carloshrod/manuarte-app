/* eslint-disable @next/next/no-img-element */
import { Descriptions, DescriptionsProps, Divider } from 'antd';
import PDFTablePreview from './PDFTablePreview';
import PDFTermsColPreview from './PDFTermsColPreview';
import PDFTermsEcuPreview from './PDFTermsEcuPreview';
import { BILLING_STATUS_MAP, PAYMENT_METHOD_MAP } from '@/utils/mappings';
import { formatDate, formatToTitleCase } from '@/utils/formats';
import { BillingStatus } from '@/types/enums';

const PDFPreview = ({
	isQuote,
	data,
	pdfRef,
	shopSlug
}: {
	isQuote: boolean;
	data: Quote | Billing;
	pdfRef: any;
	shopSlug: string;
}) => {
	const docDetails: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Cliente:',
			children: formatToTitleCase(data?.fullName) ?? 'Consumidor Final',
			span: 3
		},
		{
			key: '2',
			label: 'Nro. de Documento:',
			children: data?.dni ?? '--',
			span: 3
		},
		{
			key: '3',
			label: 'Teléfono:',
			children: data?.phoneNumber ?? '--',
			span: 3
		},
		{
			key: '4',
			label: 'Dirección:',
			children: formatToTitleCase(data?.location) ?? '--',
			span: 3
		},
		{
			key: '5',
			label: 'Ciudad:',
			children: formatToTitleCase(data?.cityName || data?.city) ?? '--',
			span: 3
		},
		{
			key: '6',
			label: 'Fecha:',
			children: formatDate(data?.createdDate) ?? '--',
			span: 3
		},
		...(!isQuote
			? [
					{
						key: '7',
						label: 'Métodos de Pago:',
						children: (data as Billing)?.paymentMethods
							.map(p => {
								const paymenMethod = p.includes('TRANSFER')
									? 'Transferencia'
									: PAYMENT_METHOD_MAP[p];

								return formatToTitleCase(paymenMethod);
							})
							.join(', '),
						span: 3
					}
				]
			: [])
	];

	const isNotPaid = !isQuote && data?.status !== BillingStatus.PAID;
	const city = shopSlug?.split('-')[1];

	return (
		<div ref={pdfRef} className='flex flex-col gap-8 p-10'>
			<div className='flex items-center justify-between px-8'>
				<figure>
					<img src={'/logo-manuarte.png'} width={150} alt='Logo Manuarte' />
					<figcaption>
						<a
							href='https://www.manuartestore.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							www.manuartestore.com
						</a>
					</figcaption>
				</figure>
				<figure>
					<img src={'/logo-easy-soap.jpg'} width={250} alt='Logo Manuarte' />
				</figure>
			</div>

			<h1 className='text-3xl font-semibold'>
				{isQuote ? 'Cotización' : 'Factura'} #{data?.serialNumber}{' '}
				{isNotPaid && (
					<span className='px-2 rounded text-red-600 border-2 border-red-600'>
						{BILLING_STATUS_MAP[data?.status]}
					</span>
				)}
			</h1>

			{/* Doc Details */}
			<section>
				<Descriptions
					items={docDetails}
					bordered
					labelStyle={{ fontWeight: 700, color: '#404040' }}
				/>
			</section>

			{/* Table */}
			{data?.items?.length > 0 ? <PDFTablePreview data={data} /> : null}

			<Divider />

			{/* Terms */}
			{data?.countryIsoCode === 'CO' ? (
				<PDFTermsColPreview
					city={city === 'cascajal' ? 'barranquilla' : city}
				/>
			) : (
				<PDFTermsEcuPreview />
			)}
		</div>
	);
};

export default PDFPreview;
