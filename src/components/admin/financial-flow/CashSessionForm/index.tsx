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
		currentCashSession: { status, canOpen, balance }
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
					<div className='my-4'>
						Monto de cierre:{' '}
						<span
							className={`'font-semibold' ${balance > 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
						>
							{formatCurrency(balance ?? 0)}
						</span>
					</div>
				)
			) : null}

			<div className='flex gap-6'>
				<Form.Item
					name={canOpen ? 'declaredOpeningAmount' : 'declaredClosingAmount'}
					label={`Monto ${canOpen ? 'Inicial' : 'de Cierre'} Declarado`}
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
				{/* TODO: Recordarle al cajero que cuente la plata */}
				{/* TODO: Mostrar si hay un faltante o diferencia en caja */}
				{/* TODO: Mostrar monto que se retiró de la alcancía */}

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
