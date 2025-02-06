import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, FormInstance, Input, InputNumber, Tooltip } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import SearchProducts from '../SearchProducts';
import { formatInputCurrency } from '@/utils/formats';
import { updateCalculations } from '@/components/admin/utils';
import { PRODUCTS_LIST_INPUTS_PROPS } from '@/components/admin/consts';

interface ProductFormListProps {
	form: FormInstance;
	itemsError: boolean;
	setItemsError: Dispatch<SetStateAction<boolean>>;
	isQuote: boolean;
}

const ProductFormList = ({
	form,
	itemsError,
	setItemsError,
	isQuote
}: ProductFormListProps) => {
	const [selectedProducts, setSelectedProducts] = useState<
		Record<string, number>
	>({});

	const updateTotalPrice = (name: number) => {
		const items: ProductVariantWithStock[] = form.getFieldValue('items');
		const item = items[name];
		const totalPrice = item?.quantity * item?.price || 0;

		form.setFieldsValue({
			items: items.map((field, index) =>
				index === name ? { ...field, totalPrice } : field
			)
		});

		updateCalculations(form);
	};

	const handleValueChange = (
		name: number,
		field: string,
		value: number | null
	) => {
		const items = form.getFieldValue('items');
		items[name][field] = value;

		updateTotalPrice(name);
	};

	return (
		<Form.List name='items'>
			{(fields, { add, remove }) => {
				return (
					<>
						<SearchProducts
							form={form}
							add={add}
							setItemsError={setItemsError}
							isQuote={isQuote}
							setSelectedProducts={setSelectedProducts}
						/>

						<div className='overflow-x-auto custom-scrollbar'>
							{fields.map(({ key, name, ...restField }) => {
								const item = form.getFieldValue('items')[name];
								const maxQuantity =
									selectedProducts[item?.productVariantId] || 1;

								return (
									<div key={key} className='flex items-center gap-2'>
										{PRODUCTS_LIST_INPUTS_PROPS?.map((input, index) => {
											const editableField =
												input.name === 'quantity' || input.name === 'price';
											const currencyField =
												input.name === 'price' || input.name === 'totalPrice';

											return (
												<Form.Item
													{...restField}
													key={`${input.name}-${index}`}
													name={[name, input.name]}
													label={name === 0 ? input.label : null}
													rules={[
														{
															required: editableField,
															message: ''
														},
														{
															validator: (_, value) => {
																if (
																	!isQuote &&
																	input.name === 'quantity' &&
																	value &&
																	value > maxQuantity
																) {
																	return Promise.reject(
																		new Error(`Stock: ${maxQuantity}`)
																	);
																}
																return Promise.resolve();
															}
														}
													]}
													style={{
														width: input.width,
														minWidth: input.minWidth
													}}
												>
													{input.type === 'number' ? (
														<InputNumber
															min={1}
															controls={!currencyField}
															formatter={
																currencyField
																	? value => formatInputCurrency(value)
																	: undefined
															}
															variant={
																!editableField ? 'borderless' : undefined
															}
															className={`textRight ${currencyField ? '' : 'extraPadding'}`}
															style={{
																width: '100%',
																backgroundColor: !editableField
																	? '#e5e5e5'
																	: undefined
															}}
															readOnly={!editableField}
															onChange={value => {
																handleValueChange(name, input.name, value);
															}}
														/>
													) : (
														<Input
															variant='borderless'
															style={{
																backgroundColor: '#e5e5e5',
																textAlign:
																	input.name === 'currency'
																		? 'center'
																		: undefined
															}}
															readOnly={true}
															onChange={() => null}
														/>
													)}
												</Form.Item>
											);
										})}
										<Tooltip title='Eliminar producto'>
											<Button
												style={{
													marginTop: name === 0 ? 4 : -24
												}}
												type='text'
												icon={<AiOutlineDelete size={28} color={'#E53535'} />}
												onClick={() => {
													remove(name);
													updateCalculations(form);
												}}
											/>
										</Tooltip>
									</div>
								);
							})}
							{itemsError ? (
								<Form.Item>
									<Form.ErrorList
										errors={['Es necesario al menos un producto']}
									/>
								</Form.Item>
							) : null}
						</div>
					</>
				);
			}}
		</Form.List>
	);
};

export default ProductFormList;
