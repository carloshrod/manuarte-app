import { FaTruckLoading } from 'react-icons/fa';
import { BiExport, BiImport, BiTransfer } from 'react-icons/bi';
import OpenDrawerButton from '@/components/admin/common/ui/OpenDrawerButton';
import TransactionsTable from '@/components/admin/transactions/TransactionsTable';
import { DrawerContent } from '@/types/enums';
import { shopServices } from '@/services/shopServices';

export const dynamic = 'force-dynamic';

const TransactionsPage = async () => {
	const shopsData = await shopServices.getAll();

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex flex-wrap gap-4 justify-between items-center'>
				<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
					Movimientos de Stock:
				</h2>
				<div className='flex gap-4'>
					<OpenDrawerButton
						title='Ingreso por Producción'
						drawerContent={DrawerContent.enterByProduction}
						buttonLabel='Producción'
						prependIcon={false}
						appendIcon={<FaTruckLoading size={18} />}
					/>
					<OpenDrawerButton
						title='Transferencia'
						drawerContent={DrawerContent.transfer}
						buttonLabel='Transferencia'
						prependIcon={false}
						appendIcon={<BiTransfer size={18} />}
					/>
					<OpenDrawerButton
						title='Ingreso'
						drawerContent={DrawerContent.enter}
						buttonLabel='Ingreso'
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
			<TransactionsTable shopsData={shopsData} />
		</section>
	);
};

export default TransactionsPage;
