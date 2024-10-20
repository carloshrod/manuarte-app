import { WIDGET_PROPS } from './consts';

const DashboardPage = () => {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold px-4'>Dashboard</h2>
			<div className='flex flex-wrap text-center'>
				{WIDGET_PROPS.map(({ icon, quantity, label }) => (
					<div key={label} className='p-4 lg:w-1/4 sm:w-1/2 w-full'>
						<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] py-6 rounded-lg transform transition duration-500 hover:scale-110'>
							{icon}
							<h2 className='title-font font-medium text-3xl text-gray-900'>
								{quantity}
							</h2>
							<p className='leading-relaxed'>{label}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default DashboardPage;
