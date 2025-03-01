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
import { useSession } from 'next-auth/react';

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
		drawer: { content, dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const itemsList: ProductVariantWithStock[] = Form.useWatch('items', form);
	const toId = useWatch('toId', form);
	const fromId = useWatch('fromId', form);
	const isEnter = content === DrawerContent.enter;
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';

	useEffect(() => {
		if (!dataToEdit) {
			form.setFieldsValue({ items: [] });
		}
	}, [fromId, toId]);

	const shopSlug =
		content === DrawerContent.enterByProduction && isAdmin
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

	const productsCount = itemsList?.reduce((acc, item) => {
		return acc + Number(item.quantity);
	}, 0);

	return (
		<Form.List name='items'>
			{(fields, { add, remove }) => {
				return (
					<>
						{!isEnter && !dataToEdit ? (
							<SearchAndAddProducts
								onAdd={() => handleAddProduct(add)}
								selectedProduct={selectedProduct}
								setSelectedProduct={setSelectedProduct}
								shopSlug={shopSlug}
							/>
						) : null}

						{itemsList?.length > 0 ? (
							<p className='pb-6'># Total de Items: {productsCount}</p>
						) : null}

						<div className='overflow-x-auto custom-scrollbar'>
							{fields.reverse().map(({ key, name, ...restField }) => {
								const item = dataToEdit
									? dataToEdit?.items[name]
									: form.getFieldValue('items')[name];

								const maxQuantity = !dataToEdit
									? addedProducts[item?.productVariantId]
									: Number(item?.quantity) + Number(item?.stockItemQuantity) ||
										1;

								return (
									<div key={key} className='flex items-center gap-2'>
										{TRANSACTIONS_PRODUCTS_LIST_INPUTS_PROPS?.map(
											(input, index) => {
												const isQuantity = input.name === 'quantity';

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
																required: isQuantity && !isEnter,
																message: ''
															},
															{
																validator: (_, value) => {
																	if (
																		content !==
																			DrawerContent.enterByProduction &&
																		content !== DrawerContent.enter &&
																		isQuantity &&
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
																variant={isEnter ? 'borderless' : undefined}
																className={`textRight ${isEnter ? '' : 'extraPadding'}`}
																style={{
																	width: '100%',
																	backgroundColor: isEnter
																		? '#e5e5e5'
																		: undefined
																}}
																readOnly={isEnter}
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
										{!isEnter && !dataToEdit ? (
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
										) : null}
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
