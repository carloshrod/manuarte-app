import {
	Button,
	Form,
	FormInstance,
	Input,
	InputNumber,
	notification,
	Tooltip
} from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchAndAddProducts from '../SearchAndAddProducts';
import { TRANSACTIONS_PRODUCTS_LIST_INPUTS_PROPS } from '@/components/admin/consts';
import { AiOutlineDelete } from 'react-icons/ai';
import { StoreValue } from 'antd/es/form/interface';
import { DrawerContent } from '@/types/enums';
import { useSelector } from 'react-redux';
import { useWatch } from 'antd/es/form/Form';

interface TransactionsProductFormListProps {
	form: FormInstance;
	itemsError: boolean;
	setItemsError: Dispatch<SetStateAction<boolean>>;
	fromShopSlug?: string;
}

type AddItemFormListFn = (
	defaultValue?: StoreValue,
	insertIndex?: number
) => void;

const TransactionsProductFormList = ({
	form,
	itemsError,
	setItemsError,
	fromShopSlug
}: TransactionsProductFormListProps) => {
	const [selectedProduct, setSelectedProduct] =
		useState<ProductVariantWithStock | null>(null);
	const [addedProducts, setAddedProducts] = useState<Record<string, number>>(
		{}
	);

	const {
		drawer: { content }
	} = useSelector((state: RootState) => state.ui);
	const itemsList = Form.useWatch('items', form);
	const toId = useWatch('toId', form);

	useEffect(() => {
		form.setFieldsValue({ items: [] });
	}, [toId]);

	const shopSlug =
		content === DrawerContent.enterBySupplier
			? 'fabrica-cascajal'
			: fromShopSlug;

	const handleAddProduct = (add: AddItemFormListFn) => {
		try {
			if (selectedProduct) {
				const inList = itemsList.some(
					(product: ProductVariantWithStock) =>
						product.productVariantId === selectedProduct.id
				);

				if (inList) {
					return notification.error({
						message: 'El producto ya se encuentra en la lista!'
					});
				}

				if (content === DrawerContent.exit) {
					if (selectedProduct.quantity === 0) {
						return notification.error({
							message: 'Producto sin stock!'
						});
					}
				}

				if (content === DrawerContent.transfer) {
					if (!toId) {
						return notification.error({
							message: 'Selecciona el stock de destino!'
						});
					}

					if (selectedProduct.quantity === 0) {
						return notification.error({
							message: 'Producto sin stock en origen!'
						});
					}

					if (selectedProduct.quantity === 0) {
						return notification.error({
							message: 'Producto sin stock en origen!'
						});
					}

					if (!selectedProduct?.stocks?.includes(toId)) {
						return notification.error({
							message: 'El item no existe en el stock de destino!'
						});
					}
				}

				setAddedProducts(prev => ({
					...prev,
					[selectedProduct.id]: selectedProduct.quantity
				}));

				setItemsError(false);

				add({
					productVariantId: selectedProduct.id,
					stockItemId: selectedProduct.stockItemId,
					name: `${selectedProduct.productName} ${selectedProduct.name}`,
					quantity: 1
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form.List name='items'>
			{(fields, { add, remove }) => {
				return (
					<>
						<SearchAndAddProducts
							onAdd={() => handleAddProduct(add)}
							selectedProduct={selectedProduct}
							setSelectedProduct={setSelectedProduct}
							shopSlug={shopSlug}
						/>

						<div className='overflow-x-auto custom-scrollbar'>
							{fields.reverse().map(({ key, name, ...restField }) => {
								const item = form.getFieldValue('items')[name];
								const maxQuantity = addedProducts[item?.productVariantId] || 1;

								return (
									<div key={key} className='flex items-center gap-2'>
										{TRANSACTIONS_PRODUCTS_LIST_INPUTS_PROPS?.map(
											(input, index) => {
												const editableField = input.name === 'quantity';

												return (
													<Form.Item
														{...restField}
														key={`${input.name}-${index}`}
														name={[name, input.name]}
														label={
															name === fields?.length - 1 ? input.label : null
														}
														rules={[
															{
																required: editableField,
																message: ''
															},
															{
																validator: (_, value) => {
																	if (
																		content !== DrawerContent.enterBySupplier &&
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
															width: input.width
														}}
													>
														{input.type === 'number' ? (
															<InputNumber
																min={1}
																variant={
																	!editableField ? 'borderless' : undefined
																}
																className='textRight extraPadding'
																style={{
																	width: '100%',
																	backgroundColor: !editableField
																		? '#e5e5e5'
																		: undefined
																}}
																readOnly={!editableField}
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
											}
										)}
										<Tooltip title='Eliminar producto'>
											<Button
												style={{
													marginTop: name === fields?.length - 1 ? 4 : -24
												}}
												type='text'
												icon={<AiOutlineDelete size={28} color={'#E53535'} />}
												onClick={() => {
													remove(name);
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

export default TransactionsProductFormList;
