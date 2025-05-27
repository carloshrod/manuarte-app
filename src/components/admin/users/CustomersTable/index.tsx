'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { getCustomers } from '@/reducers/users/userSlice';

const CustomersTable = ({ customersData }: { customersData: Customer[] }) => {
	const { customerColumns } = useTableColumns();
	const { customers } = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCustomers(customersData));
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	}, []);

	return (
		<CustomTable
			columns={customerColumns}
			dataSource={isLoading ? [] : customers}
			isLoading={isLoading}
		/>
	);
};

export default CustomersTable;
