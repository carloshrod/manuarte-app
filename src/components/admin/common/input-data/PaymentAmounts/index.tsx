import { useModalStore } from '@/stores/modalStore';
import { formatInputCurrency } from '@/utils/formats';
import { Form, FormInstance, InputNumber } from 'antd';
import { useEffect, useState } from 'react';

interface PaymentAmountsProps {
	form: FormInstance;
	paymentMethodOptions: {
		value: string;
		label: string;
	}[];
}

const PaymentAmounts = ({
	form,
	paymentMethodOptions
}: PaymentAmountsProps) => {
	const { dataToHandle } = useModalStore.getState();
	const [debouncedDifference, setDebouncedDifference] = useState(0);

	const selectedMethods = Form.useWatch('selectedMethods', form);
	const paymentList = Form.useWatch('payments', form) || [];
	const paymentListData =
		dataToHandle && dataToHandle?.payments?.length > 0
			? dataToHandle?.payments
			: paymentList;

	const calculateTotalPayment = (payments: any[]) =>
		payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

	useEffect(() => {
		if (!selectedMethods) return;

		const newList = selectedMethods.map((paymentMethod: string) => {
			const existing = paymentListData?.find(
				(p: any) => p.paymentMethod === paymentMethod
			);
			return existing || { paymentMethod, amount: 0 };
		});

		form.setFieldsValue({ payments: newList });
	}, [selectedMethods]);

	const total = Form.useWatch('total', form) || 0;
	const currentPayments = Form.useWatch('payments', form) || [];
	const totalPayment = calculateTotalPayment(currentPayments);
	const difference = total - totalPayment;

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedDifference(difference);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [difference]);

	const getDifferenceMessage = () => {
		if (debouncedDifference > 0) {
			return `Saldo $${debouncedDifference.toLocaleString()}`;
		}
		if (debouncedDifference < 0) {
			return `Monto excedido por $${Math.abs(debouncedDifference).toLocaleString()}`;
		}
		return 'Monto exacto';
	};

	return selectedMethods?.length > 0 ? (
		<>
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

			<Form.Item
				name='payments'
				layout='horizontal'
				rules={[
					{
						validator: async (_, value) => {
							const total = form.getFieldValue('total') || 0;
							const totalPayment = calculateTotalPayment(value);
							const allAmountsGreaterThanZero = value.every(
								(item: any) => item.amount > 0
							);

							if (totalPayment !== total) {
								throw new Error(
									`La suma de los montos ($${totalPayment.toLocaleString()}) debe ser igual al total ($${total.toLocaleString()})`
								);
							}

							if (!allAmountsGreaterThanZero) {
								throw new Error(
									'Todos los montos deben tener un valor mayor a cero, de lo contrario elimine el método de pago'
								);
							}
						}
					}
				]}
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
		</>
	) : null;
};

export default PaymentAmounts;
