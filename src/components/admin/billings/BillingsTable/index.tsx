'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { useEffect, useState } from 'react';
import { billingServices } from '@/services/billingServices';
import { useDispatch, useSelector } from 'react-redux';
import {
	setBillings,
	setFilteredBillings
} from '@/reducers/billings/billingSlice';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import moment from 'moment';
import { BillingStatus } from '@/types/enums';
import { usePathname } from 'next/navigation';

interface DataType {
	updatedDate?: string;
	status?: string;
	[key: string]: any;
}

const BillingsTable = ({ shopSlug }: { shopSlug: string }) => {
	const { billingColumns } = useTableColumns();
	const { billings } = useSelector((state: RootState) => state.billing);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const pathname = usePathname();

	const fetchBillings = async () => {
		setIsLoading(true);
		if (shopSlug) {
			const data = await billingServices.getAll(shopSlug);
			dispatch(setBillings(data));
		}
	};

	useEffect(() => {
		fetchBillings();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);

	useEffect(() => {
		dispatch(setFilteredBillings([]));
	}, [pathname]);

	const filterBillings = (
		_pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => {
		const updatedDateFilter = filters?.updatedDate;

		if (!updatedDateFilter || updatedDateFilter.length === 0) {
			dispatch(setFilteredBillings([]));
			return;
		}

		let filtered: DataType[] = [...billings];

		filtered = filtered?.filter(
			item =>
				moment(item?.updatedDate).format('YYYY-MM-DD') === updatedDateFilter[0]
		);

		filtered = filtered.filter(item => item.status === BillingStatus.PAID);

		dispatch(setFilteredBillings(filtered));
	};

	return (
		<CustomTable
			columns={billingColumns}
			dataSource={isLoading ? [] : billings}
			isLoading={isLoading}
			scrollMinus={335}
			filterData={filterBillings}
		/>
	);
};

export default BillingsTable;
