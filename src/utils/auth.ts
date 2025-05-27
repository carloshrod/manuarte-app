import { formatUserExtraPermissions } from './formats';
import { ROUTES } from './routes';

export const generatePermissionOptions = (
	permissions: { id: string; name: string }[]
) => {
	const formattedPermissions = formatUserExtraPermissions(permissions);
	if (!formattedPermissions) return undefined;

	return formattedPermissions?.length > 0
		? formattedPermissions?.map(perm => {
				return {
					value: perm.id,
					label: perm.name
				};
			})
		: undefined;
};

export const AUTH_RULES = (
	shop: string
): Record<string, { defaultPath: string; allowedPaths: string[] }> => {
	return {
		admin: {
			defaultPath: ROUTES.DASHBOARD,
			allowedPaths: [
				ROUTES.DASHBOARD,
				ROUTES.PRODUCTS,
				ROUTES.STAFF,
				ROUTES.CUSTOMERS,
				ROUTES.QUOTE_SHOPS,
				ROUTES.QUOTES,
				ROUTES.QUOTE_DETAIL,
				ROUTES.BILLING_SHOPS,
				ROUTES.BILLINGS,
				ROUTES.BILLING_DETAIL,
				ROUTES.STOCKS,
				ROUTES.STOCK_ITEMS,
				ROUTES.STOCK_ITEM_HISTORY,
				ROUTES.TRANSACTIONS
			]
		},
		cajero: {
			defaultPath: `${ROUTES.QUOTE_SHOPS}/${shop}`,
			allowedPaths: [
				`${ROUTES.QUOTE_SHOPS}/${shop}`,
				ROUTES.QUOTE_DETAIL,
				`${ROUTES.BILLING_SHOPS}/${shop}`,
				ROUTES.BILLING_DETAIL,
				`${ROUTES.STOCKS}/${shop}`,
				ROUTES.TRANSACTIONS
			]
		},
		bodeguero: {
			defaultPath: ROUTES.PRODUCTS,
			allowedPaths: [
				ROUTES.PRODUCTS,
				`${ROUTES.STOCKS}/${shop}`,
				ROUTES.TRANSACTIONS
			]
		}
	};
};
