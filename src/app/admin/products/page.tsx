import TabsTable from '@/components/admin/products/TabsTable';
import {
	getAllProductCategories,
	getAllProductVariants
} from '@/services/productServices';

const ProducstPage = async () => {
	const productVariantsData = await getAllProductVariants();
	const productCategoriesData = await getAllProductCategories();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Productos</h2>
			<TabsTable
				productVariantsData={productVariantsData}
				productCategoriesData={productCategoriesData}
			/>
		</section>
	);
};

export default ProducstPage;
