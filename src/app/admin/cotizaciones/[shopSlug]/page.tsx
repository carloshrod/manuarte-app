import { IoStorefrontOutline } from 'react-icons/io5';
import QuotesTable from '@/components/admin/quotes/QuotesTable';
import GoBack from '@/components/admin/common/ui/GoBack';
import OpenDrawerButton from '@/components/admin/common/ui/OpenDrawerButton';
import { auth } from '@/auth';

interface QuotesPageProps {
	params: {
		shopSlug: string;
	};
}

const QuotesPage = async (props: QuotesPageProps) => {
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
						Cotizaciones:
					</h2>
					<span className='flex gap-1 items-center ps-4 max-[555px]:mt-2 min-[478px]:text-lg min-[796px]:text-2xl font-semibold'>
						<IoStorefrontOutline /> {shopName}
					</span>
				</div>
				<OpenDrawerButton isQuote={true} />
			</div>
			<QuotesTable shopSlug={shopSlug} />
		</section>
	);
};

export default QuotesPage;
