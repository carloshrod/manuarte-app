import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree, PiInvoice } from 'react-icons/pi';
import { TbFileDollar } from 'react-icons/tb';

export const WIDGET_PROPS = [
	{
		icon: (
			<BsBoxes
				size={40}
				className='text-emerald-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		quantity: '250',
		label: 'Productos'
	},
	{
		icon: (
			<PiUsersThree
				size={40}
				className='text-yellow-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		quantity: '185',
		label: 'Clientes'
	},
	{
		icon: (
			<PiInvoice
				size={40}
				className='text-red-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		quantity: '320',
		label: 'Facturas emitidas'
	},
	{
		icon: (
			<TbFileDollar
				size={40}
				className='text-indigo-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		quantity: '124',
		label: 'Cotizaciones'
	}
];
