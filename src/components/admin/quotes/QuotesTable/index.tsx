'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/Table';
import { useEffect, useState } from 'react';

const QuotesTable = ({ quotes }: { quotes: DataTable[] }) => {
	const { quoteColumns } = useTableColumns();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<CustomTable
			columns={quoteColumns}
			dataSource={!isLoading ? quotes : []}
			isLoading={isLoading}
			scrollMinus={335}
		/>
	);
};

export default QuotesTable;
