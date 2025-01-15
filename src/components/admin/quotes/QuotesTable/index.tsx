'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/Table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotes } from '@/reducers/quotes/quoteSlice';
import { quoteServices } from '@/services/quoteServices';

const QuotesTable = ({ shopSlug }: { shopSlug: string }) => {
	const { quoteColumns } = useTableColumns();
	const dispatch = useDispatch();
	const { quotes } = useSelector((state: RootState) => state.quote);
	const [isLoading, setIsLoading] = useState(false);

	const fetchQuotes = async () => {
		setIsLoading(true);
		if (shopSlug) {
			const data = await quoteServices.getAllQuotes(shopSlug);
			dispatch(getQuotes(data));
		}
	};

	useEffect(() => {
		fetchQuotes();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
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
