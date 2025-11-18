import { auth } from '@/auth';
import AddButton from '@/components/admin/common/ui/AddButton';
import TabsTableCustomers from '@/components/admin/users/TabsTableCustomers';
import { CustomerParams } from '@/libs/api/user';
import { ModalContent } from '@/types/enums';
import { HiOutlineUser } from 'react-icons/hi';
import { IoStorefrontOutline } from 'react-icons/io5';

export const dynamic = 'force-dynamic';

interface Props {
	searchParams: {
		tab?: string;
		page?: string;
		pageSize?: string;
	} & CustomerParams;
}

const CustomersPage = async ({ searchParams }: Props) => {
	const session = await auth();
	const isAdmin = session?.user?.roleName === 'admin';
	const shopName = session?.user?.shop?.toUpperCase().replace('-', ' ');
	const title = shopName ? 'Clientes:' : 'Clientes';

	return (
		<section className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					<h2 className='text-2xl font-semibold ps-4'>{title}</h2>
					{shopName ? (
						<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
							<IoStorefrontOutline /> {shopName}
						</span>
					) : null}
				</div>
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
				session={session}
				searchParams={searchParams}
				isAdmin={isAdmin}
			/>
		</section>
	);
};

export default CustomersPage;
