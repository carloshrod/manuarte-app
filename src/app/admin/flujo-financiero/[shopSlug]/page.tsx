import { auth } from '@/auth';
import GoBack from '@/components/admin/common/ui/GoBack';
import { PiChartLineUpBold } from 'react-icons/pi';
import TabsFinancialFlow from '@/components/admin/financial-flow/TabsFinancialFlow';
import { shopServices } from '@/services/shopServices';

interface QuotesPageProps {
	params: {
		shopSlug: string;
	};
}

const FinancialFlowPage = async (props: QuotesPageProps) => {
	const {
		params: { shopSlug }
	} = props;

	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const session = await auth();
	const isAdmin = !session?.user?.shop;

	const shops: Shop[] = await shopServices.getAll();
	const shopId = shops?.find(sh => sh?.slug === shopSlug)?.id;

	return (
		<section className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<div className='flex flex-wrap items-center'>
					{isAdmin ? <GoBack /> : null}
					<h2 className='min-[478px]:text-lg min-[796px]:text-2xl font-semibold ps-4'>
						Flujo Financiero:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<PiChartLineUpBold /> {shopName}
					</span>
				</div>

				{/* TODO: Report */}
			</div>

			<TabsFinancialFlow shopId={shopId} />
		</section>
	);
};

export default FinancialFlowPage;
