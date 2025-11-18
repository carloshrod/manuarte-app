import { Empty, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useMediaQuery } from 'react-responsive';

interface CustomTableProps {
	columns: TableColumnsType<any>;
	dataSource: DataTable[];
	isLoading?: boolean;
	scrollMinus?: number;
	pagination?: TablePaginationConfig;
	filterData?: (
		_pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => void;
	onChange?: (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => void;
}

const CustomTable = ({
	columns,
	dataSource,
	isLoading = false,
	scrollMinus = 380,
	pagination,
	onChange = () => null
}: CustomTableProps) => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

	const defaultPagination: TablePaginationConfig = {
		locale: { items_per_page: '/ página' },
		size: isMobile ? 'small' : 'default',
		defaultPageSize: 30,
		pageSizeOptions: ['30', '50', '100']
	};

	return (
		<div className='py-2 px-4 shadow-[6px_6px_24px_rgba(0,0,0,0.25)] rounded-lg'>
			<Table<DataTable>
				rowKey='id'
				columns={columns}
				dataSource={dataSource}
				scroll={{
					y:
						dataSource?.length > 0
							? `calc(100vh - ${scrollMinus}px)`
							: undefined,
					x: !isLoading && dataSource?.length > 0 ? 'max-content' : undefined
				}}
				pagination={{
					...defaultPagination,
					...(pagination ?? {})
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
					) : null,
					filterConfirm: 'Filtrar',
					filterReset: 'Limpiar',
					triggerAsc: 'Orden ascendente',
					triggerDesc: 'Orden descendente'
				}}
				onChange={onChange}
			/>
		</div>
	);
};

export default CustomTable;
