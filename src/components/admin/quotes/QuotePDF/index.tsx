/* eslint-disable @next/next/no-img-element */
import { Descriptions, DescriptionsProps, Divider } from 'antd';
import moment from 'moment';
import PDFTable from '../../common/display-data/PDFTable';
import TermsCol from '../../Terms/TermsCol';
import TermsEcu from '../../Terms/TermsEcu';
import { formatToTitleCase } from '@/utils/formats';

const QuotePDF = ({ quote, pdfRef }: { quote: Quote; pdfRef: any }) => {
	const quoteInfo: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Cliente:',
			children: formatToTitleCase(quote?.fullName) ?? 'Consumidor Final',
			span: 3
		},
		{
			key: '2',
			label: 'Nro. de Documento:',
			children: quote?.dni ?? 'NA',
			span: 3
		},
		{
			key: '3',
			label: 'Teléfono:',
			children: quote?.phoneNumber ?? '--',
			span: 3
		},
		{
			key: '4',
			label: 'Dirección:',
			children: formatToTitleCase(quote?.location) ?? '--',
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
				Cotización # {quote?.serialNumber}{' '}
			</h1>

			{/* Quote info */}
			<section>
				<Descriptions
					items={quoteInfo}
					bordered
					labelStyle={{ fontWeight: 700, color: '#404040' }}
				/>
			</section>

			{/* Table */}
			{quote?.items?.length > 0 ? (
				<PDFTable items={quote?.items} shipping={quote.shipping} />
			) : null}

			<Divider />

			{/* Terms */}
			{quote?.currency === 'COP' ? <TermsCol /> : <TermsEcu />}
		</div>
	);
};

export default QuotePDF;
