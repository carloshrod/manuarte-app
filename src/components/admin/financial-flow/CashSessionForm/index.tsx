import useForm from '@/hooks/useForm';
import { formatCurrency, formatInputCurrency } from '@/utils/formats';
import { Form, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import { useModalStore } from '@/stores/modalStore';
import { CurrentCashSessionStatus, ModalContent } from '@/types/enums';

const CashSessionForm = ({ shopId }: { shopId: string }) => {
	const {
		currentCashSession: { status, canOpen, balance, accumulatedDifference }
	} = useSelector((state: RootState) => state.financialFlow);

	const { form, isLoading, submitOpenCashSession, submitCloseCashSession } =
		useForm();

	const onFinish = async (values: {
		declaredOpeningAmount: number;
		declaredClosingAmount: number;
		comments?: string;
	}) => {
		const { openModal } = useModalStore.getState();

		openModal({
			content: ModalContent.confirm,
			componentProps: {
				confirmTitle: `¿Estás seguro que quieres ${canOpen ? 'abrir' : 'cerrar'} la caja?`,
				confirmText: !canOpen
					? 'No podrás volver a abrirla hasta mañana'
					: undefined,
				onConfirm: async () => {
					canOpen
						? await submitOpenCashSession(values, shopId)
						: await submitCloseCashSession(values, shopId);
				}
			}
		});
	};

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			clearOnDestroy
			onFinish={onFinish}
		>
			{status === CurrentCashSessionStatus.FIRST_SESSION && (
				<div className='text-gray-400 font-semibold italic my-4'>
					Primera apertura de caja
				</div>
			)}

			{balance ? (
				canOpen ? (
					<div className='my-4'>
						Monto inicial:{' '}
						<span
							className={`'font-semibold' ${balance > 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
						>
							{formatCurrency(balance ?? 0)}
						</span>
					</div>
				) : (
					<div className='flex flex-col gap-4 my-4'>
						<div>
							Monto de cierre:{' '}
							<span
								className={`'font-semibold' ${balance > 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
							>
								{formatCurrency(balance ?? 0)}
							</span>
						</div>
					</div>
				)
			) : null}

			{accumulatedDifference && (
				<>
					<div className='my-4'>
						Diferencia acumulada:{' '}
						<span
							className={`'font-semibold' ${accumulatedDifference >= 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
						>
							{formatCurrency(accumulatedDifference ?? 0)}
						</span>
					</div>

					<div className='my-4'>
						Monto esperado:{' '}
						<span className='font-semibold text-[#0D6EFD]'>
							{formatCurrency(
								Number(balance) + Number(accumulatedDifference * -1)
							)}
						</span>
					</div>
				</>
			)}

			<div className='w-full flex gap-6'>
				<div className='w-full flex items-end gap-2 justify-between'>
					<Form.Item
						name={canOpen ? 'declaredOpeningAmount' : 'declaredClosingAmount'}
						label={`Monto ${canOpen ? 'Inicial' : 'de Cierre'} Declarado`}
						rules={[
							{
								required: true,
								message: 'Requerido'
							}
						]}
						style={{ width: '45%' }}
					>
						<InputNumber
							min={0}
							controls={false}
							placeholder='Ingresa el monto'
							formatter={value => formatInputCurrency(value)}
							className='textRight'
							style={{ width: '100%' }}
						/>
					</Form.Item>

					<div className='text-[#0D6EFD] mb-6'>
						Asegurate de contar el dinero en la caja
					</div>
				</div>

				{canOpen && status === CurrentCashSessionStatus.FIRST_SESSION && (
					<Form.Item
						name='initialPiggyBankAmount'
						label='Monto Inicial de la Alcancía'
						rules={[
							{
								required: true,
								message: 'Requerido'
							}
						]}
						style={{ width: '50%' }}
					>
						<InputNumber
							min={0}
							controls={false}
							placeholder='Ingresa el monto'
							formatter={value => formatInputCurrency(value)}
							className='textRight'
							style={{ width: '100%' }}
						/>
					</Form.Item>
				)}
			</div>

			<Form.Item name='comments' label='Comentarios'>
				<TextArea rows={2} />
			</Form.Item>

			<FormButtons isLoading={isLoading} label={canOpen ? 'Abrir' : 'Cerrar'} />
		</Form>
	);
};

export default CashSessionForm;
