import { calculateTotalPayment } from '@/components/admin/utils';
import { useModalStore } from '@/stores/modalStore';
import { BillingStatus } from '@/types/enums';
import { formatInputCurrency } from '@/utils/formats';
import { Form, FormInstance, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

interface PaymentAmountsProps {
	form: FormInstance;
	paymentMethodOptions: {
		value: string;
		label: string;
	}[];
	isPreOrder?: boolean;
}

const PaymentAmounts = ({
	form,
	paymentMethodOptions,
	isPreOrder = false
}: PaymentAmountsProps) => {
	const { dataToHandle } = useModalStore.getState();
	const [debouncedDifference, setDebouncedDifference] = useState<number | null>(
		null
	);

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
	const newPayments = Form.useWatch('payments', form) || [];
	const totalPayment = calculateTotalPayment([
		...newPayments,
		...existingPayments
	]);
	const difference = total - totalPayment;

	const status = Form.useWatch('status', form);
	const isPartialPayment = status === BillingStatus.PARTIAL_PAYMENT;

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedDifference(difference);
		}, 700);

		if (status === BillingStatus.PAID) return;

		if (isPreOrder) {
			if (difference > 0) {
				form.setFieldsValue({ status: BillingStatus.PARTIAL_PAYMENT });
			}

			if (difference === 0) {
				form.setFieldsValue({ status: BillingStatus.PENDING_DELIVERY });
			}
		} else {
			form.setFieldsValue({ status: BillingStatus.PAID });
		}

		return () => clearTimeout(timeout);
	}, [difference]);

	const getDifferenceMessage = () => {
		if (debouncedDifference === null) return;

		if (debouncedDifference > 0) {
			return `Saldo $${debouncedDifference.toLocaleString()}`;
		}

		if (debouncedDifference < 0) {
			return `Monto excedido por $${Math.abs(debouncedDifference).toLocaleString()}`;
		}

		return 'Monto exacto';
	};

	return (
		<>
			{debouncedDifference !== null && total > 0 && (
				<div
					className={`text-end text-[14px] font-medium pe-3 pb-4 ${
						debouncedDifference === 0
							? 'text-[#10b981]'
							: debouncedDifference > 0
								? 'text-[#0D6EFD]'
								: 'text-[#E53535]'
					}`}
				>
					{getDifferenceMessage()}
				</div>
			)}

			{selectedMethods?.length ? (
				<Form.Item
					name='payments'
					layout='horizontal'
					rules={[
						{
							validator: async (_, value) => {
								const total = form.getFieldValue('total') || 0;
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

								if (totalPayment !== total) {
									throw new Error(
										`La suma de los montos ($${totalPayment.toLocaleString()}) debe ser igual al total ($${total.toLocaleString()})`
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
							<Form.Item
								key={payment.paymentMethod + index}
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
						);
					})}
				</div>
			) : null}
		</>
	);
};

export default PaymentAmounts;
