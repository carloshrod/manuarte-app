'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { stockServices } from '@/services/stockServices';
import { setStockItems } from '@/reducers/stockItems/stockItemSlice';

const StockItemsTable = ({ shopSlug }: { shopSlug: string }) => {
	const { stockItemsColumns } = useTableColumns();
	const dispatch = useDispatch();
	const { stockItems } = useSelector((state: RootState) => state.stock);
	const [isLoading, setIsLoading] = useState(false);

	const fetchStockItems = async () => {
		setIsLoading(true);
		if (shopSlug) {
			const data = await stockServices.getAll(shopSlug);
			dispatch(setStockItems(data));
		}
	};

	useEffect(() => {
		fetchStockItems();
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
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
