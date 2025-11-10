import Link from 'next/link';
import { GrDashboard } from 'react-icons/gr';
import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree, PiInvoice, PiChartLineUpBold } from 'react-icons/pi';
import { TbFileDollar, TbLogout2 } from 'react-icons/tb';
import { GiCardboardBox } from 'react-icons/gi';
import { RiExchangeBoxLine, RiUserSettingsLine } from 'react-icons/ri';
import { Session } from 'next-auth';
import { AUTH_RULES } from '@/utils/auth';
import { ROUTES } from '@/utils/routes';

const {
	DASHBOARD,
	PRODUCTS,
	STAFF,
	CUSTOMERS,
	QUOTE_SHOPS,
	BILLING_SHOPS,
	STOCKS,
	TRANSACTIONS,
	FINANCIAL_FLOW_SHOPS
} = ROUTES;

const getMenuItems = (session: Session) => {
	const { user } = session ?? {};
	const roleName = user?.roleName as string;
	const shop = user?.shop as string;
	const mainStock = user?.mainStock;
	const extraPermissions = user?.extraPermissions as string[];

	const roleRules = AUTH_RULES(shop)[roleName] || { allowedPaths: [] };

	const permissionToPathMap: Record<string, string> = {
		'product-read': PRODUCTS,
		'customer-read': CUSTOMERS
	};

	const filteredItems = allMenuItems(shop, mainStock).filter(item => {
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
			label: 'Cerrar Sesión',
			path: ''
		}
	];
};

export default getMenuItems;

export const allMenuItems = (shop?: string, mainStock?: boolean) => {
	const QUOTE_PATH = !shop ? QUOTE_SHOPS : `${QUOTE_SHOPS}/${shop}`;
	const BILLING_PATH = !shop ? BILLING_SHOPS : `${BILLING_SHOPS}/${shop}`;
	const STOCK_PATH = !shop ? STOCKS : `${STOCKS}/${shop}`;
	const FINANCIAL_FLOW_PATH = !shop
		? FINANCIAL_FLOW_SHOPS
		: `${FINANCIAL_FLOW_SHOPS}/${shop}`;

	return [
		{
			key: '1',
			icon: <GrDashboard style={{ fontSize: 20 }} />,
			label: <Link href={DASHBOARD}>Dashboard</Link>,
			path: DASHBOARD
		},
		{
			key: '2',
			icon: <BsBoxes style={{ fontSize: 20 }} />,
			label: (
				<Link
					href={{
						pathname: PRODUCTS,
						query: { page: 1, pageSize: 30 }
					}}
				>
					Productos
				</Link>
			),
			path: PRODUCTS
		},
		{
			key: '3',
			icon: <RiUserSettingsLine style={{ fontSize: 20 }} />,
			label: <Link href={STAFF}>Staff</Link>,
			path: STAFF
		},
		{
			key: '4',
			icon: <PiUsersThree style={{ fontSize: 20 }} />,
			label: <Link href={CUSTOMERS}>Clientes</Link>,
			path: CUSTOMERS
		},
		{
			key: '5',
			icon: <TbFileDollar style={{ fontSize: 20 }} />,
			label: <Link href={QUOTE_PATH}>Cotizaciones</Link>,
			path: QUOTE_PATH
		},
		{
			key: '6',
			icon: <PiInvoice style={{ fontSize: 20 }} />,
			label: <Link href={BILLING_PATH}>Facturas</Link>,
			path: BILLING_PATH
		},
		{
			key: '7',
			icon: <GiCardboardBox style={{ fontSize: 20 }} />,
			label: (
				<Link
					href={{
						pathname: STOCK_PATH,
						query: mainStock ? { main: true } : undefined
					}}
				>
					Stock
				</Link>
			),
			path: STOCK_PATH
		},
		{
			key: '8',
			icon: <RiExchangeBoxLine style={{ fontSize: 20 }} />,
			label: <Link href={TRANSACTIONS}>Movimientos Stock</Link>,
			path: TRANSACTIONS
		},
		{
			key: '9',
			icon: <PiChartLineUpBold style={{ fontSize: 20 }} />,
			label: <Link href={FINANCIAL_FLOW_PATH}>Flujo Financiero</Link>,
			path: FINANCIAL_FLOW_PATH
		}
	];
};
