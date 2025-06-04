/* eslint-disable @next/next/no-img-element */
import { Descriptions, DescriptionsProps, Divider } from 'antd';
import PDFTable from '../../common/display-data/PDFTable';
import TermsCol from '../../Terms/TermsCol';
import TermsEcu from '../../Terms/TermsEcu';
import { PAYMENT_METHOD_MAP } from '@/utils/mappings';
import { formatDate, formatToTitleCase } from '@/utils/formats';
import { BillingStatus } from '@/types/enums';

const BillingPDF = ({
	billing,
	pdfRef,
	shopSlug
}: {
	billing: Billing;
	pdfRef: any;
	shopSlug: string;
}) => {
	const billingInfo: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Cliente:',
			children: formatToTitleCase(billing?.fullName) ?? 'Consumidor Final',
			span: 3
		},
		{
			key: '2',
			label: 'Nro. de Documento:',
			children: billing?.dni ?? 'NA',
			span: 3
		},
		{
			key: '3',
			label: 'Teléfono:',
			children: billing?.phoneNumber ?? '--',
			span: 3
		},
		{
			key: '4',
			label: 'Dirección:',
			children: formatToTitleCase(billing?.location) ?? '--',
			span: 3
		},
		{
			key: '5',
			label: 'Ciudad:',
			children: formatToTitleCase(billing?.cityName || billing?.city) ?? '--',
			span: 3
		},
		{
			key: '6',
			label: 'Fecha:',
			children: formatDate(billing?.createdDate) ?? '--',
			span: 3
		},
		{
			key: '7',
			label: 'Método de Pago:',
			children: billing?.paymentMethod?.includes('TRANSFER')
				? 'Transferencia'
				: formatToTitleCase(PAYMENT_METHOD_MAP[billing?.paymentMethod]),
			span: 3
		}
	];

	const isCanceled = billing?.status === BillingStatus.CANCELED;
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
				Factura # {billing?.serialNumber}{' '}
				{isCanceled && (
					<span className='px-2 rounded text-red-600 border-2 border-red-600'>
						ANULADA
					</span>
				)}
			</h1>

			{/* Billing info */}
			<section>
				<Descriptions
					items={billingInfo}
					bordered
					labelStyle={{ fontWeight: 700, color: '#404040' }}
				/>
			</section>

			{/* Table */}
			{billing?.items?.length > 0 ? (
				<PDFTable items={billing?.items} shipping={billing.shipping} />
			) : null}

			<Divider />

			{/* Terms */}
			{billing?.currency === 'COP' ? (
				<TermsCol city={city === 'cascajal' ? 'barranquilla' : city} />
			) : (
				<TermsEcu />
			)}
		</div>
	);
};

export default BillingPDF;
