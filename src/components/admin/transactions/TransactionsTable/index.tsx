'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { transactionServices } from '@/services/transactionServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/reducers/transactions/transactionSlice';
import { setShops } from '@/reducers/shops/shopSlice';

const TransactionsTable = ({ shopsData }: { shopsData: Shop[] }) => {
	const { transactionsColumns } = useTableColumns();
	const [isLoading, setIsLoading] = useState(true);
	const { transactions } = useSelector((state: RootState) => state.transaction);
	const dispatch = useDispatch();

	const fetchTransactions = async () => {
		const data = await transactionServices.getAll();
		dispatch(setTransactions(data));
	};

	useEffect(() => {
		fetchTransactions();
		dispatch(setShops(shopsData));
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);

	return (
		<CustomTable
			columns={transactionsColumns}
			dataSource={isLoading ? [] : transactions}
			isLoading={isLoading}
			scrollMinus={335}
		/>
	);
};

export default TransactionsTable;
