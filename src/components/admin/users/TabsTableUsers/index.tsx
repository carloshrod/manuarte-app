'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { getCustomers, getStaff } from '@/reducers/users/userSlice';
import { ModalContent } from '@/types/enums';
import AddButton from '../../common/AddButton';

type TabsTableUsersProps = {
	staffData: Staff[];
	customersData: Customer[];
};

const TabsTableUsers = ({ staffData, customersData }: TabsTableUsersProps) => {
	const [isStaff, setIsStaff] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { staffColumns, customerColumns } = useTableColumns();
	const { staff, customers } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStaff(staffData));
		dispatch(getCustomers(customersData));
		setIsLoading(false);
	}, []);

	const onChange = (key: string) => {
		setIsStaff(key === '1');
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Staff',
			children: (
				<CustomTable
					columns={staffColumns}
					dataSource={staff}
					isLoading={isLoading}
				/>
			)
		},
		{
			key: '2',
			label: 'Clientes',
			children: (
				<CustomTable
					columns={customerColumns}
					dataSource={customers}
					isLoading={isLoading}
				/>
			)
		}
	];

	const operations = isStaff ? (
		<AddButton
			title='Agregar Staff'
			modalContent={ModalContent.staff}
			buttonLabel='Staff'
			appendIcon={<AiOutlineUser size={18} />}
		/>
	) : (
		<AddButton
			title='Registrar Cliente'
			modalContent={ModalContent.customers}
			buttonLabel='Cliente'
			appendIcon={<HiOutlineUser size={18} />}
		/>
	);

	return (
		<Tabs
			defaultActiveKey='1'
			items={items}
			tabBarExtraContent={operations}
			onChange={onChange}
		/>
	);
};

export default TabsTableUsers;
