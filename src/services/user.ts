import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomerParams, userLibs } from '@/libs/api/user';
import {
	setCustomers,
	setTopCustomersCO,
	setTopCustomersEC
} from '@/reducers/users/userSlice';
import { FilterValue } from 'antd/es/table/interface';

type CustomerFilters = {
	isoCode?: string;
	page?: number;
	pageSize?: number;
	dni?: string;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
	cityName?: string;
};

const useUserService = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [tableFilters, setTableFilters] = useState<
		Record<string, FilterValue | null>
	>({});

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

	const synchronizeFilters = (filters: CustomerFilters) => {
		const initialFilters: Record<string, FilterValue | null> = {};
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				initialFilters[key] = [value];
			}
		});
		setTableFilters(initialFilters);
	};

	return {
		getAllCustomers,
		getTopCustomersCO,
		getTopCustomersEC,
		synchronizeFilters,
		isLoading,
		tableFilters
	};
};

export default useUserService;
