import TabsTable from '@/components/admin/products/TabsTable';

const ProducstPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Productos</h2>
			<TabsTable />
		</section>
	);
};

export default ProducstPage;
