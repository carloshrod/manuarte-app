import SalesChart from '@/components/admin/dashboard/MonthlySalesChart';
import StatsWidgets from '@/components/admin/dashboard/StatsWidgets';
import { dashboardServices } from '@/services/dashboardServices';
import TopSales from '@/components/admin/dashboard/TopSales';

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
	const stats = await dashboardServices.getStats();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold'>Dashboard</h2>
			<div className='flex flex-wrap justify-center text-center'>
				<StatsWidgets counts={stats?.counts} />
				<div className='p-4 w-full flex max-lg:flex-wrap gap-8'>
					<SalesChart data={stats?.sales} country='col' />
					<SalesChart data={stats?.sales} country='ecu' />
				</div>
				<TopSales />
			</div>
		</section>
	);
};

export default DashboardPage;
