import { quoteLibs, QuoteParams } from '@/libs/api/quote';
import { setQuotes } from '@/reducers/quotes/quoteSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useQuoteService = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const getQuotes = async (params?: QuoteParams) => {
		try {
			setIsLoading(true);
			const data = await quoteLibs.getAll(params);

			dispatch(setQuotes(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { getQuotes, isLoading };
};

export default useQuoteService;
