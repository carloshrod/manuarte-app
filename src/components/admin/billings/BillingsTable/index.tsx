'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { useEffect, useState } from 'react';
import { billingServices } from '@/services/billingServices';
import { useDispatch, useSelector } from 'react-redux';
import { setBillings } from '@/reducers/billings/billingSlice';

const BillingsTable = ({ shopSlug }: { shopSlug: string }) => {
	const { billingColumns } = useTableColumns();
	const [isLoading, setIsLoading] = useState(false);
	const { billings } = useSelector((state: RootState) => state.billing);
	const dispatch = useDispatch();

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
		}, 300);
	}, []);

	return (
		<CustomTable
			columns={billingColumns}
			dataSource={isLoading ? [] : billings}
			isLoading={isLoading}
			scrollMinus={335}
		/>
	);
};

export default BillingsTable;
