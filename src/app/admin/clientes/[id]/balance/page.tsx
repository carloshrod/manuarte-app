import { HiOutlineUser } from 'react-icons/hi';
import GoBack from '@/components/admin/common/ui/GoBack';
import BalanceTable from '@/components/admin/users/BalanceTable';
import { BalanceMovementsParams } from '@/libs/api/customer-balance';
import { customerLibs } from '@/libs/api/customer';

interface CustomerBalancePageProps {
	params: {
		id: string;
	};
	searchParams: BalanceMovementsParams;
}

const CustomerBalance = async (props: CustomerBalancePageProps) => {
	const { params, searchParams } = props;

	const customer = await customerLibs.getCustomerById(params.id, true);

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex'>
				<GoBack />
				<h2 className='flex items-center text-2xl font-semibold ps-2'>
					Balance - {customer?.fullName} <HiOutlineUser size={22} />
				</h2>
			</div>
			<BalanceTable params={params} searchParams={searchParams} />
		</section>
	);
};

export default CustomerBalance;
