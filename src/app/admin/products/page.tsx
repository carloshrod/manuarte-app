import TabsTable from '@/components/admin/products/TabsTable';
import { ProductServices } from '@/services/productServices';
import { ProductCategoryServices } from '@/services/productCategoryServices';

const ProducstPage = async () => {
	const productVariantsData = await ProductServices.getAllProductVariants();
	const productCategoriesData =
		await ProductCategoryServices.getAllProductCategories();

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
