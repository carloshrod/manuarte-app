'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/Table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuotes } from '@/reducers/quotes/quoteSlice';

const QuotesTable = ({ quotesData }: { quotesData: DataTable[] }) => {
	const { quoteColumns } = useTableColumns();
	const dispatch = useDispatch();
	const { quotes } = useSelector((state: RootState) => state.quote);

	useEffect(() => {
		dispatch(getQuotes(quotesData));
	}, []);

	return (
		<CustomTable
			columns={quoteColumns}
			dataSource={quotes ?? []}
			isLoading={quotes?.length === 0}
			scrollMinus={335}
		/>
	);
};

export default QuotesTable;
