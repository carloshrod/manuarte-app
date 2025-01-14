import { IoStorefrontOutline } from 'react-icons/io5';
import GoBack from '@/components/admin/common/GoBack';
import { quoteServices } from '@/services/quoteServices';
import QuotePDFContainer from '@/components/admin/quotes/QuotePDFContainer';
import { TbFileDollar } from 'react-icons/tb';
import { Tag } from 'antd';

interface QuoteDetailPageProps {
	params: {
		shopSlug: string;
		serialNumber: string;
	};
}

const QuoteDetailPage = async (props: QuoteDetailPageProps) => {
	const {
		params: { shopSlug, serialNumber }
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const quote = await quoteServices.getOneQuote({ serialNumber });

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-wrap items-center'>
				<GoBack />
				<h2 className='text-lg min-[796px]:text-2xl font-semibold ps-4'>
					Cotizaciones:
				</h2>
				<span className='flex gap-1 items-center ps-4 pe-2 max-[555px]:mt-2 text-lg min-[796px]:text-2xl font-semibold'>
					<IoStorefrontOutline /> {shopName}
				</span>
				<div className='flex items-center max-[955px]:mt-2 max-[955px]:ps-4'>
					<Tag
						color='blue-inverse'
						className='w-fit'
						style={{ padding: '0 12px' }}
					>
						<span className='flex gap-2 items-center text-lg'>
							<TbFileDollar size={24} /># {quote?.serialNumber}
						</span>
					</Tag>
				</div>
			</div>

			<QuotePDFContainer quote={quote} shopSlug={shopSlug} />
		</div>
	);
};

export default QuoteDetailPage;
