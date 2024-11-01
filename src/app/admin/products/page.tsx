import TabsTable from '@/components/admin/products/TabsTable';
import {
	getAllProductCategories,
	getAllProducts
} from '@/services/productServices';

const ProducstPage = async () => {
	const products = await getAllProducts();
	const productCategories = await getAllProductCategories();

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Productos</h2>
			<TabsTable products={products} productCategories={productCategories} />
		</section>
	);
};

export default ProducstPage;
