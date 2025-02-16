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
	return (
		<div className='flex max-lg:flex-wrap gap-8 p-8'>
			{data?.topCOP?.length > 0 || data?.topUSD?.length > 0 ? (
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
									<Tooltip formatter={(value: number) => `${value} unds`} />
									<Pie
										data={data.topCOP}
										dataKey='totalQuantity'
										nameKey='productCategoryGroupName'
										cx='50%'
										cy='50%'
										innerRadius={10}
										fill='#0e7490'
										label={entry => `${entry.productCategoryGroupName}`}
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
									<Tooltip formatter={(value: number) => `${value} unds`} />
									<Pie
										data={data.topUSD}
										dataKey='totalQuantity'
										nameKey='productCategoryGroupName'
										cx='50%'
										cy='50%'
										innerRadius={10}
										fill='#eab308'
										label={entry => `${entry.productCategoryGroupName}`}
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
