import { IoStorefrontOutline } from 'react-icons/io5';
import { PiInvoice } from 'react-icons/pi';
import { auth } from '@/auth';
import BillingsTable from '@/components/admin/billings/BillingsTable';
import GoBack from '@/components/admin/common/ui/GoBack';
import OpenDrawerButton from '@/components/admin/common/ui/OpenDrawerButton';
import { DrawerContent } from '@/types/enums';
import GenerateBillingReportButton from '@/components/admin/billings/GenerateBillingReportButton';

interface QuotesPageProps {
	params: {
		shopSlug: string;
	};
}

const BillingsPage = async (props: QuotesPageProps) => {
	const {
		params: { shopSlug }
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const session = await auth();
	const isAdmin = !session?.user?.shop;

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					{isAdmin ? <GoBack /> : null}
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Facturas:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<IoStorefrontOutline /> {shopName}
					</span>
				</div>
				<div className='flex gap-2'>
					<GenerateBillingReportButton shopSlug={shopSlug} />
					<OpenDrawerButton
						title='Crear Factura'
						drawerContent={DrawerContent.billings}
						buttonLabel='Factura'
						appendIcon={<PiInvoice size={18} />}
					/>
				</div>
			</div>
			<BillingsTable shopSlug={shopSlug} />
		</section>
	);
};

export default BillingsPage;
