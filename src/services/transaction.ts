import { transactionLibs, TransactionParams } from '@/libs/api/transaction';
import { setTransactions } from '@/reducers/transactions/transactionSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useTransactionService = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchTransactions = async (params?: TransactionParams) => {
		try {
			setIsLoading(true);

			const data = await transactionLibs.getAll(params);

			dispatch(setTransactions(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { fetchTransactions, isLoading };
};

export default useTransactionService;
