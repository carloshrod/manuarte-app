'use client';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import SalesChart from '@/components/admin/dashboard/MonthlySalesChart';
import StatsWidgets from '@/components/admin/dashboard/StatsWidgets';
import { dashboardServices } from '@/services/dashboardServices';
import TopSales from '@/components/admin/dashboard/TopSales';

const DashboardPage = () => {
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear);
	const [stats, setStats] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchStats = async () => {
		try {
			setIsLoading(true);
			const data = await dashboardServices.getStats(selectedYear);
			setStats(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchStats();
	}, [selectedYear]);

	const handleYearChange = (date: Dayjs | null) => {
		if (date) {
			setSelectedYear(date.year());
		}
	};

	const disabledDate = (current: Dayjs) => {
		return current && current.year() > currentYear;
	};

	return (
		<section className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-semibold'>Dashboard</h2>
			</div>
			<div className='flex flex-wrap justify-center text-center'>
				<StatsWidgets counts={stats?.counts} />

				<div className='p-4 w-full flex flex-col max-lg:flex-wrap gap-8'>
					<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] rounded-lg'>
						<div className='w-full flex gap-2 items-center justify-start px-6 pt-6'>
							<span className='font-semibold'>Seleccionar año:</span>
							<DatePicker
								value={dayjs().year(selectedYear)}
								onChange={handleYearChange}
								picker='year'
								disabledDate={disabledDate}
								style={{ width: 120 }}
								disabled={isLoading}
								placeholder='Seleccionar año'
							/>
						</div>

						<div className='flex flex-wrap gap-y-8'>
							<SalesChart
								data={stats?.sales}
								country='col'
								isLoading={isLoading}
								year={selectedYear.toString()}
							/>
							<SalesChart
								data={stats?.sales}
								country='ecu'
								isLoading={isLoading}
								year={selectedYear.toString()}
							/>
						</div>
					</div>
				</div>
				<TopSales />
			</div>
		</section>
	);
};

export default DashboardPage;
