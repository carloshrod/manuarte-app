'use client';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Empty } from 'antd';
import FlagCol from '../Flags/FlagCol';
import FlagEcu from '../Flags/FlagEcu';

type TopSales = {
	topCOP: {
		name: string;
		totalSales: number;
	}[];
	topUSD: {
		name: string;
		totalSales: number;
	}[];
	month: string;
};

interface TopSalesChartProps {
	data: TopSales;
}

const TopSalesCharts = ({ data }: TopSalesChartProps) => {
	const formatCurrency = (value: number, currency: string) => {
		const formatter = new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency
		});
		return formatter.format(value);
	};

	return (
		<div className='flex max-lg:flex-wrap gap-8 p-8'>
			{data.topCOP.length > 0 || data.topUSD.length > 0 ? (
				<>
					{/* Colombia */}
					{data.topCOP.length > 0 && (
						<ResponsiveContainer
							width='100%'
							height={320}
							className='flex flex-col gap-2 items-center p-4'
						>
							<>
								<FlagCol />
								<PieChart width={400} height={250}>
									<Tooltip
										formatter={(value: number) => formatCurrency(value, 'COP')}
									/>
									<Pie
										data={data.topCOP}
										dataKey='totalSales'
										nameKey='name'
										cx='50%'
										cy='50%'
										innerRadius={10}
										fill='#0e7490'
										label={entry => formatCurrency(entry.totalSales, 'COP')}
									/>
								</PieChart>
							</>
						</ResponsiveContainer>
					)}

					{/* Ecuador */}
					{data.topUSD.length > 0 && (
						<ResponsiveContainer
							width='100%'
							height={320}
							className='flex flex-col gap-2 items-center p-4'
						>
							<>
								<FlagEcu />
								<PieChart width={400} height={250}>
									<Tooltip
										formatter={(value: number) => formatCurrency(value, 'USD')}
									/>
									<Pie
										data={data.topUSD}
										dataKey='totalSales'
										nameKey='name'
										cx='50%'
										cy='50%'
										innerRadius={10}
										fill='#eab308'
										label={entry => formatCurrency(entry.totalSales, 'USD')}
									/>
								</PieChart>
							</>
						</ResponsiveContainer>
					)}
				</>
			) : (
				<Empty
					image={Empty.PRESENTED_IMAGE_DEFAULT}
					description={<p>{`No hay datos para mostrar`}</p>}
					className='m-auto grow'
				/>
			)}
		</div>
	);
};

export default TopSalesCharts;
