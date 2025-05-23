import { ENV } from '@/config/env';
import { axiosPrivate } from './axios';

export const productServices = {
	getAllProducts: async () => {
		try {
			const res = await axiosPrivate.get(ENV.API.PRODUCTS);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	getAllProductVariants: async (server: boolean = true) => {
		try {
			const res = await axiosPrivate.get(ENV.API.PRODUCT_VARIANTS, { server });

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	searchProductVariants: async ({
		stockId,
		search,
		missingProducts = false
	}: {
		stockId: string;
		search: string;
		missingProducts?: boolean;
	}) => {
		try {
			const res = await axiosPrivate.get(
				`${ENV.API.PRODUCT_VARIANTS}/search/${stockId}`,
				{
					params: { search, missingProducts }
				}
			);

			return res.data;
		} catch (error) {
			console.error(error);
		}
	},

	bulkSearchProductVariants: async (body: string[], stockId: string) => {
		const res = await axiosPrivate.post(
			`${ENV.API.PRODUCT_VARIANTS}/bulkSearch/${stockId}`,
			body
		);

		return res.data;
	},

	createProduct: async (body: SubmitProductDto) => {
		return await axiosPrivate.post(ENV.API.PRODUCTS, body);
	},

	updateProduct: async (body: SubmitProductDto, productId: string) => {
		return await axiosPrivate.put(`${ENV.API.PRODUCTS}/${productId}`, body);
	},

	updateProductVariant: async (
		body: SubmitProductDto,
		productVariantId: string
	) => {
		return await axiosPrivate.put(
			`${ENV.API.PRODUCT_VARIANTS}/${productVariantId}`,
			{
				name: body?.productVariant?.name
			}
		);
	},

	addProductVariant: async (body: { name: string }, productId: string) => {
		return axiosPrivate.post(
			`${ENV.API.PRODUCTS}/add-variant/${productId}`,
			body
		);
	},

	deleteProduct: async (productId: string, productVariantId: string) => {
		return await axiosPrivate.delete(`${ENV.API.PRODUCTS}`, {
			params: {
				productId,
				productVariantId
			}
		});
	}
};
