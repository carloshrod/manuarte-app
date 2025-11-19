import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productLibs, ProductVariantParams } from '@/libs/api/product';
import { setProductCategories } from '@/reducers/productCategories/productCategorySlice';
import {
	setProducts,
	setProductVariants
} from '@/reducers/products/productSlice';

const useProductServices = () => {
	const [isLoading, setIsLoading] = useState(true);
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

	return {
		getProducts,
		getProductVariants,
		getProductCategories,
		isLoading,
		setIsLoading
	};
};

export default useProductServices;
