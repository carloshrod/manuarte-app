import TabsTableUsers from '@/components/admin/users/TabsTableUsers';
import { userServices } from '@/services/userServices';

const UsersPage = async () => {
	const staffData = await userServices.getAllUsers();
	const customersData = await userServices.getAllCustomers();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Usuarios</h2>
			<TabsTableUsers staffData={staffData} customersData={customersData} />
		</section>
	);
};

export default UsersPage;