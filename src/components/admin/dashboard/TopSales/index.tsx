'use client';

import { useEffect, useState } from 'react';
import { DatePicker, Tabs } from 'antd';
import TopSalesCharts from './TopSalesChart';
import GenerateTopSalesReportButton from './GenerateReportButton';
import { dashboardServices } from '@/services/dashboardServices';
import { formatToTitleCase } from '@/utils/formats';
import { TabsProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import esES from 'antd/es/date-picker/locale/es_ES';

dayjs.locale('es');

const TopSales = () => {
	const [stats, setStats] = useState<any>(null);
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const [activeKey, setActiveKey] = useState<string>('2');

	const fetchStats = async (year?: number, month?: number) => {
		try {
			const data = await dashboardServices.getTopSales(year, month);
			setStats(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchStats();
	}, []);

	const handleDateChange = (date: Dayjs | null) => {
		if (date) {
			setSelectedDate(date);
			const year = date.year();
			const month = date.month() + 1;
			fetchStats(year, month);
			setActiveKey('2');
		}
	};

	const currentMonthLabel = selectedDate.format('MMMM YYYY');
	const lastMonthLabel = selectedDate.subtract(1, 'month').format('MMM');

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: `Mes anterior - ${formatToTitleCase(lastMonthLabel)}`,
			children: <TopSalesCharts data={stats?.topSalesLastMonth} />
		},
		{
			key: '2',
			label: formatToTitleCase(currentMonthLabel),
			children: <TopSalesCharts data={stats?.topSalesCurrentMonth} />
		}
	];
	return (
		<div className='p-4 w-full flex flex-col gap-8'>
			<div className='p-4 w-full min-h-[380px] shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-6 rounded-lg'>
				<h4 className='text-xl font-bold'>
					Top Ventas - Grupos de Categorías de Productos
				</h4>

				<div className='flex justify-between items-center px-2'>
					<div className='flex gap-2 items-center my-6'>
						<span className='font-semibold'>Seleccionar período:</span>
						<DatePicker
							value={selectedDate && dayjs(selectedDate)}
							onChange={handleDateChange}
							picker='month'
							format={value =>
								formatToTitleCase(dayjs(value).format('MMMM YYYY')) as string
							}
							locale={esES}
							allowClear={false}
						/>
					</div>

					<div className='flex gap-4'>
						<GenerateTopSalesReportButton
							currency='COP'
							year={selectedDate.year().toString()}
							selectedMonth={selectedDate}
						/>
						<GenerateTopSalesReportButton
							currency='USD'
							year={selectedDate.year().toString()}
							selectedMonth={selectedDate}
						/>
					</div>
				</div>

				<Tabs activeKey={activeKey} items={items} onChange={setActiveKey} />
			</div>
		</div>
	);
};

export default TopSales;
