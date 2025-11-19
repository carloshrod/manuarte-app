import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomerParams, userLibs } from '@/libs/api/user';
import {
	setCustomers,
	setTopCustomersCO,
	setTopCustomersEC
} from '@/reducers/users/userSlice';

const useUserService = () => {
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	const getAllCustomers = async (params?: CustomerParams) => {
		try {
			setIsLoading(true);
			const data = await userLibs.getAllCustomers(params);

			dispatch(setCustomers(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getTopCustomersCO = async (params?: CustomerParams) => {
		try {
			setIsLoading(true);
			const data = await userLibs.getTopCustomers({
				...params
			});

			dispatch(setTopCustomersCO(data));

			return data.topCustomers;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getTopCustomersEC = async (params?: CustomerParams) => {
		try {
			setIsLoading(true);
			const data = await userLibs.getTopCustomers({
				...params
			});
			dispatch(setTopCustomersEC(data));

			return data.topCustomers;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		getAllCustomers,
		getTopCustomersCO,
		getTopCustomersEC,
		isLoading
	};
};

export default useUserService;
