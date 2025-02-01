import ShopCards from '@/components/admin/common/display-data/ShopCards';
import { ROUTES } from '@/utils/routes';

export const dynamic = 'force-dynamic';

const StockPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Stock</h2>
			<ShopCards route={ROUTES.STOCKS} isShop={false} />
		</section>
	);
};

export default StockPage;
