import { BsBoxes } from 'react-icons/bs';
import { PiUsersThree } from 'react-icons/pi';
import FlagCol from './Flags/FlagCol';
import FlagEcu from './Flags/FlagEcu';

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
			<div className='flex justify-center items-center gap-4'>
				<PiUsersThree
					size={40}
					className='text-yellow-500 w-12 h-12 mb-3 inline-block'
				/>
				<FlagCol />
			</div>
		),
		label: 'Clientes Activos',
		data: 'customersCountCO'
	},
	{
		icon: (
			<div className='flex justify-center items-center gap-4'>
				<PiUsersThree
					size={40}
					className='text-yellow-500 w-12 h-12 mb-3 inline-block'
				/>
				<FlagEcu />
			</div>
		),
		label: 'Clientes Activos',
		data: 'customersCountEC'
	}
];
