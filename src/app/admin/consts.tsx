import Link from 'next/link';
import { GrDashboard } from 'react-icons/gr';
import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree, PiInvoice } from 'react-icons/pi';
import { TbFileDollar, TbLogout2 } from 'react-icons/tb';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GiCardboardBox } from 'react-icons/gi';
import { RiExchangeBoxLine } from 'react-icons/ri';

export const menuItems = [
	{
		key: '1',
		icon: <GrDashboard size={20} />,
		label: <Link href='/admin/dashboard'>Dashboard</Link>
	},
	{
		key: '2',
		icon: <BsBoxes size={20} />,
		label: <Link href='/admin/products'>Productos</Link>
	},
	{
		key: '3',
		icon: <PiUsersThree size={20} />,
		label: <Link href='/admin/users'>Users</Link>
	},
	{
		key: '4',
		icon: <IoStorefrontOutline size={20} />,
		label: <Link href='/admin/stores'>Tiendas</Link>
	},
	{
		key: '5',
		icon: <TbFileDollar size={20} />,
		label: <Link href='/admin/quotes'>Cotizaciones</Link>
	},
	{
		key: '6',
		icon: <PiInvoice size={20} />,
		label: <Link href='/admin/invoices'>Facturas</Link>
	},
	{
		key: '7',
		icon: <GiCardboardBox size={20} />,
		label: <Link href='/admin/stock'>Stock</Link>
	},
	{
		key: '8',
		icon: <RiExchangeBoxLine size={20} />,
		label: <Link href='/admin/stock-transfers'>Despachos</Link>
	},
	{
		key: '9',
		icon: <TbLogout2 size={20} />,
		label: 'Cerrar sesión',
		onClick: () => console.log('Saliendo!!!')
	}
];
