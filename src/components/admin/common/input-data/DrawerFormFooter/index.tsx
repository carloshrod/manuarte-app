import { DatePicker, Form, Select } from 'antd';
import { ReactNode } from 'react';
import {
	FOOTER_PRODUCTS_INPUTS_PROPS,
	billingStatusOptions,
	paymentMethodOptions,
	quoteStatusOptions
} from '@/components/admin/consts';

interface DrawerFormFooterProps {
	isQuote: boolean;
	children: ReactNode;
}

const DrawerFormFooter = ({ isQuote, children }: DrawerFormFooterProps) => {
	const statusOptions = isQuote ? quoteStatusOptions : billingStatusOptions;

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
								<Form.Item name='status' label='Estado' layout='horizontal'>
									<Select options={statusOptions} />
								</Form.Item>
								{isQuote ? (
									<Form.Item
										name='dueDate'
										label='Vencimiento'
										layout='horizontal'
									>
										<DatePicker
											style={{ width: '100%' }}
											placeholder='Seleccione una fecha...'
										/>
									</Form.Item>
								) : (
									<Form.Item
										name='paymentMethod'
										label='Método de Pago'
										layout='horizontal'
									>
										<Select options={paymentMethodOptions} />
									</Form.Item>
								)}
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
