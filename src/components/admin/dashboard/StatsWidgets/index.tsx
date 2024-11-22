import { STATS_WIDGETS_PROPS } from '@/components/admin/dashboard/consts';

type Stats = {
	productVariantsCount: number;
	customersCount: number;
};

interface StatsWidgetsProps {
	stats: Stats;
}

const StatsWidgets = ({ stats }: StatsWidgetsProps) => {
	return STATS_WIDGETS_PROPS.map(({ icon, quantity, label, data }) => (
		<div key={label} className='p-4 lg:w-1/4 sm:w-1/2 w-full'>
			<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-6 rounded-lg transform transition duration-500 hover:scale-110'>
				{icon}
				<h2 className='title-font font-medium text-3xl text-gray-900'>
					{data ? stats[data as keyof Stats] : quantity}
				</h2>
				<p className='leading-relaxed'>{label}</p>
			</div>
		</div>
	));
};

export default StatsWidgets;
