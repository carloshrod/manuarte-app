'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotes } from '@/reducers/quotes/quoteSlice';
import { quoteServices } from '@/services/quoteServices';

const QuotesTable = ({ shopSlug }: { shopSlug: string }) => {
	const { quoteColumns } = useTableColumns();
	const { quotes } = useSelector((state: RootState) => state.quote);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchQuotes = async () => {
		if (shopSlug) {
			const data = await quoteServices.getAll(shopSlug);
			dispatch(getQuotes(data));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchQuotes();

		return () => {
			dispatch(getQuotes([]));
		};
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
