'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import { setStaff } from '@/reducers/users/userSlice';
import StaffCols from './cols';

const StaffTable = ({ staffData }: { staffData: Staff[] }) => {
	const { staffColumns } = StaffCols();
	const { staff } = useSelector((state: RootState) => state.user);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setStaff(staffData));
		setIsLoading(false);
	}, []);

	return (
		<CustomTable
			columns={staffColumns}
			dataSource={isLoading ? [] : staff}
			isLoading={isLoading}
			scrollMinus={290}
		/>
	);
};

export default StaffTable;
