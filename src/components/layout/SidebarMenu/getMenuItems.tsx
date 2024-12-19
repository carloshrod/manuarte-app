import Link from 'next/link';
import { GrDashboard } from 'react-icons/gr';
import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree, PiInvoice } from 'react-icons/pi';
import { TbFileDollar, TbLogout2 } from 'react-icons/tb';
import { GiCardboardBox } from 'react-icons/gi';
import { RiExchangeBoxLine } from 'react-icons/ri';
import { Session } from 'next-auth';
import { AUTH_RULES } from '@/utils/utils';

const getMenuItems = (session: Session) => {
	const { user } = session ?? {};
	const roleName = user?.roleName as string;
	const extraPermissions = user?.extraPermissions as string[];

	const roleRules = AUTH_RULES[roleName] || { allowedPaths: [] };

	const permissionToPathMap: Record<string, string> = {
		'product-read': '/admin/products',
		'estimate-read': '/admin/quotes',
		'billing-read': '/admin/invoices',
		'stock-read': '/admin/stock',
		'transaction-read': '/admin/stock-transfers',
		'user-read': '/admin/users',
		'customer-read': '/admin/users',
		'dashboard-read': '/admin/dashboard'
	};

	const allMenuItems = [
		{
			key: '1',
			icon: <GrDashboard style={{ fontSize: 20 }} />,
			label: <Link href='/admin/dashboard'>Dashboard</Link>,
			path: '/admin/dashboard'
		},
		{
			key: '2',
			icon: <BsBoxes style={{ fontSize: 20 }} />,
			label: <Link href='/admin/products'>Productos</Link>,
			path: '/admin/products'
		},
		{
			key: '3',
			icon: <PiUsersThree style={{ fontSize: 20 }} />,
			label: <Link href='/admin/users'>Users</Link>,
			path: '/admin/users'
		},
		{
			key: '4',
			icon: <TbFileDollar style={{ fontSize: 20 }} />,
			label: <Link href='/admin/quotes'>Cotizaciones</Link>,
			path: '/admin/quotes'
		},
		{
			key: '5',
			icon: <PiInvoice style={{ fontSize: 20 }} />,
			label: <Link href='/admin/invoices'>Facturas</Link>,
			path: '/admin/invoices'
		},
		{
			key: '6',
			icon: <GiCardboardBox style={{ fontSize: 20 }} />,
			label: <Link href='/admin/stock'>Stock</Link>,
			path: '/admin/stock'
		},
		{
			key: '7',
			icon: <RiExchangeBoxLine style={{ fontSize: 20 }} />,
			label: <Link href='/admin/stock-transfers'>Despachos</Link>,
			path: '/admin/stock-transfers'
		}
	];

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
