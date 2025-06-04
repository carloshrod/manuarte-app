'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { getStaff } from '@/reducers/users/userSlice';

const StaffTable = ({ staffData }: { staffData: Staff[] }) => {
	const { staffColumns } = useTableColumns();
	const { staff } = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getStaff(staffData));
		setIsLoading(false);
	}, []);

	return (
		<CustomTable
			columns={staffColumns}
			dataSource={isLoading ? [] : staff}
			isLoading={isLoading}
		/>
	);
};

export default StaffTable;
