'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuotes } from '@/reducers/quotes/quoteSlice';
import { quoteServices } from '@/services/quoteServices';
import { shopServices } from '@/services/shopServices';
import { setShops } from '@/reducers/shops/shopSlice';

const QuotesTable = ({ shopSlug }: { shopSlug: string }) => {
	const { quoteColumns } = useTableColumns();
	const { shops } = useSelector((state: RootState) => state.shop);
	const { quotes } = useSelector((state: RootState) => state.quote);
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

	const fetchQuotes = async () => {
		if (shopSlug && quotes.length === 0) {
			const data = await quoteServices.getAll(shopSlug);
			dispatch(setQuotes(data));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchShops();
		fetchQuotes();
	}, []);

	return (
		<CustomTable
			columns={quoteColumns}
			dataSource={isLoading ? [] : quotes}
			isLoading={isLoading}
			scrollMinus={335}
		/>
	);
};

export default QuotesTable;
