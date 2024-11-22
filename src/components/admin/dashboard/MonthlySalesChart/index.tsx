'use client';
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import FlagCol from '../Flags/FlagCol';
import FlagEcu from '../Flags/FlagEcu';

type Sales = {
	month: number;
	COP?: string;
	USD?: string;
};

interface MonthlySalesChartProps {
	data: Sales[];
	country: string;
}

const MonthlySalesChart = ({ data = [], country }: MonthlySalesChartProps) => {
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
			{data?.length > 0 ? (
				<ResponsiveContainer width='100%' height={320} className='p-4'>
					<BarChart width={730} height={250} data={data}>
						<XAxis dataKey='month' />
						<YAxis tickFormatter={formatYAxisValue} />
						<Tooltip formatter={(value: number) => formatCurrency(value)} />
						<Legend />
						<Bar dataKey={dataKey} fill={fill} />
					</BarChart>
				</ResponsiveContainer>
			) : null}
		</div>
	);
};

export default MonthlySalesChart;
