const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
	PRODUCTS: `${BASE_URL}/products`,
	PRODUCT_VARIANTS: `${BASE_URL}/product-variants`,
	PRODUCT_CATEGORIES: `${BASE_URL}/product-categories`,
	USERS: `${BASE_URL}/users`,
	CUSTOMERS: `${BASE_URL}/customers`
};
