import { Button, Form, FormInstance, Input, InputNumber, Tooltip } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { QUOTE_PRODUCTS_INPUTS_PROPS } from '../consts';
import SearchProducts from '../SearchProducts';
import { Dispatch, SetStateAction } from 'react';
import { formatInputCurrency } from '@/utils/utils';

interface ProductFormListProps {
	form: FormInstance;
	updateCalculations: () => void;
	itemsError: boolean;
	setItemsError: Dispatch<SetStateAction<boolean>>;
}

const ProductFormList = ({
	form,
	updateCalculations,
	itemsError,
	setItemsError
}: ProductFormListProps) => {
	const updateTotalPrice = (name: number) => {
		const items: ProductVariantWithStock[] = form.getFieldValue('items');
		const item = items[name];
		const totalPrice = item?.quantity * item?.price || 0;

		form.setFieldsValue({
			items: items.map((field, index) =>
				index === name ? { ...field, totalPrice } : field
			)
		});

		updateCalculations();
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
							updateCalculations={updateCalculations}
							setItemsError={setItemsError}
						/>

						<div className='overflow-x-auto custom-scrollbar'>
							{fields.map(({ key, name, ...restField }) => {
								return (
									<div key={key} className='flex items-center gap-2'>
										{QUOTE_PRODUCTS_INPUTS_PROPS?.map((item, index) => {
											const editableField =
												item.name === 'quantity' || item.name === 'price';
											const currencyField =
												item.name === 'price' || item.name === 'totalPrice';

											return (
												<Form.Item
													{...restField}
													key={`${item.name}-${index}`}
													name={[name, item.name]}
													label={name === 0 ? item.label : null}
													rules={[
														{
															required: editableField,
															message: ''
														}
													]}
													style={{
														width: item.width,
														minWidth: item.minWidth
													}}
												>
													{item.type === 'number' ? (
														<InputNumber
															min={1}
															formatter={
																currencyField
																	? value => formatInputCurrency(value)
																	: undefined
															}
															variant={
																!editableField ? 'borderless' : undefined
															}
															style={{
																width: '100%',
																backgroundColor: !editableField
																	? '#e5e5e5'
																	: undefined
															}}
															readOnly={!editableField}
															onChange={value => {
																handleValueChange(name, item.name, value);
															}}
														/>
													) : (
														<Input
															variant='borderless'
															style={{
																backgroundColor: '#e5e5e5'
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
													updateCalculations();
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
