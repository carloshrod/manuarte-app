import { useModalStore } from '@/stores/modalStore';
import { Button } from 'antd';
import { useState } from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export type ConfirmOperationProps = {
	confirmTitle: string;
	confirmText?: string;
	onConfirm: () => Promise<void>;
};

const ConfirmOperation = ({
	confirmTitle,
	confirmText = undefined,
	onConfirm
}: ConfirmOperationProps) => {
	const { closeModal } = useModalStore.getState();
	const [loading, setLoading] = useState(false);

	const handleConfirm = async () => {
		setLoading(true);
		await onConfirm();
		setLoading(false);
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='block'>
				<BsFillQuestionCircleFill size={50} className='m-auto text-red-500' />
			</div>
			<div className='px-8'>
				<h3 className='text-center text-xl font-semibold mb-2'>
					{confirmTitle}
				</h3>
				<p className='text-center text-[#404040] font-medium'>{confirmText}</p>
			</div>
			<div className='flex justify-center gap-6 mb-1'>
				<Button
					className='w-[130px]'
					style={{ fontWeight: 600 }}
					color='danger'
					variant='outlined'
					ghost
					onClick={closeModal}
				>
					CANCELAR
				</Button>
				<Button
					className='w-[130px]'
					style={{ fontWeight: 600 }}
					type='primary'
					onClick={handleConfirm}
					loading={loading}
				>
					CONFIRMAR
				</Button>
			</div>
		</div>
	);
};

export default ConfirmOperation;
