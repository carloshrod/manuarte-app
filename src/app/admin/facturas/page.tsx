import ShopCards from '@/components/admin/common/display-data/ShopCards';
import { ROUTES } from '@/utils/routes';

export const dynamic = 'force-dynamic';

const BillingShopsPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Facturas</h2>
			<ShopCards route={ROUTES.BILLING_SHOPS} />
		</section>
	);
};

export default BillingShopsPage;
