import useForm from '@/hooks/useForm';
import { formatCurrency, formatInputCurrency } from '@/utils/formats';
import { Form, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import { useModalStore } from '@/stores/modalStore';
import { ModalContent } from '@/types/enums';

const CashSessionForm = ({ shopId }: { shopId: string }) => {
	const {
		currentCashSession: { canOpen, initialAmount, balance }
	} = useSelector((state: RootState) => state.cashSession);

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
			{canOpen ? (
				<div className='my-4'>
					Monto inicial:{' '}
					<span
						className={`'font-semibold' ${initialAmount > 0 ? 'text-[#10b981]' : 'text-[#E53535]'}`}
					>
						{formatCurrency(initialAmount ?? 0)}
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
			)}

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

			<Form.Item name='comments' label='Comentarios'>
				<TextArea rows={2} />
			</Form.Item>

			<FormButtons isLoading={isLoading} label={canOpen ? 'Abrir' : 'Cerrar'} />
		</Form>
	);
};

export default CashSessionForm;
