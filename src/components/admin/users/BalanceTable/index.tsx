'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BiDollar } from 'react-icons/bi';
import CustomTable from '../../common/display-data/Table';
import AddButton from '../../common/ui/AddButton';
import BalanceCols from './cols';
import { BalanceMovementsParams } from '@/libs/api/customer-balance';
import useCustomerService from '@/services/customer';
import useFilters from '@/hooks/useFilters';
import { formatCurrency } from '@/utils/formats';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { ModalContent } from '@/types/enums';

const BalanceTable = ({
	params,
	searchParams
}: {
	params: { id: string };
	searchParams: BalanceMovementsParams;
}) => {
	const { balanceMovementColumns } = BalanceCols({
		currency: searchParams.currency
	});
	const {
		customerBalanceMovements,
		customerBalanceMovementsPagination,
		balance
	} = useSelector((state: RootState) => state.customer);
	const { fetchMovements, fetchBalance, isLoading } = useCustomerService();
	const { updateFilterParams } = useFilters();

	const page = Number(searchParams.page) || 1;
	const pageSize = Number(searchParams.pageSize) || 30;

	const filters = {
		currency: searchParams.currency,
		type: searchParams.type,
		category: searchParams.category,
		dateStart: searchParams.dateStart,
		dateEnd: searchParams.dateEnd
	};

	useEffect(() => {
		fetchMovements(params?.id, searchParams);
	}, [page, pageSize, ...Object.values(filters)]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => {
		updateFilterParams(pagination, searchParams, filters);
	};

	useEffect(() => {
		fetchBalance(params?.id, searchParams?.currency);
	}, [params?.id]);

	return (
		<>
			<div className='flex justify-between items-end'>
				<div className='ps-2'>
					Saldo a favor:{' '}
					<span className='text-[#10b981] font-semibold'>
						{formatCurrency(balance ?? 0)}
					</span>
				</div>

				<AddButton
					title='Gestionar Balance'
					modalContent={ModalContent.balance}
					buttonLabel='Balance'
					addIcon={false}
					appendIcon={<BiDollar size={18} />}
					dataToHandle={{ id: params?.id, currency: searchParams?.currency }}
				/>
			</div>

			<CustomTable
				columns={balanceMovementColumns}
				dataSource={customerBalanceMovements}
				isLoading={isLoading}
				scrollMinus={370}
				pagination={{
					current: customerBalanceMovementsPagination.page,
					pageSize: customerBalanceMovementsPagination.pageSize,
					total: customerBalanceMovementsPagination.total,
					showSizeChanger: true
				}}
				onChange={handleTableChange}
			/>
		</>
	);
};

export default BalanceTable;
