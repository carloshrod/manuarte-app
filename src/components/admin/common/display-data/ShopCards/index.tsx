import Link from 'next/link';
import { shopServices } from '@/services/shopServices';
import { IoStorefrontOutline } from 'react-icons/io5';
import { MdOutlineWarehouse } from 'react-icons/md';

const ShopCards = async ({
	route,
	isShop = true
}: {
	route: string;
	isShop?: boolean;
}) => {
	const shops: Shop[] = await shopServices.getAll();

	const cardIcon = isShop ? (
		<IoStorefrontOutline
			size={50}
			className='text-blue-500 w-12 h-12 mb-6 inline-block'
		/>
	) : (
		<MdOutlineWarehouse
			size={50}
			className='text-emerald-500 w-12 h-12 mb-6 inline-block'
		/>
	);

	return (
		<>
			<h3 className='px-6 lg:px-8 text-xl'>
				Seleccionar {isShop ? 'tienda' : 'bodega'}:
			</h3>
			<div className='flex flex-wrap lg:px-10'>
				{shops?.length > 0 &&
					shops?.map(shop => (
						<div key={shop.id} className='p-6 text-center sm:w-1/2 w-full'>
							<Link
								href={{
									pathname: `${route}/${shop.slug}`,
									query: {
										shopId: shop.id,
										main: isShop ? undefined : shop.mainStock
									}
								}}
							>
								<div className='max-h-[200px] shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-12 rounded-lg transform transition duration-300 hover:scale-105'>
									{cardIcon}
									<h4 className='title-font font-medium text-lg lg:text-xl text-gray-900'>
										{shop.name}
									</h4>
								</div>
							</Link>
						</div>
					))}
			</div>
		</>
	);
};

export default ShopCards;
