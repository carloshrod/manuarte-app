import { Form, Select } from 'antd';
import { ReactNode } from 'react';
import {
	FOOTER_PRODUCTS_INPUTS_PROPS,
	BILLING_STATUS_OPTIONS,
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS,
	QUOTE_STATUS_OPTIONS
} from '@/components/admin/consts';

interface DrawerFormFooterProps {
	isQuote: boolean;
	shopSlug?: string;
	children: ReactNode;
}

const DrawerFormFooter = ({
	isQuote,
	shopSlug = '',
	children
}: DrawerFormFooterProps) => {
	const statusOptions = isQuote ? QUOTE_STATUS_OPTIONS : BILLING_STATUS_OPTIONS;

	const paymentMethodOptions = !shopSlug?.includes('quito')
		? COL_PAYMENT_METHOD_OPTIONS
		: ECU_PAYMENT_METHOD_OPTIONS;

	return (
		<div className='flex items-start gap-2 min-[1144px]:me-[36px] mt-8 overflow-x-auto custom-scrollbar'>
			{FOOTER_PRODUCTS_INPUTS_PROPS.map((item, index) => {
				return (
					<div
						key={index}
						style={{
							width: item.width,
							minWidth: item.minWidth
						}}
					>
						{index === 0 ? (
							<>
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
									<Select options={statusOptions} />
								</Form.Item>
								{!isQuote ? (
									<Form.Item
										name='paymentMethod'
										label='Método de Pago'
										layout='horizontal'
										rules={[
											{
												required: true,
												message: 'El método de pago es requerido'
											}
										]}
									>
										<Select options={paymentMethodOptions} />
									</Form.Item>
								) : null}
							</>
						) : index === 5 ? (
							// Calculation Inputs
							children
						) : null}
					</div>
				);
			})}
		</div>
	);
};

export default DrawerFormFooter;
