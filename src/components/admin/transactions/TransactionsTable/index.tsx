'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { transactionServices } from '@/services/transactionServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/reducers/transactions/transactionSlice';
import { setShops } from '@/reducers/shops/shopSlice';

const TransactionsTable = ({
	shopsData,
	shop
}: {
	shopsData: Shop[];
	shop: string;
}) => {
	const { transactionsColumns } = useTableColumns();
	const { transactions } = useSelector((state: RootState) => state.transaction);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchTransactions = async () => {
		let data;
		if (shop) {
			const stockId = shopsData?.find(sh => sh?.slug === shop)?.stockId;
			data = await transactionServices.getAll(undefined, stockId);
		} else {
			data = await transactionServices.getAll();
		}
		dispatch(setTransactions(data));
		setIsLoading(false);
	};

	useEffect(() => {
		fetchTransactions();
		dispatch(setShops(shopsData));
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
