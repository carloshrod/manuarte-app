'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';
import CustomTable from '../../common/Table';
import useTableColumns from '@/hooks/useTableColumns';
import { getProductVariants } from '@/reducers/products/productSlice';
import { getProductCategories } from '@/reducers/productCategories/productCategorySlice';
import { ModalContent } from '@/types/enums';
import AddButton from '../../common/AddButton';

type TabsTableProductsProps = {
	productVariantsData: ProductVariant[];
	productCategoriesData: ProductCategory[];
};

const TabsTableProducts = ({
	productVariantsData,
	productCategoriesData
}: TabsTableProductsProps) => {
	const [isProducts, setIsProducts] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { productColumns, productCategoryColumns } = useTableColumns();
	const dispatch = useDispatch();
	const { productVariants } = useSelector((state: RootState) => state.product);
	const { productCategories } = useSelector(
		(state: RootState) => state.productCategory
	);

	useEffect(() => {
		dispatch(getProductVariants(productVariantsData));
		dispatch(getProductCategories(productCategoriesData));
		setIsLoading(false);
	}, []);

	const onChange = (key: string) => {
		setIsProducts(key === '1');
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Presentaciones',
			children: (
				<CustomTable
					columns={productColumns}
					dataSource={productVariants}
					isLoading={isLoading}
				/>
			)
		},
		{
			key: '2',
			label: 'Categorías',
			children: (
				<CustomTable
					columns={productCategoryColumns}
					dataSource={productCategories}
					isLoading={isLoading}
				/>
			)
		}
	];

	const operations = isProducts ? (
		<div className='flex gap-2 max-[460px]:flex-col'>
			<AddButton
				title='Agregar Presentación de Producto'
				modalContent={ModalContent.productVariants}
				buttonLabel='Presentación'
				appendIcon={<AiOutlineAppstore size={18} />}
			/>
			<AddButton
				title='Agregar Producto'
				modalContent={ModalContent.products}
				buttonLabel='Producto'
				appendIcon={<BiPackage size={18} />}
			/>
		</div>
	) : (
		<AddButton
			title='Agregar Categoría de Producto'
			modalContent={ModalContent.productCategories}
			buttonLabel='Categoría'
			appendIcon={<MdOutlineCategory size={18} />}
		/>
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

export default TabsTableProducts;
