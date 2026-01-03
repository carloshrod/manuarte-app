'use client';
import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Radio, Select } from 'antd';
import FormButtons from '../../common/ui/FormButtons';
import { useModalStore } from '@/stores/modalStore';
import { formatCurrency } from '@/utils/formats';
import useCustomerService from '@/services/customer';
import useForm from '@/hooks/useForm';
import { useSelector } from 'react-redux';
import {
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS
} from '../../consts';

const { TextArea } = Input;

type ActionType = 'credit' | 'debit';

const CREDIT_CATEGORIES = [
	{ label: 'Abono', value: 'ADVANCE_PAYMENT' },
	{ label: 'Reembolso', value: 'REFUND' },
	{ label: 'Ajuste', value: 'ADJUSTMENT' },
	{ label: 'Otro', value: 'OTHER' }
];

const DEBIT_CATEGORIES = [
	{ label: 'Pago aplicado', value: 'PAYMENT_APPLIED' },
	{ label: 'Ajuste', value: 'ADJUSTMENT' },
	{ label: 'Otro', value: 'OTHER' }
];

const BalanceForm = () => {
	const { form, isLoading } = useForm();
	const { dataToHandle, closeModal } = useModalStore.getState();
	const isFromQuote = !!dataToHandle?.quoteId;
	const [actionType, setActionType] = useState<ActionType>('credit');
	const { fetchBalance, addMovement } = useCustomerService();
	const { balance } = useSelector((state: RootState) => state.customer);

	useEffect(() => {
		fetchBalance(dataToHandle?.id, dataToHandle?.currency);
	}, []);

	const onFinish = async (values: any) => {
		try {
			const body = {
				...values,
				currency: dataToHandle?.currency,
				shopId: dataToHandle?.shopId
			};

			await addMovement(actionType, dataToHandle?.id, body);
		} catch (error) {
			console.error(error);
		} finally {
			closeModal();
		}
	};

	const handleActionTypeChange = (value: ActionType) => {
		setActionType(value);
		form.resetFields(['category']);
		form.setFieldValue(
			'category',
			value === 'credit' ? 'ADVANCE_PAYMENT' : 'PAYMENT_APPLIED'
		);
	};

	const categoryOptions = isFromQuote
		? [{ label: 'Pago anticipado', value: 'ADVANCE_PAYMENT' }]
		: actionType === 'credit'
			? CREDIT_CATEGORIES
			: DEBIT_CATEGORIES;

	const paymentMethodOptions =
		dataToHandle?.currency === 'COP'
			? COL_PAYMENT_METHOD_OPTIONS
			: ECU_PAYMENT_METHOD_OPTIONS;

	return (
		<div>
			<div className='py-4'>
				<div>
					<span>Saldo a favor:</span>
					<span className='px-3 py-1 rounded font-semibold text-[#10b981]'>
						{formatCurrency(balance)}
					</span>
				</div>

				{isFromQuote && dataToHandle?.total && (
					<div>
						<span>Total cotización:</span>
						<span className='px-3 py-1 rounded font-semibold'>
							{formatCurrency(dataToHandle?.total)}
						</span>
					</div>
				)}

				{isFromQuote && dataToHandle?.total && (
					<div>
						<span>Faltante:</span>
						<span className='px-3 py-1 rounded font-semibold text-[#f59e0b]'>
							{formatCurrency(Math.max(0, dataToHandle.total - balance))}
						</span>
					</div>
				)}
			</div>

			<Form.Item label='Tipo de operación' className='!pt-4'>
				<Radio.Group
					value={actionType}
					onChange={e => handleActionTypeChange(e.target.value)}
					buttonStyle='solid'
				>
					<Radio.Button value='credit'>Crédito</Radio.Button>
					{!isFromQuote && <Radio.Button value='debit'>Débito</Radio.Button>}
				</Radio.Group>
			</Form.Item>

			<Form
				form={form}
				layout='vertical'
				onFinish={onFinish}
				initialValues={{
					category: 'ADVANCE_PAYMENT'
				}}
			>
				<div className='flex gap-4'>
					<Form.Item
						label='Monto'
						name='amount'
						rules={[
							{ required: true, message: 'El monto es requerido' },
							{
								type: 'number',
								min: 0.01,
								message: 'El monto debe ser mayor a 0'
							}
						]}
						className='!flex-1'
					>
						<InputNumber
							style={{ width: '100%' }}
							placeholder='Ingrese el monto'
							formatter={value =>
								`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={value => value!.replace(/\$\s?|(,*)/g, '')}
						/>
					</Form.Item>

					<Form.Item
						label='Categoría'
						name='category'
						rules={[{ required: true, message: 'La categoría es requerida' }]}
						className='!flex-1'
					>
						<Select
							placeholder='Seleccione una categoría'
							options={categoryOptions}
						/>
					</Form.Item>
				</div>

				<Form.Item
					name='paymentMethod'
					label='Métodos de Pago:'
					rules={[
						{
							required: true,
							message: 'Al menos un método de pago es requerido'
						}
					]}
				>
					<Select
						options={paymentMethodOptions}
						placeholder='Seleccionar método de pago...'
					/>
				</Form.Item>

				<Form.Item
					label='Comentarios'
					name='comments'
					rules={[
						{
							required: !isFromQuote,
							message: 'Los comentarios son requeridos'
						}
					]}
				>
					<TextArea
						rows={4}
						placeholder='Ingrese comentarios sobre esta transacción'
						maxLength={500}
						showCount
					/>
				</Form.Item>

				<FormButtons
					label={actionType === 'credit' ? 'Agregar' : 'Debitar'}
					isLoading={isLoading}
					onSubmit={() => form.submit()}
				/>
			</Form>
		</div>
	);
};

export default BalanceForm;
