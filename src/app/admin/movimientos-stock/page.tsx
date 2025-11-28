import { FaTruckLoading } from 'react-icons/fa';
import { BiExport, BiImport, BiTransfer } from 'react-icons/bi';
import OpenDrawerButton from '@/components/admin/common/ui/OpenDrawerButton';
import TransactionsTable from '@/components/admin/transactions/TransactionsTable';
import { DrawerContent } from '@/types/enums';
import { auth } from '@/auth';
import { MdOutlineWarehouse } from 'react-icons/md';
import { TransactionParams } from '@/libs/api/transaction';

export const dynamic = 'force-dynamic';

type TransactionsPageProps = {
	searchParams: TransactionParams;
};

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
	const session = await auth();
	const isAdmin = session?.user?.roleName === 'admin';
	const shopName =
		session?.user?.shop && session?.user?.shop.toUpperCase().replace('-', ' ');

	const hasTransactionDirectEnter = session?.user?.extraPermissions?.includes(
		'transaction-direct-enter'
	);

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex flex-wrap gap-4 justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Movimientos de Stock:
					</h2>
					{shopName ? (
						<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
							<MdOutlineWarehouse /> {shopName}
						</span>
					) : null}
				</div>
				<div className='flex gap-4'>
					{isAdmin || hasTransactionDirectEnter ? (
						<OpenDrawerButton
							title='Ingreso Directo'
							drawerContent={DrawerContent.directEnter}
							buttonLabel='Ingreso Directo'
							prependIcon={false}
							appendIcon={<FaTruckLoading size={18} />}
						/>
					) : null}
					{isAdmin ? (
						<OpenDrawerButton
							title='Transferencia'
							drawerContent={DrawerContent.transfer}
							buttonLabel='Transferencia'
							prependIcon={false}
							appendIcon={<BiTransfer size={18} />}
						/>
					) : null}
					<OpenDrawerButton
						title='Ingreso por Transferencia'
						drawerContent={DrawerContent.enterByTransfer}
						buttonLabel='Ingreso (Transfer)'
						prependIcon={false}
						appendIcon={<BiImport size={18} />}
					/>
					<OpenDrawerButton
						title='Egreso'
						drawerContent={DrawerContent.exit}
						buttonLabel='Egreso'
						prependIcon={false}
						appendIcon={<BiExport size={18} />}
					/>
				</div>
			</div>
			<TransactionsTable searchParams={searchParams} />
		</section>
	);
};

export default TransactionsPage;
