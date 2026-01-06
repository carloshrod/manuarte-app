'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { STATS_WIDGETS_PROPS } from '@/components/admin/dashboard/consts';

export type Counts = {
	productVariantsCount: number;
	customersCount: number;
};

interface StatsWidgetsProps {
	counts: Counts;
}

const StatsWidgets = ({ counts }: StatsWidgetsProps) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return STATS_WIDGETS_PROPS.map(({ icon, label, data }) => (
		<div key={data} className='p-4 lg:w-1/3 sm:w-1/2 w-full'>
			<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-6 rounded-lg transform transition duration-300 hover:scale-105'>
				{
					<>
						{icon}
						{!isLoading ? (
							<h4 className='title-font font-medium text-3xl text-gray-900'>
								{counts ? counts[data as keyof Counts] : 0}
							</h4>
						) : (
							<div>
								<Skeleton.Node style={{ width: 100, height: 36 }} active />
							</div>
						)}
						<p className='leading-relaxed'>{label}</p>
					</>
				}
			</div>
		</div>
	));
};

export default StatsWidgets;
