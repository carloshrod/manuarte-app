import { Empty, Table, TableColumnsType } from 'antd';
import { useMediaQuery } from 'react-responsive';

interface CustomTableProps {
	columns: TableColumnsType<any>;
	dataSource: DataTable[];
	isLoading?: boolean;
	scrollMinus?: number;
}

const CustomTable = ({
	columns,
	dataSource,
	isLoading = false,
	scrollMinus = 380
}: CustomTableProps) => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	return (
		<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-2 px-4 rounded-lg'>
			<Table<DataTable>
				rowKey='id'
				columns={columns}
				dataSource={dataSource}
				scroll={{
					y:
						dataSource?.length > 0
							? `calc(100vh - ${scrollMinus}px)`
							: undefined
				}}
				pagination={{
					locale: { items_per_page: '/ página' },
					size: isMobile ? 'small' : 'default'
				}}
				style={{ minHeight: isLoading ? 'calc(100vh - 300px)' : undefined }}
				loading={{
					spinning: isLoading,
					style: { minHeight: 'calc(100vh - 300px)' }
				}}
				locale={{
					emptyText: !isLoading ? (
						<Empty
							image={Empty.PRESENTED_IMAGE_DEFAULT}
							description={<p>{`No hay datos para mostrar`}</p>}
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								height: 'calc(100vh - 380px)'
							}}
						/>
					) : null
				}}
			/>
		</div>
	);
};

export default CustomTable;
