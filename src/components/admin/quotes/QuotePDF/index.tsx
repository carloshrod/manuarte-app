/* eslint-disable @next/next/no-img-element */
import { Descriptions, DescriptionsProps } from 'antd';
import PDFTable from './PDFTable';
import moment from 'moment';
import { formatToTitleCase } from '@/utils/utils';
import TermsCol from './TermsCol';
import TermsEcu from './TermsEcu';

const QuotePDF = ({ quote, pdfRef }: { quote: Quote; pdfRef: any }) => {
	const quoteInfo: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Nro. de Serial:',
			children: quote?.serialNumber,
			span: 3
		},
		{
			key: '2',
			label: 'Cliente:',
			children: formatToTitleCase(quote?.fullName) ?? 'Consumidor Final',
			span: 3
		},
		{
			key: '3',
			label: 'Nro. de Documento:',
			children: quote?.dni ?? 'NA',
			span: 3
		},
		{
			key: '4',
			label: 'Correo:',
			children: quote?.email?.toLowerCase() ?? 'NA',
			span: 3
		},
		{
			key: '5',
			label: 'Fecha:',
			children:
				moment(quote?.updatedDate).startOf('day').format('YYYY/MM/DD') ?? '--',
			span: 3
		}
	];

	const CURRENCY_NAME: Record<string, string> = {
		COP: 'pesos colombianos',
		USD: 'dólares'
	};

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

			{/* Quote info */}
			<section>
				<Descriptions
					items={quoteInfo}
					bordered
					labelStyle={{ fontWeight: 700, color: '#404040' }}
				/>
			</section>

			{/* Table */}
			{quote?.items.length > 0 ? (
				<PDFTable items={quote?.items} shipping={quote.shipping} />
			) : null}

			<p className='my-16'>
				<span className='font-bold'>Nota:</span> La moneda asociada a esta
				cotización es{' '}
				<span className='font-bold'>
					{CURRENCY_NAME[quote?.currency]} ({quote?.currency})
				</span>
				. La aplicación del Impuesto al Valor Agregado (IVA) puede variar, ya
				sea aplicándose o no, dependiendo de la naturaleza de los productos.
			</p>

			{/* Terms */}
			{quote?.currency === 'COP' ? <TermsCol /> : <TermsEcu />}
		</div>
	);
};

export default QuotePDF;
