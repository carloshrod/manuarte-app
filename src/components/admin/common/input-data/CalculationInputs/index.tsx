import { Form, FormInstance, Input, InputNumber, Switch } from 'antd';
import { QUOTE_CALCULATIONS_INPUTS_PROPS } from '@/components/admin/consts';
import { formatInputCurrency } from '@/utils/formats';
import { updateCalculations } from '@/components/admin/utils';
import { useEffect, useState } from 'react';
import { DiscountType } from '@/types/enums';

const CalculationInputs = ({
	form,
	discountType,
	isUpdatingBilling = false
}: {
	form: FormInstance;
	discountType?: string;
	isUpdatingBilling?: boolean;
}) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (discountType) {
			const isPercentage = discountType === DiscountType.PERCENTAGE;
			setChecked(isPercentage);
		}
	}, []);

	return (
		<div>
			{QUOTE_CALCULATIONS_INPUTS_PROPS.map((item, index) => {
				const isDiscount = item.name === 'discount';

				return (
					<div key={index}>
						{item.name === 'discountType' ? (
							!isUpdatingBilling ? (
								<div className='mb-3 flex items-center justify-end gap-2'>
									<label
										htmlFor='switch'
										className='text-[12px] text-gray-500'
									>{`${item.label} ${checked ? 'valor fijo' : 'porcentaje'}`}</label>
									<Switch
										defaultChecked={discountType === DiscountType.PERCENTAGE}
										onChange={valueChecked => {
											setChecked(valueChecked);
											updateCalculations(form, valueChecked);
											form.setFieldsValue({
												discountType: valueChecked
													? DiscountType.PERCENTAGE
													: DiscountType.FIXED
											});
										}}
										id='switch'
										unCheckedChildren={
											<span className='text-[14px] font-semibold'>$</span>
										}
										checkedChildren={
											<span className='text-[14px] font-semibold'>%</span>
										}
										style={{
											backgroundColor: '#1677ff'
										}}
									/>
									<Form.Item name={item.name} noStyle hidden>
										<Input hidden />
									</Form.Item>
								</div>
							) : null
						) : (
							<Form.Item
								name={item.name}
								label={item.label}
								layout='horizontal'
								labelCol={{ span: 12 }}
								rules={[
									{
										validator: (_, value) => {
											if (isDiscount && checked && value > 100) {
												return Promise.reject(
													new Error('El descuento no puede ser mayor a 100%')
												);
											}
											return Promise.resolve();
										}
									}
								]}
							>
								<InputNumber
									min={0}
									max={isDiscount && checked ? 100 : undefined}
									controls={false}
									formatter={value => {
										const formattedValue = formatInputCurrency(value);

										if (!isDiscount) {
											return formattedValue;
										}

										const percentageValue = formattedValue
											? `${formattedValue.replace('$', '')}%`
											: '';

										return checked ? percentageValue : formattedValue;
									}}
									variant={
										item.readOnly || isUpdatingBilling
											? 'borderless'
											: 'outlined'
									}
									className='textRight'
									style={{
										width: '100%',
										backgroundColor:
											item.readOnly || isUpdatingBilling ? '#e5e5e5' : undefined
									}}
									readOnly={item.readOnly || isUpdatingBilling}
									onChange={() => updateCalculations(form, checked)}
								/>
							</Form.Item>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default CalculationInputs;
