export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth/login',
	DASHBOARD: '/admin/dashboard',
	PRODUCTS: '/admin/productos',
	USERS: '/admin/usuarios',
	QUOTE_SHOPS: '/admin/cotizaciones',
	QUOTES: '/admin/cotizaciones/[shopSlug]',
	QUOTE_DETAIL: '/admin/cotizaciones/[shopSlug]/[serialNumber]',
	BILLING_SHOPS: '/admin/facturas',
	BILLINGS: '/admin/facturas/[shopSlug]',
	BILLING_DETAIL: '/admin/facturas/[shopSlug]/[serialNumber]',
	STOCKS: '/admin/stock',
	STOCK_ITEMS: '/admin/stock/[shopSlug]',
	STOCK_ITEM_HISTORY: '/admin/stock/[shopSlug]/historial',
	TRANSACTIONS: '/admin/movimientos-stock'
};
