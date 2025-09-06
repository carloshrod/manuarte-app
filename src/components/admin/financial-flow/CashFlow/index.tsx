import { Skeleton } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils/formats';
import { useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';

const CashFlow = ({ isLoading }: { isLoading: boolean }) => {
	const {
		currentCashSession: { balance, data, canOpen }
	} = useSelector((state: RootState) => state.cashSession);
	const { cashMovementsColumns } = useTableColumns();

	const movements: CashMovement[] = data?.movements ?? [];
	const incomes = movements.filter(mov => mov?.type === 'INCOME');
	const expenses = movements.filter(mov => mov?.type === 'EXPENSE');

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-4 ps-3'>
				<div
					className={`h-6 w-6 rounded-full ${canOpen ? 'border-4 border-gray-300' : 'bg-[#10b981]'}`}
				/>

				{data?.openedAt && (
					<h2>
						<span className='font-bold'>Fecha de apertura:</span>{' '}
						{formatDate(data?.openedAt)}
					</h2>
				)}
				{data?.closedAt && (
					<h2>
						<span className='font-bold'>Fecha de cierre:</span>{' '}
						{formatDate(data?.closedAt)}
					</h2>
				)}
				<h2 className='font-bold'>
					Balance:{' '}
					{isLoading ? (
						<Skeleton.Button
							active
							style={{
								width: 100,
								height: 20,
								outline: '1px solid transparent'
							}}
						/>
					) : (
						<span
							className={`${balance > 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
						>
							{formatCurrency(balance ?? 0)}
						</span>
					)}
				</h2>
			</div>
			<div className='flex gap-4'>
				<div className='w-full space-y-2'>
					<h3 className='ps-4 text-[#10b981] font-bold'>
						Ingresos <DollarCircleOutlined style={{ color: '#10b981' }} />
					</h3>
					<CustomTable
						columns={cashMovementsColumns}
						dataSource={isLoading ? [] : incomes}
						isLoading={isLoading}
					/>
				</div>

				<div className='w-full space-y-2'>
					<h3 className='ps-4 text-[#E53535] font-bold'>
						Gastos{' '}
						<DollarCircleOutlined style={{ color: '#E53535', fontSize: 16 }} />
					</h3>
					<CustomTable
						columns={cashMovementsColumns}
						dataSource={isLoading ? [] : expenses}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default CashFlow;
