'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { stockItemServices } from '@/services/stockItemServices';
import { setStockItems } from '@/reducers/stockItems/stockItemSlice';
import { shopServices } from '@/services/shopServices';
import { setShops } from '@/reducers/shops/shopSlice';

const StockItemsTable = ({ shopSlug }: { shopSlug: string }) => {
	const { stockItemsColumns } = useTableColumns();
	const { shops } = useSelector((state: RootState) => state.shop);
	const { stockItems } = useSelector((state: RootState) => state.stock);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchShops = async () => {
		if (shops?.length === 0) {
			const data = await shopServices.getAll(false);
			if (data) {
				dispatch(setShops(data));
			}
		}
	};

	const fetchStockItems = async () => {
		if (shopSlug && stockItems?.length === 0) {
			const data = await stockItemServices.getAllByStock(shopSlug);
			dispatch(setStockItems(data));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchShops();
		fetchStockItems();
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
