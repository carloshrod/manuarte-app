import { calculateTotalPayment } from '@/components/admin/utils';
import { useModalStore } from '@/stores/modalStore';
import { BillingStatus } from '@/types/enums';
import {
	formatCurrency,
	formatDate,
	formatInputCurrency,
	normalizeAmount
} from '@/utils/formats';
import { Form, FormInstance, InputNumber, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

interface PaymentAmountsProps {
	form: FormInstance;
	paymentMethodOptions: {
		value: string;
		label: string;
	}[];
	isPreOrder?: boolean;
	isPaid?: boolean;
}

const PaymentAmounts = ({
	form,
	paymentMethodOptions,
	isPreOrder = false,
	isPaid = false
}: PaymentAmountsProps) => {
	const { dataToHandle } = useModalStore.getState();
	const { balance } = useSelector((state: RootState) => state.customer);
	const [difference, setDifference] = useState<number | null>(null);

	const selectedMethods = Form.useWatch('selectedMethods', form);
	const paymentList = Form.useWatch('payments', form) || [];

	useEffect(() => {
		if (!selectedMethods) return;

		const newList = selectedMethods.map((paymentMethod: string) => {
			const existing = paymentList?.find(
				(p: any) => p.paymentMethod === paymentMethod
			);
			return existing || { paymentMethod, amount: 0 };
		});

		form.setFieldsValue({ payments: newList });
	}, [selectedMethods]);

	const total = Form.useWatch('total', form) || 0;
	const existingPayments = dataToHandle?.payments || [];

	const status = Form.useWatch('status', form);
	const isPartialPayment = status === BillingStatus.PARTIAL_PAYMENT;

	useEffect(() => {
		handleAmountChange();
	}, [total, balance, paymentList?.length, existingPayments.length]);

	const handleAmountChange = () => {
		const payments = form.getFieldValue('payments') || [];
		const totalPayment = calculateTotalPayment([
			...payments,
			...existingPayments
		]);

		// Usar automáticamente el saldo disponible siempre que haya
		const balanceToUse = Math.min(
			normalizeAmount(total),
			normalizeAmount(balance)
		);

		// Actualizar el campo balanceToUse en el formulario
		form.setFieldsValue({ balanceToUse });

		// Calcular cuánto queda por pagar después de aplicar el balance
		const remainingAfterBalance = normalizeAmount(total) - balanceToUse;

		// Calcular diferencia final (lo que falta o excede después de los pagos)
		const newDifference = remainingAfterBalance - normalizeAmount(totalPayment);
		setDifference(newDifference);

		if (status === BillingStatus.PAID) return;

		if (isPreOrder) {
			if (newDifference > 0) {
				form.setFieldsValue({
					status: BillingStatus.PARTIAL_PAYMENT
				});
			}
			if (newDifference === 0) {
				form.setFieldsValue({
					status: BillingStatus.PENDING_DELIVERY
				});
			}
		} else {
			form.setFieldsValue({
				status: BillingStatus.PAID
			});
		}
	};

	const getDifferenceMessage = () => {
		if (difference === null) return;

		if (difference > 0) {
			return `Saldo $${difference.toLocaleString()}`;
		}

		if (difference < 0) {
			return `Monto excedido por $${Math.abs(difference).toLocaleString()}`;
		}

		return 'Monto exacto';
	};

	return (
		<>
			{!isPaid && balance > 0 && (
				<div className='text-end text-[14px] font-medium pe-3 pb-2'>
					<span className='text-[#10b981]'>
						Saldo a favor {formatCurrency(balance)}
					</span>
				</div>
			)}

			{!isPaid && difference !== null && total > 0 && (
				<div
					className={`text-end text-[14px] font-medium pe-3 pb-4 ${
						difference === 0
							? 'text-[#10b981]'
							: difference > 0
								? 'text-[#0D6EFD]'
								: 'text-[#E53535]'
					}`}
				>
					{getDifferenceMessage()}
				</div>
			)}

			<Form.Item name='balanceToUse' hidden initialValue={0}>
				<InputNumber />
			</Form.Item>

			{selectedMethods?.length ? (
				<Form.Item
					name='payments'
					layout='horizontal'
					rules={[
						{
							validator: async (_, value) => {
								const total = form.getFieldValue('total') || 0;
								const balanceToUse = form.getFieldValue('balanceToUse') || 0;
								const totalPayment = calculateTotalPayment([
									...value,
									...existingPayments
								]);
								const allAmountsGreaterThanZero = value.every(
									(item: any) => item.amount > 0
								);
								if (!allAmountsGreaterThanZero) {
									throw new Error(
										'Todos los montos deben tener un valor mayor a cero, de lo contrario elimine el método de pago'
									);
								}

								if (isPartialPayment) {
									return Promise.resolve();
								}

								const totalWithBalance =
									normalizeAmount(totalPayment) + normalizeAmount(balanceToUse);
								if (totalWithBalance !== normalizeAmount(total)) {
									throw new Error(
										`La suma de los montos y balance ($${totalWithBalance.toLocaleString()}) debe ser igual al total ($${total.toLocaleString()})`
									);
								}
							}
						}
					]}
					style={{ marginBottom: 0 }}
				>
					<Form.List name='payments'>
						{fields => (
							<>
								{fields.map(({ key, name, ...restField }) => {
									const methodValue = form.getFieldValue([
										'payments',
										name,
										'paymentMethod'
									]);
									const methodOption = paymentMethodOptions.find(
										item => item.value === methodValue
									);

									return (
										<div key={key}>
											<Form.Item
												{...restField}
												name={[name, 'paymentMethod']}
												noStyle
												hidden
											>
												<InputNumber disabled hidden />
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, 'amount']}
												label={methodOption?.label}
												labelCol={{ span: 13 }}
												layout='horizontal'
												rules={[
													{ required: true, message: 'Ingresa monto' },
													{
														validator: (_, value) =>
															value > 0
																? Promise.resolve()
																: Promise.reject(new Error())
													}
												]}
											>
												<InputNumber
													min={0}
													placeholder='Monto'
													style={{ width: '100%' }}
													controls={false}
													formatter={value => formatInputCurrency(value)}
													className='textRight'
													onChange={handleAmountChange}
												/>
											</Form.Item>
										</div>
									);
								})}
							</>
						)}
					</Form.List>
				</Form.Item>
			) : null}

			{existingPayments?.length > 0 ? (
				<div className='flex flex-col'>
					{existingPayments?.map((payment: Payment, index: number) => {
						const methodOption = paymentMethodOptions.find(
							item => item.value === payment.paymentMethod
						);

						return (
							<div key={payment.paymentMethod + index} className='relative'>
								<Form.Item
									label={methodOption?.label}
									labelCol={{ span: 13 }}
									layout='horizontal'
								>
									<InputNumber
										value={payment.amount}
										variant='borderless'
										style={{ width: '100%', backgroundColor: '#e5e5e5' }}
										formatter={value => formatInputCurrency(value)}
										className='textRight'
										readOnly
									/>
								</Form.Item>

								<Tooltip
									title={formatDate(payment.createdDate)}
									className='absolute -right-5 top-2'
								>
									<span>
										<IoInformationCircleOutline size={18} />
									</span>
								</Tooltip>
							</div>
						);
					})}
				</div>
			) : null}
		</>
	);
};

export default PaymentAmounts;
