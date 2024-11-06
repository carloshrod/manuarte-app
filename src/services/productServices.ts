import axios from 'axios';
import { ENDPOINTS } from '@/config/env';

export const getAllProducts = async () => {
	try {
		const res = await axios.get(ENDPOINTS.PRODUCTS);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getAllProductVariants = async () => {
	try {
		const res = await axios.get(ENDPOINTS.PRODUCT_VARIANTS);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getAllProductCategories = async () => {
	try {
		const res = await axios.get(ENDPOINTS.PRODUCT_CATEGORIES);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const createProduct = async (body: ProductCreationAttr) => {
	return await axios.post(ENDPOINTS.PRODUCTS, body);
};
