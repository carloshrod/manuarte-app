import { Button, Divider, Form, Input, InputNumber } from 'antd';
import { IoAdd, IoRemoveCircleOutline } from 'react-icons/io5';
import { AiOutlineAppstore } from 'react-icons/ai';
import { formatInputCurrency } from '@/utils/formats';
import { PRODUCT_VARIANT_PROPS } from '../../consts';

const ProductVariantFormList = ({
	isUpdating,
	isQuitoSelected
}: {
	isUpdating: boolean;
	isQuitoSelected: boolean;
}) => {
	return (
		<Form.List name='productVariants'>
			{(fields, { add, remove }, { errors }) => (
				<>
					{fields.map((field, index) => (
						<div key={field.key}>
							<Divider orientation='left' style={{ borderColor: '#00000032' }}>
								Presentacion {index + 1}
							</Divider>
							<div className='flex gap-2 items-center'>
								<div className='flex flex-wrap items-center gap-x-2 w-[95%]'>
									{PRODUCT_VARIANT_PROPS.map((input, i) => {
										return input.name.toLowerCase().includes('usd') &&
											!isQuitoSelected ? null : (
											<Form.Item
												{...field}
												key={`${input.name}-${index}`}
												name={[field.name, input.name]}
												label={input.label}
												validateTrigger={['onChange', 'onBlur']}
												rules={[
													{
														required: true,
														message: 'Requerido'
													}
												]}
												style={{
													width: input.width
												}}
											>
												{input.type === 'text' ? (
													<Input placeholder={input.placeholder} />
												) : (
													<InputNumber
														min={0}
														controls={false}
														placeholder={input.placeholder}
														formatter={
															i > 2
																? value => formatInputCurrency(value)
																: undefined
														}
														className='textRight'
														style={{ width: '100%' }}
													/>
												)}
											</Form.Item>
										);
									})}
								</div>
								{fields.length > 0 && !isUpdating ? (
									<IoRemoveCircleOutline
										className={`dynamic-delete-button cursor-pointer`}
										size={24}
										color='#FF4D4f'
										onClick={() => remove(field.name)}
									/>
								) : null}
							</div>
						</div>
					))}
					{!isUpdating ? (
						<Form.Item>
							<Button
								color='primary'
								variant='dashed'
								onClick={() => add()}
								icon={
									<IoAdd
										size={20}
										style={{ display: 'flex', alignItems: 'center' }}
									/>
								}
								className='mt-4'
							>
								<span>Presentación</span> <AiOutlineAppstore size={20} />
							</Button>
							<Form.ErrorList errors={errors} />
						</Form.Item>
					) : null}
				</>
			)}
		</Form.List>
	);
};

export default ProductVariantFormList;
