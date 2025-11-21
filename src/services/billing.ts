import { billingLibs, BillingParams } from '@/libs/api/billing';
import { setBillings } from '@/reducers/billings/billingSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useBillingService = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const fetchBillings = async (params: BillingParams) => {
		try {
			setIsLoading(true);
			const data = await billingLibs.getAll(params);

			dispatch(setBillings(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { fetchBillings, isLoading };
};

export default useBillingService;
