import TabsTableCustomers from '@/components/admin/users/TabsTableCustomers';
import { userServices } from '@/services/userServices';

export const dynamic = 'force-dynamic';

const CustomersPage = async () => {
	const customersData = await userServices.getAllCustomers();
	const topCustomersData = await userServices.getTopCustomers();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Clientes</h2>
			<TabsTableCustomers
				customersData={customersData}
				topCustomersData={topCustomersData}
			/>
		</section>
	);
};

export default CustomersPage;
