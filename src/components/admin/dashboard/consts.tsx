import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree } from 'react-icons/pi';

export const STATS_WIDGETS_PROPS = [
	{
		icon: (
			<BsBoxes
				size={40}
				className='text-emerald-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		label: 'Productos Activos',
		data: 'productVariantsCount'
	},
	{
		icon: (
			<PiUsersThree
				size={40}
				className='text-yellow-500 w-12 h-12 mb-3 inline-block'
			/>
		),
		label: 'Clientes Activos',
		data: 'customersCount'
	}
];
