import ShopCards from '@/components/admin/common/display-data/ShopCards';
import { ROUTES } from '@/utils/routes';
import React from 'react';

export const dynamic = 'force-dynamic';

const FinancialFlowShopsPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
				Flujo Financiero
			</h2>

			<ShopCards route={ROUTES.FINANCIAL_FLOW_SHOPS} />
		</section>
	);
};

export default FinancialFlowShopsPage;
