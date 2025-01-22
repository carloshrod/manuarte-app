/* eslint-disable @next/next/no-img-element */
import { formatToTitleCase, PAYMENT_METHOD_MAP } from '@/utils/utils';
import { Descriptions, DescriptionsProps } from 'antd';
import moment from 'moment';
import PDFTable from '../../quotes/QuotePDF/PDFTable';
import { BillingStatus } from '@/types/enums';

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
			label: 'Correo:',
			children: billing?.email?.toLowerCase() ?? 'NA',
			span: 3
		},
		{
			key: '4',
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

	const CURRENCY_NAME: Record<string, string> = {
		COP: 'pesos colombianos',
		USD: 'dólares'
	};

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

			<p className='my-16'>
				<span className='font-bold'>Nota:</span> La moneda asociada a esta
				factura es{' '}
				<span className='font-bold'>
					{CURRENCY_NAME[billing?.currency]} ({billing?.currency})
				</span>
				. La aplicación del Impuesto al Valor Agregado (IVA) puede variar, ya
				sea aplicándose o no, dependiendo de la naturaleza de los productos.
			</p>
		</div>
	);
};

export default BillingPDF;
