import { ROUTES } from './routes';

export const formatToTitleCase = (str: string) => {
	if (!str) return null;

	if (!/\s/.test(str)) {
		return (
			`${str?.charAt(0).toUpperCase()}${str?.slice(1).toLowerCase()}` || ''
		);
	}

	return str
		.split(' ')
		.map(
			word => `${word?.charAt(0).toUpperCase()}${word?.slice(1).toLowerCase()}`
		)
		.join(' ');
};

export const formatCurrency = (amount: number | string) => {
	const currency = Number(amount);
	if (isNaN(currency)) return 'Invalid number';

	const [integerPart, decimalPart] = currency.toFixed(2).toString().split('.');

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	return decimalPart && +decimalPart > 0
		? `${formattedInteger},${decimalPart.padEnd(2, '0')}`
		: formattedInteger;
};

export const formatInputCurrency = (value: number | undefined) => {
	if (!value) return '$ 0';

	const numericValue = parseFloat(value.toString());

	const [integerPart, decimalPart] = numericValue.toFixed(2).split('.');

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return decimalPart && parseInt(decimalPart) > 0
		? `$ ${formattedInteger}.${decimalPart}`
		: `$ ${formattedInteger}`;
};

export const QUOTE_STATUS_MAP: Record<string, string> = {
	ACCEPTED: 'ACEPTADA',
	PENDING: 'POR PAGAR',
	CANCELED: 'CANCELADA',
	REVISION: 'EN REVISIÓN',
	OVERDUE: 'VENCIDA'
};

export const BILLING_STATUS_MAP: Record<string, string> = {
	PAID: 'PAGADA',
	PENDING_PAYMENT: 'PAGO PENDIENTE',
	CANCELED: 'CANCELADA'
};

export const PAYMENT_METHOD_MAP: Record<string, string> = {
	BANK_TRANSFER: 'TRANSFERENCIA',
	CASH: 'EFECTIVO',
	CREDIT_CARD: 'TARJETA DE CRÉDITO',
	DEBIT_CARD: 'TARJETA DE DÉBITO',
	PAYPAL: 'PAYPAL',
	OTHER: 'OTRO'
};

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

export const formatUserExtraPermissions = (
	extraPermissions: { id: string; name: string }[]
) => {
	try {
		return extraPermissions?.map(permission => ({
			...permission,
			name: permissionMapping[permission.name] || permission.name
		}));
	} catch (error) {
		console.error(error);
	}
};

const permissionMapping: Record<string, string> = {
	'product-read': 'Ver productos',
	'product-create': 'Crear productos',
	'product-update': 'Editar productos',
	'product-delete': 'Eliminar productos',
	'customer-read': 'Ver clientes',
	'customer-create': 'Crear clientes',
	'customer-update': 'Editar clientes',
	'customer-delete': 'Eliminar clientes'
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
				ROUTES.USERS,
				ROUTES.QUOTE_SHOPS,
				ROUTES.QUOTES,
				ROUTES.QUOTE_DETAIL,
				ROUTES.BILLING_SHOPS,
				ROUTES.BILLINGS,
				ROUTES.BILLING_DETAIL,
				ROUTES.STOCK,
				ROUTES.STOCK_TRANSACTIONS
			]
		},
		cajero: {
			defaultPath: `${ROUTES.QUOTE_SHOPS}/${shop}`,
			allowedPaths: [
				`${ROUTES.QUOTE_SHOPS}/${shop}`,
				ROUTES.QUOTE_DETAIL,
				`${ROUTES.BILLING_SHOPS}/${shop}`,
				ROUTES.BILLING_DETAIL,
				ROUTES.STOCK,
				ROUTES.STOCK_TRANSACTIONS
			]
		},
		bodeguero: {
			defaultPath: ROUTES.PRODUCTS,
			allowedPaths: [ROUTES.PRODUCTS, ROUTES.STOCK, ROUTES.STOCK_TRANSACTIONS]
		}
	};
};
