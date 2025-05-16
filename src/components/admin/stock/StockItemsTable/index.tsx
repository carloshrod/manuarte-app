'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { stockItemServices } from '@/services/stockItemServices';
import { setStockItems } from '@/reducers/stockItems/stockItemSlice';

const StockItemsTable = ({ shopSlug }: { shopSlug: string }) => {
	const { stockItemsColumns } = useTableColumns();
	const dispatch = useDispatch();
	const { stockItems } = useSelector((state: RootState) => state.stock);
	const [isLoading, setIsLoading] = useState(true);

	const fetchStockItems = async () => {
		if (shopSlug) {
			const data = await stockItemServices.getAllByStock(shopSlug);
			dispatch(setStockItems(data));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchStockItems();

		return () => {
			dispatch(setStockItems([]));
		};
	}, []);

	return (
		<CustomTable
			columns={stockItemsColumns}
			dataSource={isLoading ? [] : stockItems}
			isLoading={isLoading}
			scrollMinus={335}
		/>
	);
};

export default StockItemsTable;
