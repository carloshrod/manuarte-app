'use client';
import { useEffect, useState } from 'react';
import { Button, Tabs, TabsProps } from 'antd';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { openModal } from '@/reducers/ui/uiSlice';
import { getStaff } from '@/reducers/users/userSlice';
import { ModalContent } from '@/types/enums';

type TabsTableUsersProps = {
	staffData: Staff[];
	customersData: Customer[];
};

const TabsTableUsers = ({ staffData, customersData }: TabsTableUsersProps) => {
	const [isStaff, setIsStaff] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { staffColumns, customerColumns } = useTableColumns();
	const { staff } = useSelector((state: RootState) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStaff(staffData));
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
					dataSource={customersData}
					isLoading={isLoading}
				/>
			)
		}
	];

	const operations = isStaff ? (
		<div className='flex gap-2 max-[460px]:flex-col'>
			<Button
				variant='outlined'
				color='primary'
				icon={<IoMdAdd size={18} />}
				onClick={() =>
					dispatch(
						openModal({
							title: 'Agregar Staff',
							content: ModalContent.staff
						})
					)
				}
			>
				Staff
				<AiOutlineUser size={18} />
			</Button>
		</div>
	) : (
		<Button
			variant='outlined'
			color='primary'
			icon={<IoMdAdd size={18} />}
			onClick={() =>
				dispatch(
					openModal({
						title: 'Agregar Cliente',
						content: ModalContent.customers
					})
				)
			}
		>
			Cliente <HiOutlineUser size={18} />
		</Button>
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
