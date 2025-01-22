import ShopCards from '@/components/admin/common/display-data/ShopCards';
import { ROUTES } from '@/utils/routes';

export const dynamic = 'force-dynamic';

const QuoteShopsPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Cotizaciones</h2>
			<ShopCards route={ROUTES.QUOTE_SHOPS} />
		</section>
	);
};

export default QuoteShopsPage;
