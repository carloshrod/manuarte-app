'use client';
import { useEffect, useState } from 'react';
import { Button, Tabs, TabsProps } from 'antd';
import useTableColumns from '@/hooks/useTableColumns';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/enums';
import { getProductVariants } from '@/reducers/products/productSlice';
import { getProductCategories } from '@/reducers/productCategories/productCategorySlice';
import CustomTable from '../../common/Table';

type TabsTableProps = {
	productVariantsData: ProductVariant[];
	productCategoriesData: ProductCategory[];
};

const TabsTable = ({
	productVariantsData,
	productCategoriesData
}: TabsTableProps) => {
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
			<Button
				variant='outlined'
				color='primary'
				icon={<IoMdAdd size={18} />}
				onClick={() =>
					dispatch(
						openModal({
							title: 'Agregar Presentación de Producto',
							content: ModalContent.productVariants
						})
					)
				}
			>
				<p className='max-sm:hidden'>Presentación</p>{' '}
				<AiOutlineAppstore size={18} />
			</Button>
			<Button
				variant='outlined'
				color='primary'
				icon={<IoMdAdd size={18} />}
				onClick={() =>
					dispatch(
						openModal({
							title: 'Agregar Producto',
							content: ModalContent.products
						})
					)
				}
			>
				<p className='max-sm:hidden'>Producto</p>
				<BiPackage size={18} />
			</Button>
		</div>
	) : (
		<Button
			variant='outlined'
			color='primary'
			icon={<IoMdAdd size={18} />}
			onClick={() =>
				dispatch(
					openModal({
						title: 'Agregar Categoría de Producto',
						content: ModalContent.productCategories
					})
				)
			}
		>
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
