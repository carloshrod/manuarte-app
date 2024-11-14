import axios from 'axios';
import { ENDPOINTS } from '@/config/env';

export const ProductCategoryServices = {
	getAllProductCategories: async () => {
		try {
			const res = await axios.get(ENDPOINTS.PRODUCT_CATEGORIES);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	createProductCategory: async (body: ProductCategory) => {
		return await axios.post(ENDPOINTS.PRODUCT_CATEGORIES, body);
	},

	updateProductCategory: async (
		body: ProductCategory,
		productCategoryId: string
	) => {
		return await axios.put(
			`${ENDPOINTS.PRODUCT_CATEGORIES}/${productCategoryId}`,
			body
		);
	},

	deleteProductCategory: async (productCategoryId: string) => {
		return await axios.delete(
			`${ENDPOINTS.PRODUCT_CATEGORIES}/${productCategoryId}`
		);
	}
};
