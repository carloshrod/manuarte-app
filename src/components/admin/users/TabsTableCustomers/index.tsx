'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { setCustomers, setTopCustomers } from '@/reducers/users/userSlice';
import { Tabs, TabsProps } from 'antd';
import AddButton from '../../common/ui/AddButton';
import { ModalContent } from '@/types/enums';
import { HiOutlineUser } from 'react-icons/hi';

interface TabsTableCustomersProps {
	customersData: Customer[];
	topCustomersData: {
		col: Customer[];
		ecu: Customer[];
	};
	isAdmin?: boolean;
}

const TabsTableCustomers = ({
	customersData,
	topCustomersData,
	isAdmin
}: TabsTableCustomersProps) => {
	const { customerColumns, topCustomerColumns } = useTableColumns();
	const { customers, topCustomers } = useSelector(
		(state: RootState) => state.user
	);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCustomers(customersData));
		dispatch(setTopCustomers(topCustomersData));
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	}, []);

	if (!isAdmin) {
		return (
			<CustomTable
				columns={customerColumns}
				dataSource={isLoading ? [] : customers}
				isLoading={isLoading}
			/>
		);
	}

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Todos',
			children: (
				<CustomTable
					columns={customerColumns}
					dataSource={isLoading ? [] : customers}
					isLoading={isLoading}
				/>
			)
		},
		{
			key: '2',
			label: 'Top Colombia',
			children: (
				<CustomTable
					columns={topCustomerColumns}
					dataSource={isLoading ? [] : topCustomers?.col}
					isLoading={isLoading}
				/>
			)
		},
		{
			key: '3',
			label: 'Top Ecuador',
			children: (
				<CustomTable
					columns={topCustomerColumns}
					dataSource={isLoading ? [] : topCustomers?.ecu}
					isLoading={isLoading}
				/>
			)
		}
	];

	return (
		<Tabs
			defaultActiveKey='1'
			items={items}
			tabBarExtraContent={
				<AddButton
					title='Registrar Cliente'
					modalContent={ModalContent.customers}
					buttonLabel='Cliente'
					appendIcon={<HiOutlineUser size={18} />}
				/>
			}
		/>
	);
};

export default TabsTableCustomers;
