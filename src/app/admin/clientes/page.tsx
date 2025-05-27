import AddButton from '@/components/admin/common/ui/AddButton';
import CustomersTable from '@/components/admin/users/CustomersTable';
import { userServices } from '@/services/userServices';
import { ModalContent } from '@/types/enums';
import { HiOutlineUser } from 'react-icons/hi';

const CustomersPage = async () => {
	const customersData = await userServices.getAllCustomers();

	return (
		<section className='flex flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-semibold px-4'>Clientes</h2>
				<AddButton
					title='Registrar Cliente'
					modalContent={ModalContent.customers}
					buttonLabel='Cliente'
					appendIcon={<HiOutlineUser size={18} />}
				/>
			</div>
			<CustomersTable customersData={customersData} />
		</section>
	);
};

export default CustomersPage;
