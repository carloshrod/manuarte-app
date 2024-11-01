const BASE_URL = process.env.NEXT_APP_API_URL;

export const ENDPOINTS = {
	products: `${BASE_URL}/products`,
	productCategories: `${BASE_URL}/products/categories`
};
