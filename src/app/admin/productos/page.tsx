import TabsTableProducts from '@/components/admin/products/TabsTableProducts';
import { productServices } from '@/services/productServices';
import { productCategoryServices } from '@/services/productCategoryServices';

export const dynamic = 'force-dynamic';

const ProducstPage = async () => {
	const productVariantsData = await productServices.getAllProductVariants();
	const productCategoriesData =
		await productCategoryServices.getAllProductCategories();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Productos</h2>
			<TabsTableProducts
				productVariantsData={productVariantsData}
				productCategoriesData={productCategoriesData}
			/>
		</section>
	);
};

export default ProducstPage;
