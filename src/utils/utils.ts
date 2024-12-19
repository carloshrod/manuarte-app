export const formatRoleName = (roleName: string) => {
	return `${roleName?.charAt(0).toUpperCase()}${roleName?.slice(1)}` || '';
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

export const AUTH_RULES: Record<
	string,
	{ defaultPath: string; allowedPaths: string[] }
> = {
	admin: {
		defaultPath: '/admin/dashboard',
		allowedPaths: [
			'/admin/dashboard',
			'/admin/products',
			'/admin/users',
			'/admin/quotes',
			'/admin/invoices',
			'/admin/stock',
			'/admin/stock-transfers'
		]
	},
	cajero: {
		defaultPath: '/admin/quotes',
		allowedPaths: [
			'/admin/quotes',
			'/admin/invoices',
			'/admin/stock',
			'/admin/stock-transfers'
		]
	},
	bodeguero: {
		defaultPath: '/admin/products',
		allowedPaths: ['/admin/products', '/admin/stock', '/admin/stock-transfers']
	}
};
