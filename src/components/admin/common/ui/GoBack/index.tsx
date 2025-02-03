'use client';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

const GoBack = () => {
	const router = useRouter();

	return (
		<Button
			shape='circle'
			variant='filled'
			color='primary'
			onClick={() => router.back()}
		>
			<IoChevronBack size={24} />
		</Button>
	);
};

export default GoBack;
