import MonthlySalesChart from '@/components/admin/dashboard/MonthlySalesChart';
import StatsWidgets from '@/components/admin/dashboard/StatsWidgets';
import TopSalesCharts from '@/components/admin/dashboard/TopSalesChart';
import { dashboardServices } from '@/services/dashboardServices';
import { Tabs, TabsProps } from 'antd';

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
	const stats = await dashboardServices.getStats();

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Mes pasado',
			children: <TopSalesCharts data={stats?.topSalesLastMonth} />
		},
		{
			key: '2',
			label: 'Mes actual',
			children: <TopSalesCharts data={stats?.topSalesCurrentMonth} />
		}
	];

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Dashboard</h2>
			<div className='flex flex-wrap justify-center text-center'>
				<StatsWidgets counts={stats?.counts} />
				<div className='p-4 w-full flex max-lg:flex-wrap gap-8'>
					<MonthlySalesChart data={stats?.sales} country='col' />
					<MonthlySalesChart data={stats?.sales} country='ecu' />
				</div>
				<div className='p-4 w-full flex flex-col gap-8'>
					<div className='p-4 w-full min-h-[380px] shadow-[6px_6px_24px_rgba(0,0,0,0.25)] ps-6 py-6 rounded-lg'>
						<h4 className='text-xl font-bold'>
							Top Ventas - Grupos de Categorías de Productos
						</h4>
						<Tabs defaultActiveKey='2' items={items} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashboardPage;
