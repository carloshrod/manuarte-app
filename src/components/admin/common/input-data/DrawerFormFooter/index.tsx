import { Form, FormInstance, Select } from 'antd';
import { ReactNode } from 'react';
import PaymentAmounts from '../PaymentAmounts';
import {
	BILLING_STATUS_OPTIONS,
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS,
	QUOTE_STATUS_OPTIONS
} from '@/components/admin/consts';
import { BillingStatus } from '@/types/enums';

interface DrawerFormFooterProps {
	form?: FormInstance;
	isQuote: boolean;
	shopSlug?: string;
	children: ReactNode;
}

const DrawerFormFooter = ({
	form,
	isQuote,
	shopSlug = '',
	children
}: DrawerFormFooterProps) => {
	const statusOptions = isQuote
		? QUOTE_STATUS_OPTIONS
		: BILLING_STATUS_OPTIONS.filter(
				opt => opt.value !== BillingStatus.PARTIAL_PAYMENT
			);

	const paymentMethodOptions = !shopSlug?.includes('quito')
		? COL_PAYMENT_METHOD_OPTIONS
		: ECU_PAYMENT_METHOD_OPTIONS;

	const isPartialPayment =
		form?.getFieldValue('status') === BillingStatus.PARTIAL_PAYMENT;

	return (
		<div className='flex items-start justify-between gap-2 min-[1144px]:me-[36px] mt-8 overflow-x-auto custom-scrollbar'>
			<div className='xl:flex gap-6'>
				<div className='w-[250px]'>
					<Form.Item
						name='status'
						label='Estado'
						layout='horizontal'
						rules={[
							{
								required: true,
								message: 'El estado de la factura es requerido'
							}
						]}
					>
						<Select
							options={
								isPartialPayment
									? [
											{
												value: BillingStatus.PARTIAL_PAYMENT,
												label: 'Pago parcial'
											}
										]
									: statusOptions
							}
						/>
					</Form.Item>
					{!isQuote ? (
						<>
							<Form.Item
								name='selectedMethods'
								label='Métodos de Pago:'
								rules={[
									{
										required: true,
										message: 'Al menos un método de pago es requerido'
									}
								]}
							>
								<Select
									mode='multiple'
									maxCount={3}
									options={paymentMethodOptions}
									placeholder='Selecciona hasta 3...'
								/>
							</Form.Item>
						</>
					) : null}
				</div>

				{!isQuote && form ? (
					<div className='w-[250px]'>
						<PaymentAmounts
							form={form}
							paymentMethodOptions={paymentMethodOptions}
						/>
					</div>
				) : null}
			</div>

			<div>{children}</div>
		</div>
	);
};

export default DrawerFormFooter;
