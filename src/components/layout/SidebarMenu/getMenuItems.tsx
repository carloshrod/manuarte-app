import Link from 'next/link';
import { GrDashboard } from 'react-icons/gr';
import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree, PiInvoice } from 'react-icons/pi';
import { TbFileDollar, TbLogout2 } from 'react-icons/tb';
import { GiCardboardBox } from 'react-icons/gi';
import { RiExchangeBoxLine } from 'react-icons/ri';
import { Session } from 'next-auth';
import { AUTH_RULES } from '@/utils/utils';
import { ROUTES } from '@/utils/routes';

const {
	DASHBOARD,
	PRODUCTS,
	USERS,
	QUOTE_SHOPS,
	INVOICES,
	STOCK,
	STOCK_TRANSACTIONS
} = ROUTES;

const getMenuItems = (session: Session) => {
	const { user } = session ?? {};
	const roleName = user?.roleName as string;
	const extraPermissions = user?.extraPermissions as string[];

	const roleRules = AUTH_RULES[roleName] || { allowedPaths: [] };

	const permissionToPathMap: Record<string, string> = {
		'dashboard-read': DASHBOARD,
		'product-read': PRODUCTS,
		'user-read': USERS,
		'customer-read': USERS,
		'estimate-read': QUOTE_SHOPS,
		'billing-read': INVOICES,
		'stock-read': STOCK,
		'transaction-read': STOCK_TRANSACTIONS
	};

	const filteredItems = allMenuItems.filter(item => {
		const hasRoleAccess = roleRules.allowedPaths?.includes(item.path);

		const hasExtraPermissionAccess = Object.entries(permissionToPathMap).some(
			([permission, path]) =>
				extraPermissions?.includes(permission) && path === item.path
		);

		return hasRoleAccess || hasExtraPermissionAccess;
	});

	return [
		...filteredItems,
		{
			key: 'logout',
			icon: <TbLogout2 style={{ fontSize: 20 }} />,
			label: 'Cerrar sesión',
			path: ''
		}
	];
};

export default getMenuItems;

export const allMenuItems = [
	{
		key: '1',
		icon: <GrDashboard style={{ fontSize: 20 }} />,
		label: <Link href={DASHBOARD}>Dashboard</Link>,
		path: DASHBOARD
	},
	{
		key: '2',
		icon: <BsBoxes style={{ fontSize: 20 }} />,
		label: <Link href={PRODUCTS}>Productos</Link>,
		path: PRODUCTS
	},
	{
		key: '3',
		icon: <PiUsersThree style={{ fontSize: 20 }} />,
		label: <Link href={USERS}>Usuarios</Link>,
		path: USERS
	},
	{
		key: '4',
		icon: <TbFileDollar style={{ fontSize: 20 }} />,
		label: <Link href={QUOTE_SHOPS}>Cotizaciones</Link>,
		path: QUOTE_SHOPS
	},
	{
		key: '5',
		icon: <PiInvoice style={{ fontSize: 20 }} />,
		label: <Link href={INVOICES}>Facturas</Link>,
		path: INVOICES
	},
	{
		key: '6',
		icon: <GiCardboardBox style={{ fontSize: 20 }} />,
		label: <Link href={STOCK}>Stock</Link>,
		path: STOCK
	},
	{
		key: '7',
		icon: <RiExchangeBoxLine style={{ fontSize: 20 }} />,
		label: <Link href={STOCK_TRANSACTIONS}>Despachos</Link>,
		path: STOCK_TRANSACTIONS
	}
];
