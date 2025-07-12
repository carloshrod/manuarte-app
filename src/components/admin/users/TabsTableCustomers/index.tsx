'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, TabsProps } from 'antd';
import { HiOutlineUser } from 'react-icons/hi';
import CustomTable from '../../common/display-data/Table';
import AddButton from '../../common/ui/AddButton';
import GenerateTopCustomersReportButton from '../GenerateTopCustomersReportButton';
import useTableColumns from '@/hooks/useTableColumns';
import { setCustomers, setTopCustomers } from '@/reducers/users/userSlice';
import { ModalContent } from '@/types/enums';

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
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		dispatch(setCustomers(customersData));
		dispatch(setTopCustomers(topCustomersData));
		setIsLoading(false);
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

	const activeKey = searchParams.get('tab') || 'All';

	const handleTabChange = (key: string) => {
		router.push(`?tab=${key}`);
	};

	const allCustomers = activeKey === 'All';

	const REPORT_DATA: Record<string, Customer[]> = {
		CO: topCustomers?.col,
		EC: topCustomers?.ecu
	};

	const items: TabsProps['items'] = [
		{
			key: 'All',
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
			key: 'CO',
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
			key: 'EC',
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
			defaultActiveKey={activeKey}
			activeKey={activeKey}
			onChange={handleTabChange}
			items={items}
			tabBarExtraContent={
				<div className='flex gap-2'>
					{allCustomers ? null : (
						<GenerateTopCustomersReportButton
							reportData={REPORT_DATA[activeKey]}
							countryIsoCode={activeKey}
						/>
					)}
					<AddButton
						title='Registrar Cliente'
						modalContent={ModalContent.customers}
						buttonLabel='Cliente'
						appendIcon={<HiOutlineUser size={18} />}
					/>
				</div>
			}
		/>
	);
};

export default TabsTableCustomers;
