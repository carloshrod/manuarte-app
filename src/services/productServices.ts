import axios from 'axios';
import { ENDPOINTS } from '@/config/env';

export const ProductServices = {
	getAllProducts: async () => {
		try {
			const res = await axios.get(ENDPOINTS.PRODUCTS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getAllProductVariants: async () => {
		try {
			const res = await axios.get(ENDPOINTS.PRODUCT_VARIANTS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	createProduct: async (body: SubmitProductDto) => {
		return await axios.post(ENDPOINTS.PRODUCTS, body);
	},

	updateProduct: async (body: SubmitProductDto, productId: string) => {
		return await axios.put(`${ENDPOINTS.PRODUCTS}/${productId}`, body);
	},

	updateProductVariant: async (
		body: SubmitProductDto,
		productVariantId: string
	) => {
		return await axios.put(
			`${ENDPOINTS.PRODUCT_VARIANTS}/${productVariantId}`,
			{
				name: body?.productVariant?.name
			}
		);
	},

	addProductVariant: async (body: { name: string }, productId: string) => {
		return axios.post(`${ENDPOINTS.PRODUCTS}/add-variant/${productId}`, body);
	},

	deleteProduct: async (productId: string, productVariantId: string) => {
		return await axios.delete(`${ENDPOINTS.PRODUCTS}`, {
			params: {
				productId,
				productVariantId
			}
		});
	}
};
