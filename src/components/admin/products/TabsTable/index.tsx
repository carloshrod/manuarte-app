'use client';
import { useState } from 'react';
import { Button, Table, Tabs, TabsProps } from 'antd';
import products from './products.json';
import productCategories from './productCategories.json';
import useTableColumns from '@/hooks/useTableColumns';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';

const TabsTable = () => {
	const { productColumns, productCategoryColumns } = useTableColumns();
	const productArray = products as Product[][];
	const productsData = productArray[0];
	const [isProducts, setIsProducts] = useState(true);

	const onChange = (key: string) => {
		setIsProducts(key === '1');
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Productos',
			children: (
				<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-2 px-4 rounded-lg'>
					<Table<Product>
						rowKey='id'
						columns={productColumns}
						dataSource={productsData}
						scroll={{ y: 'calc(100vh - 380px)' }}
						pagination={{
							locale: { items_per_page: 'por página' }
						}}
					/>
				</div>
			)
		},
		{
			key: '2',
			label: 'Categorías',
			children: (
				<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-2 px-4 rounded-lg'>
					<Table<ProductCategory>
						rowKey='id'
						columns={productCategoryColumns}
						dataSource={productCategories}
						scroll={{ y: 'calc(100vh - 380px)' }}
						pagination={{
							locale: { items_per_page: 'por página' }
						}}
					/>
				</div>
			)
		}
	];

	const operations = isProducts ? (
		<div className='flex gap-2 max-[460px]:flex-col'>
			<Button variant='outlined' color='primary' icon={<IoMdAdd size={18} />}>
				<p className='max-sm:hidden'>Presentación</p>{' '}
				<AiOutlineAppstore size={18} />
			</Button>
			<Button variant='outlined' color='primary' icon={<IoMdAdd size={18} />}>
				<p className='max-sm:hidden'>Producto</p>
				<BiPackage size={18} />
			</Button>
		</div>
	) : (
		<Button variant='outlined' color='primary' icon={<IoMdAdd size={18} />}>
			Categoría <MdOutlineCategory size={18} />
		</Button>
	);

	return (
		<Tabs
			defaultActiveKey='1'
			items={items}
			tabBarExtraContent={operations}
			onChange={onChange}
		/>
	);
};

export default TabsTable;
