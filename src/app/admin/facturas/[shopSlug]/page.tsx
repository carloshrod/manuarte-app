import { IoStorefrontOutline } from 'react-icons/io5';
import { auth } from '@/auth';
import BillingsTable from '@/components/admin/billings/BillingsTable';
import GoBack from '@/components/admin/common/ui/GoBack';
import GenerateBillingReportButton from '@/components/admin/billings/GenerateBillingReportButton';
import DropdownMenu from '@/components/admin/common/ui/DropdownMenu';
import { MenuProps, Space } from 'antd';
import OpenDrawerButton from '@/components/admin/common/ui/OpenDrawerButton';
import { DrawerContent } from '@/types/enums';
import { PiInvoice } from 'react-icons/pi';
import { MdOutlinePendingActions } from 'react-icons/md';
import { BillingParams } from '@/libs/api/billing';

interface QuotesPageProps {
	params: {
		shopSlug: string;
	};
	searchParams: BillingParams;
}

const BillingsPage = async (props: QuotesPageProps) => {
	const {
		params: { shopSlug },
		searchParams
	} = props;
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const session = await auth();
	const isAdmin = !session?.user?.shop;

	const dropDownItems: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Space className='px-2'>
					<OpenDrawerButton
						title={`Generar Factura - ${shopName}`}
						drawerContent={DrawerContent.billings}
						buttonLabel='Generar Factura'
						prependIcon={false}
						appendIcon={<PiInvoice size={18} />}
						variant='text'
					/>
				</Space>
			)
		},
		{
			key: '2',
			label: (
				<Space className='px-2'>
					<OpenDrawerButton
						title={`Pedido | Abono - ${shopName}`}
						drawerContent={DrawerContent.preOrder}
						buttonLabel='Pedido | Abono'
						prependIcon={false}
						appendIcon={<MdOutlinePendingActions size={18} />}
						variant='text'
					/>
				</Space>
			)
		}
	];

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
					<GenerateBillingReportButton
						shopSlug={shopSlug}
						searchParams={searchParams}
					/>
					<DropdownMenu items={dropDownItems} label='Factura' />
				</div>
			</div>
			<BillingsTable searchParams={searchParams} shopSlug={shopSlug} />
		</section>
	);
};

export default BillingsPage;
