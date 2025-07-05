/* eslint-disable @next/next/no-img-element */
import { Descriptions, DescriptionsProps, Divider } from 'antd';
import PDFTable from '../../common/display-data/PDFTable';
import TermsCol from '../../Terms/TermsCol';
import TermsEcu from '../../Terms/TermsEcu';
import { formatDate, formatToTitleCase } from '@/utils/formats';

const QuotePDF = ({
	quote,
	pdfRef,
	shopSlug
}: {
	quote: Quote;
	pdfRef: any;
	shopSlug: string;
}) => {
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
			label: 'Ciudad:',
			children: formatToTitleCase(quote?.cityName || quote?.city) ?? '--',
			span: 3
		},
		{
			key: '6',
			label: 'Fecha:',
			children: formatDate(quote?.createdDate) ?? '--',
			span: 3
		}
	];

	const city = shopSlug?.split('-')[1];

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
				<figure>
					<img src={'/logo-easy-soap.jpg'} width={250} alt='Logo Manuarte' />
				</figure>
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
				<PDFTable
					items={quote?.items}
					discountType={quote?.discountType}
					discount={quote?.discount}
					shipping={quote?.shipping}
				/>
			) : null}

			<Divider />

			{/* Terms */}
			{quote?.currency === 'COP' ? (
				<TermsCol city={city === 'cascajal' ? 'barranquilla' : city} />
			) : (
				<TermsEcu />
			)}
		</div>
	);
};

export default QuotePDF;
