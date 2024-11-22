import MonthlySalesChart from '@/components/admin/dashboard/MonthlySalesChart';
import { DashboardServices } from '@/services/dashboardServices';
import TopSalesCharts from '@/components/admin/dashboard/TopSalesChart';
import { Tabs, TabsProps } from 'antd';
import StatsWidgets from '@/components/admin/dashboard/StatsWidgets';

const DashboardPage = async () => {
	const stats = await DashboardServices.getStats();
	const salesData = await DashboardServices.getMonthlySales();
	// const now = new Date();
	// const currentMonth = now.getMonth();
	const currentMonth = 7;
	const topSalesCurrentMonth =
		await DashboardServices.getTopSales(currentMonth);
	const topSalesLastMonth = await DashboardServices.getTopSales(
		currentMonth - 1
	);

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Mes pasado',
			children: <TopSalesCharts data={topSalesLastMonth} />
		},
		{
			key: '2',
			label: 'Mes actual',
			children: <TopSalesCharts data={topSalesCurrentMonth} />
		}
	];

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Dashboard</h2>
			<div className='flex flex-wrap text-center'>
				<StatsWidgets stats={stats} />
				<div className='p-4 w-full flex max-lg:flex-wrap gap-8'>
					<MonthlySalesChart data={salesData} country='col' />
					<MonthlySalesChart data={salesData} country='ecu' />
				</div>
				<div className='p-4 w-full flex flex-col gap-8'>
					<div className='p-4 w-full min-h-[380px] shadow-[6px_6px_24px_rgba(0,0,0,0.25)] ps-6 py-6 rounded-lg'>
						<h4 className='text-xl font-bold'>Productos Top Ventas</h4>
						<Tabs defaultActiveKey='2' items={items} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardPage;
