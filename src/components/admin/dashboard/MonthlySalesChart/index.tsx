import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import { Empty, Skeleton } from 'antd';
import FlagCol from '../Flags/FlagCol';
import FlagEcu from '../Flags/FlagEcu';

type Sales = {
	month: number;
	COP?: string;
	USD?: string;
};

interface SalesChartProps {
	data: { monthlyTotals: Sales[]; yearlyTotals: { COP: number; USD: number } };
	country: string;
	isLoading: boolean;
	year?: string;
}

const SalesChart = ({ data, country, year, isLoading }: SalesChartProps) => {
	const isCol = country === 'col';
	const dataKey = isCol ? 'COP' : 'USD';
	const fill = isCol ? '#059669' : '#22c55e';
	const flag = isCol ? <FlagCol /> : <FlagEcu />;

	const formatCurrency = (value: number) => {
		const formatter = new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: isCol ? 'COP' : 'USD'
		});
		return formatter.format(value);
	};

	const formatYAxisValue = (value: number) => {
		if (value >= 1_000_000) {
			return `${(value / 1_000_000).toFixed(1)}M`;
		}
		if (value >= 1_000) {
			return `${(value / 1_000).toFixed(1)}K`;
		}
		return value.toString();
	};

	return (
		<div className='w-full lg:w-1/2 shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-6 rounded-lg'>
			<div className='flex gap-2 items-center justify-center'>
				<h4 className='text-xl font-bold'>Ventas Mensuales</h4>
				{flag}
			</div>
			{!isLoading ? (
				data?.monthlyTotals?.length > 0 ? (
					<div>
						<ResponsiveContainer width='100%' height={320} className='p-4'>
							<BarChart width={730} height={250} data={data?.monthlyTotals}>
								<XAxis
									dataKey='month'
									tickFormatter={(month: string) => month.slice(0, 3)}
								/>
								<YAxis tickFormatter={formatYAxisValue} />
								<Tooltip formatter={(value: number) => formatCurrency(value)} />
								<Legend />
								<Bar dataKey={dataKey} fill={fill} />
							</BarChart>
						</ResponsiveContainer>

						<span className='font-bold'>
							Total {year}:{' '}
							<span
								className={`font-semibold ${isCol ? 'text-[#059669]' : 'text-[#22c55e]'}`}
							>
								{formatCurrency(data?.yearlyTotals[dataKey])}
							</span>
						</span>
					</div>
				) : (
					<Empty
						image={Empty.PRESENTED_IMAGE_DEFAULT}
						description={<p>{`No hay datos para mostrar`}</p>}
						className='mt-6'
					/>
				)
			) : (
				<div className='w-full h-[320px] flex items-center px-12'>
					<div className='w-full flex flex-col px-8'>
						<Skeleton.Node active style={{ width: '100%', height: 260 }} />
					</div>
					<div className='w-full flex flex-col px-8'>
						<Skeleton.Node active style={{ width: '100%', height: 260 }} />
					</div>
					<div className='w-full flex flex-col px-8'>
						<Skeleton.Node active style={{ width: '100%', height: 260 }} />
					</div>
				</div>
			)}
		</div>
	);
};

export default SalesChart;
