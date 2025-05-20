'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { stockItemServices } from '@/services/stockItemServices';
import { useEffect, useState } from 'react';
import { GiCardboardBox } from 'react-icons/gi';
import { getStockStatusColor } from '@/hooks/utils';
import GenerateStockReportButton from '../GenerateStockReportButton';
import { useParams } from 'next/navigation';
import GoBack from '../../common/ui/GoBack';
import { MdOutlineWarehouse } from 'react-icons/md';

interface StockItemHistoryProps {
	shopName: string;
	stockItemId: string;
}

const StockItemHistory = ({ shopName, stockItemId }: StockItemHistoryProps) => {
	const { stockItemsHistoryColumns } = useTableColumns();
	const [stockItem, setStockItem] = useState<StockItem | null>(null);
	const [history, setHistory] = useState<StockItemHistory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { productName, productVariantName, quantity, maxQty, minQty } =
		stockItem ?? {};
	const { shopSlug } = useParams();

	const fetchHistory = async () => {
		if (stockItemId) {
			const data = await stockItemServices.getHistory(stockItemId);
			if (data?.stockItem && data?.history) {
				setStockItem(data.stockItem);
				setHistory(data.history);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchHistory();

		return () => {
			setHistory([]);
		};
	}, [stockItemId]);

	const statusColor =
		quantity !== undefined && maxQty !== undefined && minQty !== undefined
			? getStockStatusColor({
					quantity,
					maxQty,
					minQty
				})
			: '';

	return (
		<section className='flex flex-col gap-6'>
			<div>
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
				<div className='flex justify-between items-center'>
					{stockItem ? (
						<div className='ps-4 mt-4'>
							<span className='inline-flex items-center gap-2 px-4 py-2 uppercase text-blue-600 font-bold border border-blue-600 rounded'>
								<GiCardboardBox size={18} />
								<h3>
									{productName} - {productVariantName}
								</h3>
							</span>
							<h2
								className={`mt-4 ps-2 ${statusColor} font-semibold`}
							>{`Actualmente ${quantity && quantity > 0 ? `${quantity} unidades en stock` : 'sin stock'}`}</h2>
						</div>
					) : null}
					{productName && productVariantName ? (
						<div className='self-end'>
							<GenerateStockReportButton
								shopSlug={shopSlug as string}
								history={history}
								product={{ productName, productVariantName }}
							/>
						</div>
					) : null}
				</div>
			</div>
			<CustomTable
				columns={stockItemsHistoryColumns}
				dataSource={isLoading ? [] : history}
				isLoading={isLoading}
				scrollMinus={395}
			/>
		</section>
	);
};

export default StockItemHistory;
