import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Form, Input, InputNumber, Select, SelectProps, Spin } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import useForm from '@/hooks/useForm';
import { getProductsData } from '../../utils';
import { formatInputCurrency } from '@/utils/formats';
import { setShops } from '@/reducers/shops/shopSlice';
import { shopServices } from '@/services/shopServices';
import { useModalStore } from '@/stores/modalStore';
import SelectStocks from '../../products/SelectStocks';
import { stockItemServices } from '@/services/stockItemServices';

const StockItemForm = () => {
	const { form, isLoading, submitCreateStockItem, submitUpdateStockItem } =
		useForm();
	const { dataToHandle } = useModalStore.getState();
	const { shops } = useSelector((state: RootState) => state.shop);
	const [productsOptions, setProductsOptions] = useState<
		SelectProps['options']
	>([]);
	const [search, setSearch] = useState<string>('');
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [isQuitoSelected, setIsQuitoSelected] = useState(false);
	const [isUsdSet, setIsUsdSet] = useState(false);
	const params = useParams() ?? {};
	const searchParams = useSearchParams();
	const isUsd = params?.shopSlug.includes('quito');
	const isMainStock = searchParams.get('main') === 'true';
	const dispatch = useDispatch();

	const fetchShops = async () => {
		const data = await shopServices.getAll(false);
		if (data) {
			dispatch(setShops(data));
		}
	};

	const getStockItemInfo = async () => {
		const { productVariantId } = dataToHandle ?? {};
		const stockId = shops.find(sh => sh.currency === 'USD')?.stockId;
		if (!productVariantId || !stockId) return;

		const data = await stockItemServices.getOneByStock(
			productVariantId,
			stockId
		);
		if (data) {
			form.setFieldsValue({
				priceUsd: data?.price,
				costUsd: data?.cost
			});

			setIsUsdSet(true);
		}
	};

	useEffect(() => {
		if (dataToHandle) {
			form.setFieldsValue({
				product: `${dataToHandle?.productName} - ${dataToHandle?.productVariantName}`,
				price: dataToHandle?.price,
				cost: dataToHandle?.cost,
				minQty: dataToHandle?.minQty,
				maxQty: dataToHandle?.maxQty
			});
		}

		if (shops?.length === 0) {
			fetchShops();
		}
	}, []);

	useEffect(() => {
		if (isQuitoSelected && !isUsdSet) {
			getStockItemInfo();
		}
	}, [isQuitoSelected]);

	const shopInfo = shops?.find(sh => sh.slug === params?.shopSlug);

	const onSubmit = async (values: SubmitStockItemDto) => {
		if (!dataToHandle) {
			await submitCreateStockItem({
				...values,
				stockId: shopInfo?.stockId as string,
				currency: shopInfo?.currency as string
			});
		} else {
			if ('product' in values) delete values.product;
			await submitUpdateStockItem(
				{
					...values,
					productVariantId: dataToHandle.productVariantId
				},
				dataToHandle.id
			);
		}
	};

	let timeout: ReturnType<typeof setTimeout> | null;

	const handleSearch = (newValue: string) => {
		setIsSearching(true);
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		const currentValue = newValue;

		if (newValue) {
			if (newValue.length < 3) {
				setProductsOptions([]);
				setIsSearching(false);
				return;
			}
			setHasSearched(true);

			timeout = setTimeout(async () => {
				const res = await getProductsData({
					currentValue,
					newValue,
					shopSlug: params?.shopSlug as string,
					missingProducts: true
				});

				if (res) {
					setProductsOptions(res.formattedData);
				}
				setIsSearching(false);
			}, 500);
		} else {
			setProductsOptions([]);
			setIsSearching(false);
		}
	};

	const handleChange = (newValue: string) => {
		setSearch(newValue);
	};

	const searchingOrNoContent = isSearching ? (
		<div className='flex justify-center text-center'>
			<Spin style={{ padding: '14px 0' }} />
		</div>
	) : (
		hasSearched && (
			<div className='text-center'>
				<MehOutlined style={{ fontSize: 24 }} />
				<p>Sin resultados</p>
			</div>
		)
	);

	return (
		<Form layout='vertical' form={form} onFinish={values => onSubmit(values)}>
			{!dataToHandle ? (
				<Form.Item
					name='productVariantId'
					label='Buscar producto'
					rules={[
						{
							required: true,
							message: 'El producto es requerido'
						}
					]}
				>
					<Select
						allowClear
						showSearch
						value={search}
						placeholder='Nombre o código del producto'
						defaultActiveFirstOption={false}
						suffixIcon={null}
						filterOption={false}
						onSearch={handleSearch}
						onChange={handleChange}
						notFoundContent={searchingOrNoContent}
						options={(productsOptions || []).map(d => ({
							value: d.value,
							label: d.label
						}))}
					/>
				</Form.Item>
			) : (
				<Form.Item name='product' label='Producto'>
					<Input
						readOnly
						style={{
							backgroundColor: '#e5e5e5'
						}}
					/>
				</Form.Item>
			)}
			<div className='flex gap-4 justify-between'>
				<Form.Item
					name='price'
					label={`Precio ${isUsd ? 'USD' : 'COP'}`}
					rules={[
						{
							required: true,
							message: 'Campo requerido'
						}
					]}
				>
					<InputNumber
						min={0}
						controls={false}
						className='textRight'
						style={{ width: '100%' }}
						formatter={value => formatInputCurrency(value)}
					/>
				</Form.Item>
				<Form.Item
					name='cost'
					label={`Costo ${isUsd ? 'USD' : 'COP'}`}
					rules={[
						{
							required: true,
							message: 'Campo requerido'
						}
					]}
				>
					<InputNumber
						min={0}
						controls={false}
						className='textRight'
						style={{ width: '100%' }}
						formatter={value => formatInputCurrency(value)}
					/>
				</Form.Item>
				<Form.Item
					name='minQty'
					label='Cantidad Mín.'
					rules={[
						{
							required: true,
							message: 'Campo requerido'
						}
					]}
				>
					<InputNumber
						min={0}
						controls={false}
						className='textRight'
						style={{ width: '100%' }}
					/>
				</Form.Item>
				<Form.Item
					name='maxQty'
					label='Cantidad Máx.'
					rules={[
						{
							required: true,
							message: 'Campo requerido'
						}
					]}
				>
					<InputNumber
						min={0}
						controls={false}
						className='textRight'
						style={{ width: '100%' }}
					/>
				</Form.Item>
			</div>

			{dataToHandle && isMainStock ? (
				<>
					{isQuitoSelected ? (
						<div className='flex gap-4 justify-start'>
							<Form.Item
								name='priceUsd'
								label='Precio USD'
								rules={[
									{
										required: true,
										message: 'Campo requerido'
									}
								]}
								style={{ width: '23%' }}
							>
								<InputNumber
									min={0}
									controls={false}
									className='textRight'
									style={{ width: '100%' }}
									formatter={value => formatInputCurrency(value)}
								/>
							</Form.Item>
							<Form.Item
								name='costUsd'
								label='Costo USD'
								rules={[
									{
										required: true,
										message: 'Campo requerido'
									}
								]}
								style={{ width: '23%' }}
							>
								<InputNumber
									min={0}
									controls={false}
									className='textRight'
									style={{ width: '100%' }}
									formatter={value => formatInputCurrency(value)}
								/>
							</Form.Item>
						</div>
					) : null}

					<Form.Item>
						<SelectStocks
							form={form}
							setIsQuitoSelected={setIsQuitoSelected}
							label='Editar también en:'
							emptyValues={true}
						/>
					</Form.Item>
				</>
			) : null}

			<FormButtons
				label={dataToHandle ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default StockItemForm;
