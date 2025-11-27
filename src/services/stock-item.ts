import {
	StockItemHistoryParams,
	stockItemLibs,
	StockItemParams
} from '@/libs/api/stock-item';
import {
	setStockItemHistory,
	setStockItems
} from '@/reducers/stockItems/stockItemSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useStockItemService = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchStockItems = async (searchParams: StockItemParams) => {
		try {
			setIsLoading(true);

			const data = await stockItemLibs.getAllByStock(searchParams);
			dispatch(setStockItems(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchStockItemHistory = async (params: StockItemHistoryParams) => {
		try {
			setIsLoading(true);

			if (params?.stockItemId) {
				const data = await stockItemLibs.getHistory(params);

				if (data?.stockItem && data?.history) {
					dispatch(setStockItemHistory(data));
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		fetchStockItems,
		fetchStockItemHistory,
		isLoading
	};
};

export default useStockItemService;
