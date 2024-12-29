import { Button } from 'antd';
import { IoStorefrontOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { TbFileDollar } from 'react-icons/tb';
import QuotesTable from '@/components/admin/quotes/QuotesTable';
import GoBack from '@/components/admin/common/GoBack';
import { quoteServices } from '@/services/quoteServices';

interface QuotesPageProps {
	params: {
		shopSlug: string;
	};
}

const QuotesPage = async (props: QuotesPageProps) => {
	const {
		params: { shopSlug }
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const quotes = await quoteServices.getAll(shopSlug);

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					<GoBack />
					<h2 className='text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Cotizaciones:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 text-lg min-[796px]:text-2xl font-semibold'>
						<IoStorefrontOutline /> {shopName}
					</span>
				</div>
				<Button
					variant='outlined'
					color='primary'
					icon={<IoMdAdd size={18} />}
					// onClick={() =>
					// 	dispatch(
					// 		openModal({
					// 			title: 'Agregar Producto',
					// 			content: ModalContent.products
					// 		})
					// 	)
					// }
				>
					<p className='max-sm:hidden'>Cotización</p>
					<TbFileDollar size={18} />
				</Button>
			</div>
			<QuotesTable quotes={quotes} />
		</section>
	);
};

export default QuotesPage;
