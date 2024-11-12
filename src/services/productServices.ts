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

export const createProductService = async (body: SubmitProductDto) => {
	return await axios.post(ENDPOINTS.PRODUCTS, body);
};

export const updateProductService = async (
	body: SubmitProductDto,
	productId: string
) => {
	return await axios.put(`${ENDPOINTS.PRODUCTS}/${productId}`, body);
};

export const updateProductVariantService = async (
	body: SubmitProductDto,
	productVariantId: string
) => {
	return await axios.put(`${ENDPOINTS.PRODUCT_VARIANTS}/${productVariantId}`, {
		name: body?.productVariant?.name
	});
};

export const addProductVariantService = async (
	body: { name: string },
	productId: string
) => {
	return axios.post(`${ENDPOINTS.PRODUCTS}/add-variant/${productId}`, body);
};

export const deleteProductService = async (
	productId: string,
	productVariantId: string
) => {
	return await axios.delete(`${ENDPOINTS.PRODUCTS}`, {
		params: {
			productId,
			productVariantId
		}
	});
};

export const searchProductsByName = async (productName: string) => {
	const res = await axios.get(
		`${ENDPOINTS.PRODUCTS}/search?productName=${productName}`
	);

	return res.data;
};
