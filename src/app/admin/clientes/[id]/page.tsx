import GoBack from '@/components/admin/common/ui/GoBack';
import CustomerStats from '@/components/admin/users/CustomerStats';
import GenerateCustomerReportButton from '@/components/admin/users/GenerateCustomerReportButton';
import RecentActivityItem from '@/components/admin/users/RecentActivityItem';
import TopProductsTable from '@/components/admin/users/TabsTableCustomers/TopProductsTable';
import { userServices } from '@/services/userServices';
import { Card, Descriptions, DescriptionsProps, Empty, Timeline } from 'antd';
import { HiOutlineUser } from 'react-icons/hi';

interface CustomerDetailsPageProps {
	params: { id: string };
}

const CustomerDetailsPage = async ({
	params: { id }
}: CustomerDetailsPageProps) => {
	const customer = await userServices.getCustomerStats(id);
	const { info, billings, totalSpent, topProducts, quotes } = customer ?? {};
	const {
		dni,
		phoneNumber,
		email,
		city,
		location,
		cityName,
		regionName,
		countryIsoCode
	} = info ?? {};

	const cityValue = cityName
		? `${cityName}, ${regionName}, ${countryIsoCode}`
		: city;

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Documento',
			children: dni
		},
		{
			key: '2',
			label: 'Teléfono',
			children: phoneNumber
		},
		{
			key: '3',
			label: 'Email',
			children: email ?? '--'
		},
		{
			key: '4',
			label: 'Ciudad',
			children: cityValue ?? '--'
		},
		{
			key: '5',
			label: 'Dirección',
			children: location
		}
	];

	const recentActivity = [...billings?.rows, ...quotes?.rows].sort(
		(a, b) =>
			new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
	);

	return (
		<section className='h-full flex flex-col gap-6 px-4'>
			<div className='flex pt-4'>
				<GoBack />
				<div className='w-full flex flex-wrap items-center justify-between'>
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-2 flex items-center'>
						{customer?.info?.fullName}
						<HiOutlineUser size={22} />
					</h2>

					<GenerateCustomerReportButton
						info={{ ...info, billingsCount: billings?.count, totalSpent }}
						recentActivity={recentActivity}
					/>
				</div>
			</div>
			<div className='flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-4 ps-2'>
				<Descriptions
					title={<h3 className='text-lg'>Información General</h3>}
					items={items}
					labelStyle={{ fontWeight: 'bold' }}
				/>

				<div className='flex gap-6'>
					<div className='w-[65%]'>
						<h3 className='text-lg font-semibold mb-4'>Estadísticas</h3>
						<CustomerStats
							billingsCount={billings?.count}
							billings={billings?.rows}
							quotesCount={quotes?.count}
							totalSpent={totalSpent}
						/>

						{topProducts?.length > 0 ? (
							<>
								<h3 className='text-lg font-semibold mt-6 mb-4'>
									Top Productos
								</h3>
								<Card
									style={{
										boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
										borderRadius: 8
									}}
								>
									<TopProductsTable topProducts={topProducts} />
								</Card>
							</>
						) : null}
					</div>

					<div className='w-[35%]'>
						<h3 className='text-lg font-semibold mb-4'>Actividad reciente</h3>
						<Card
							style={{
								boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
								borderRadius: 8
							}}
						>
							{recentActivity?.length > 0 ? (
								<Timeline
									items={recentActivity
										?.slice(0, 5)
										.map((item: Billing | Quote) => {
											return {
												children: <RecentActivityItem item={item} />,
												color: 'paymentMethods' in item ? '#10b981' : '#0D6EFD'
											};
										})}
								/>
							) : (
								<div className='py-12'>
									<Empty description='No hay actividad reciente.' />
								</div>
							)}
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerDetailsPage;
