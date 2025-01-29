/* eslint-disable @next/next/no-img-element */
import { formatToTitleCase, PAYMENT_METHOD_MAP } from '@/utils/utils';
import { Descriptions, DescriptionsProps, Divider } from 'antd';
import moment from 'moment';
import PDFTable from '../../quotes/QuotePDF/PDFTable';
import { BillingStatus } from '@/types/enums';
import TermsCol from '../../Terms/TermsCol';
import TermsEcu from '../../Terms/TermsEcu';

const BillingPDF = ({ billing, pdfRef }: { billing: Billing; pdfRef: any }) => {
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
			label: 'Fecha:',
			children:
				moment(billing?.updatedDate).startOf('day').format('YYYY/MM/DD') ??
				'--',
			span: 3
		},
		{
			key: '5',
			label: 'Método de Pago:',
			children: formatToTitleCase(PAYMENT_METHOD_MAP[billing?.paymentMethod]),
			span: 3
		}
	];

	const isCanceled = billing?.status === BillingStatus.CANCELED;

	return (
		<div ref={pdfRef} className='flex flex-col gap-8 p-10'>
			<div className='flex items-center justify-between px-8'>
				<figure>
					<img
						src={'/logo-manuarte.png'}
						width={150}
						height={150}
						alt='Logo Manuarte'
					/>
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
				<h2 className='text-2xl font-bold text-blue-400'>EASY SOAP</h2>
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
			{billing?.currency === 'COP' ? <TermsCol /> : <TermsEcu />}
		</div>
	);
};

export default BillingPDF;
