'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { transactionServices } from '@/services/transactionServices';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/reducers/transactions/transactionSlice';
import { shopServices } from '@/services/shopServices';
import { setShops } from '@/reducers/shops/shopSlice';

const TransactionsTable = ({ shop }: { shop: string }) => {
	const { transactionsColumns } = useTableColumns();
	const { shops } = useSelector((state: RootState) => state.shop);
	const { transactions } = useSelector((state: RootState) => state.transaction);
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

	const fetchTransactions = async () => {
		let data;
		if (shop) {
			const stockId = shops?.find(sh => sh?.slug === shop)?.stockId;
			data = await transactionServices.getAll(undefined, stockId);
		} else {
			data = await transactionServices.getAll();
		}
		dispatch(setTransactions(data));
		setIsLoading(false);
	};

	useEffect(() => {
		fetchShops();
		fetchTransactions();
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
