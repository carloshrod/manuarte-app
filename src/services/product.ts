import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productLibs, ProductVariantParams } from '@/libs/api/product';
import { setProductCategories } from '@/reducers/productCategories/productCategorySlice';
import {
	setProducts,
	setProductVariants
} from '@/reducers/products/productSlice';
import { FilterValue } from 'antd/es/table/interface';

type ProductFilters = {
	vId?: string;
	productName?: string;
	name?: string;
	productDescription?: string;
	productCategoryName?: string;
};

const useProductServices = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [tableFilters, setTableFilters] = useState<
		Record<string, FilterValue | null>
	>({});
	const dispatch = useDispatch();

	const getProducts = async () => {
		const data = await productLibs.getAllProducts();
		dispatch(setProducts(data));
	};

	const getProductVariants = async (params?: ProductVariantParams) => {
		try {
			setIsLoading(true);
			const data = await productLibs.getAllProductVariants(params);

			dispatch(setProductVariants(data));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getProductCategories = (data: ProductCategory[]) => {
		dispatch(setProductCategories(data));
	};

	const synchronizeFilters = (filters: ProductFilters) => {
		const initialFilters: Record<string, FilterValue | null> = {};
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				initialFilters[key] = [value];
			}
		});
		setTableFilters(initialFilters);
	};

	return {
		getProducts,
		getProductVariants,
		getProductCategories,
		synchronizeFilters,
		isLoading,
		setIsLoading,
		tableFilters
	};
};

export default useProductServices;
