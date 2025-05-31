'use client';
import useTableColumns from '@/hooks/useTableColumns';
import { Empty, Table } from 'antd';

const TopProductsTable = ({
	topProducts
}: {
	topProducts: TopProductCustomer[];
}) => {
	const { topProductsCustomerColumns } = useTableColumns();

	return (
		<Table<TopProductCustomer>
			rowKey='productVariantId'
			columns={topProductsCustomerColumns}
			dataSource={topProducts}
			locale={{
				emptyText: (
					<Empty
						image={Empty.PRESENTED_IMAGE_DEFAULT}
						description={<p>{`No hay productos para mostrar`}</p>}
					/>
				)
			}}
			pagination={false}
		/>
	);
};

export default TopProductsTable;
