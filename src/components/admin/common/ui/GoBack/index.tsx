'use client';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

const GoBack = () => {
	const router = useRouter();

	return (
		<Button
			icon={<IoChevronBack size={24} />}
			shape='circle'
			variant='filled'
			color='primary'
			style={{ padding: 8 }}
			onClick={() => router.back()}
		/>
	);
};

export default GoBack;
