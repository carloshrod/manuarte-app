import { GiCardboardBox } from 'react-icons/gi';
import { MdOutlineWarehouse } from 'react-icons/md';
import { auth } from '@/auth';
import AddButton from '@/components/admin/common/ui/AddButton';
import GoBack from '@/components/admin/common/ui/GoBack';
import GenerateReportButton from '@/components/admin/stock/GenerateReportButton';
import StockItemsTable from '@/components/admin/stock/StockItemsTable';
import { ModalContent } from '@/types/enums';

interface StockItemsPageProps {
	params: {
		shopSlug: string;
	};
}

const StockItemsPage = async (props: StockItemsPageProps) => {
	const {
		params: { shopSlug }
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const session = await auth();
	const isAdmin = !session?.user?.shop;

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					{isAdmin ? <GoBack /> : null}
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Stock de Productos:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<MdOutlineWarehouse /> {shopName}
					</span>
				</div>
				<div className='flex gap-2'>
					<GenerateReportButton shopSlug={shopSlug}/>
					<AddButton
						title='Agregar Stock de Producto'
						modalContent={ModalContent.stockItems}
						buttonLabel='Stock'
						appendIcon={<GiCardboardBox size={18} />}
					/>
				</div>
			</div>
			<StockItemsTable shopSlug={shopSlug} />
		</section>
	);
};

export default StockItemsPage;
