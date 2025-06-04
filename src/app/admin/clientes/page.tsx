import { auth } from '@/auth';
import AddButton from '@/components/admin/common/ui/AddButton';
import TabsTableCustomers from '@/components/admin/users/TabsTableCustomers';
import { userServices } from '@/services/userServices';
import { ModalContent } from '@/types/enums';
import { HiOutlineUser } from 'react-icons/hi';

export const dynamic = 'force-dynamic';

const CustomersPage = async () => {
	const session = await auth();
	const isAdmin = session?.user?.roleName === 'admin';
	const customersData = await userServices.getAllCustomers();
	const topCustomersData = await userServices.getTopCustomers();

	return (
		<section className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-semibold px-4'>Clientes</h2>
				{!isAdmin ? (
					<AddButton
						title='Registrar Cliente'
						modalContent={ModalContent.customers}
						buttonLabel='Cliente'
						appendIcon={<HiOutlineUser size={18} />}
					/>
				) : null}
			</div>
			<TabsTableCustomers
				customersData={customersData}
				topCustomersData={topCustomersData}
				isAdmin={isAdmin}
			/>
		</section>
	);
};

export default CustomersPage;
