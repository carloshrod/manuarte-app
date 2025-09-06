const WA_BASE_URL = `${process.env.NEXT_PUBLIC_WA_URL}/${process.env.NEXT_PUBLIC__WA_PHONE_NUMBER_ID}`;

export const ENV = {
	BASE_URL: process.env.NEXT_PUBLIC_API_URL,
	API: {
		AUTH: '/auth',
		DASHBOARD: '/dashboard',
		PRODUCTS: '/products',
		PRODUCT_VARIANTS: '/product-variants',
		PRODUCT_CATEGORIES: '/product-categories',
		USERS: '/users',
		CUSTOMERS: '/customers',
		SHOPS: '/shops',
		QUOTES: '/quotes',
		BILLINGS: '/billings',
		STOCK_ITEMS: '/stock-items',
		TRANSACTIONS: '/transactions',
		CITIES: '/cities',
		CASH_SESSION: '/cash-sessions'
	},
	WA: {
		MESSAGES: `${WA_BASE_URL}/messages`,
		MEDIA: `${WA_BASE_URL}/media`
	}
};
