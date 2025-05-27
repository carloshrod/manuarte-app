import AddButton from '@/components/admin/common/ui/AddButton';
import StaffTable from '@/components/admin/users/StaffTable';
import { userServices } from '@/services/userServices';
import { ModalContent } from '@/types/enums';
import { RiUserSettingsLine } from 'react-icons/ri';

export const dynamic = 'force-dynamic';

const UsersPage = async () => {
	const staffData = await userServices.getAllStaff();

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-semibold px-4'>Staff</h2>
				<AddButton
					title='Agregar Staff'
					modalContent={ModalContent.staff}
					buttonLabel='Staff'
					appendIcon={<RiUserSettingsLine size={18} />}
				/>
			</div>
			<StaffTable staffData={staffData} />
		</section>
	);
};

export default UsersPage;
