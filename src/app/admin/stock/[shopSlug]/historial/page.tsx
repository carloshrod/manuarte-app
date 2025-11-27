import GoBack from '@/components/admin/common/ui/GoBack';
import StockItemHistory from '@/components/admin/stock/StockItemHistory';
import { StockItemHistoryParams } from '@/libs/api/stock-item';
import { MdOutlineWarehouse } from 'react-icons/md';

interface StockItemHistoryPageProps {
	params: { shopSlug: string };
	searchParams: StockItemHistoryParams;
}

const StockItemHistoryPage = ({
	params: { shopSlug },
	searchParams
}: StockItemHistoryPageProps) => {
	const shopName = shopSlug.toUpperCase().replace('-', ' ');

	return (
		<StockItemHistory searchParams={searchParams}>
			<div className='flex'>
				<GoBack />
				<div className='flex flex-wrap items-center'>
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Historial:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<MdOutlineWarehouse /> {shopName}
					</span>
				</div>
			</div>
		</StockItemHistory>
	);
};

export default StockItemHistoryPage;
