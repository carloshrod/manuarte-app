import AddButton from '@/components/admin/common/ui/AddButton';
import GoBack from '@/components/admin/common/ui/GoBack';
import StockItemsTable from '@/components/admin/stock/StockItemsTable';
import { ModalContent } from '@/types/enums';
import { GiCardboardBox } from 'react-icons/gi';
import { MdOutlineWarehouse } from 'react-icons/md';

interface StockItemsPageProps {
	params: {
		shopSlug: string;
	};
}

const StockItemsPage = (props: StockItemsPageProps) => {
	const {
		params: { shopSlug }
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					<GoBack />
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Stock de Productos:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<MdOutlineWarehouse /> {shopName}
					</span>
				</div>
				<AddButton
					title='Agregar Stock de Producto'
					modalContent={ModalContent.stockItems}
					buttonLabel='Stock'
					appendIcon={<GiCardboardBox size={18} />}
				/>
			</div>
			<StockItemsTable shopSlug={shopSlug} />
		</section>
	);
};

export default StockItemsPage;
