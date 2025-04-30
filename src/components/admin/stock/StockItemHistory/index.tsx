import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { stockItemServices } from '@/services/stockItemServices';
import { useEffect, useState } from 'react';
import { GiCardboardBox } from 'react-icons/gi';
import { getStockStatusColor } from '@/hooks/utils';
import GenerateStockReportButton from '../GenerateStockReportButton';
import { useParams } from 'next/navigation';
import { useDrawerStore } from '@/stores/drawerStore';

const StockItemHistory = () => {
	const { stockItemsHistoryColumns } = useTableColumns();
	const { dataToHandle } = useDrawerStore.getState();
	const [history, setHistory] = useState<StockItemHistory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const {
		productVariantId,
		stockId,
		productName,
		productVariantName,
		quantity,
		maxQty,
		minQty
	} = dataToHandle ?? {};
	const { shopSlug } = useParams();

	const fetchHistory = async () => {
		if (productVariantId && stockId) {
			const data = await stockItemServices.getHistory(
				productVariantId,
				stockId
			);
			if (data) {
				setHistory(data);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchHistory();

		return () => {
			setHistory([]);
		};
	}, [productVariantId, stockId]);

	const statusColor = getStockStatusColor({
		quantity,
		maxQty,
		minQty
	});

	return (
		<>
			<div className='flex justify-between items-center'>
				<div className='ps-4'>
					<span className='inline-flex items-center gap-2 px-4 py-2 uppercase text-blue-600 font-bold border border-blue-600 rounded'>
						<GiCardboardBox size={18} />
						<h3>
							{productName} - {productVariantName}
						</h3>
					</span>
					<h2
						className={`mt-4 ps-2 ${statusColor} font-semibold`}
					>{`Actualmente ${quantity > 0 ? `${quantity} unidades en stock` : 'sin stock'}`}</h2>
				</div>
				<GenerateStockReportButton
					shopSlug={shopSlug as string}
					history={history}
					product={{ productName, productVariantName }}
				/>
			</div>
			<CustomTable
				columns={stockItemsHistoryColumns}
				dataSource={isLoading ? [] : history}
				isLoading={isLoading}
				shadow={false}
				scrollMinus={380}
			/>
		</>
	);
};

export default StockItemHistory;
