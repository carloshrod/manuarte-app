import { productLibs } from '@/libs/api/product';
import { setProductCategories } from '@/reducers/productCategories/productCategorySlice';
import {
	setProducts,
	setProductVariants
} from '@/reducers/products/productSlice';
import { objectToSearchParams } from '@/utils/formats';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
	const router = useRouter();

	const getProducts = async () => {
		const data = await productLibs.getAllProducts();
		dispatch(setProducts(data));
	};

	const getProductVariants = async (params?: {
		page?: number;
		pageSize?: number;
		vId?: string;
		productName?: string;
		name?: string;
		productDescription?: string;
		productCategoryName?: string;
	}) => {
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

	const updatePaginationParams = (
		pagination: TablePaginationConfig,
		searchParams: Record<string, any>,
		filters: Record<string, FilterValue | null>
	) => {
		const params = objectToSearchParams(searchParams);

		params.set('page', String(pagination.current ?? 1));
		params.set('pageSize', String(pagination.pageSize ?? 10));

		Object.entries(filters).forEach(([key, value]) => {
			if (value && value.length > 0) params.set(key, String(value[0]));
			else params.delete(key);
		});

		router.replace(`?${params.toString()}`);
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
		updatePaginationParams,
		getProductCategories,
		synchronizeFilters,
		isLoading,
		setIsLoading,
		tableFilters
	};
};

export default useProductServices;
