import { Dispatch, SetStateAction, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Button,
	Col,
	Form,
	FormInstance,
	notification,
	Row,
	Select,
	SelectProps,
	Spin,
	Tooltip
} from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { StoreValue } from 'antd/es/form/interface';
import { BsPlusSquare } from 'react-icons/bs';
import { getProductsData } from '../utils';

type AddItemFormListFn = (
	defaultValue?: StoreValue,
	insertIndex?: number
) => void;

interface SearchProductsProps {
	form: FormInstance;
	add: AddItemFormListFn;
	updateCalculations: () => void;
	setItemsError: Dispatch<SetStateAction<boolean>>;
}

const SearchProducts = ({
	form,
	add,
	updateCalculations,
	setItemsError
}: SearchProductsProps) => {
	const params = useParams() ?? {};
	const [productsOptions, setProductsOptions] = useState<
		SelectProps['options']
	>([]);
	const [search, setSearch] = useState<string>('');
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [productsData, setProductsData] = useState<ProductVariant[]>([]);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductVariantWithStock | null>(null);
	const itemsList = Form.useWatch('items', form);

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
					shopSlug: params?.shopSlug as string
				});

				if (res) {
					setProductsOptions(res.formattedData);
					setProductsData(res.data);
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
		const product = productsData?.find(p => p.id === newValue);
		setSelectedProduct(product as ProductVariantWithStock);
	};

	const handleAddProduct = (add: AddItemFormListFn) => {
		if (selectedProduct) {
			if (selectedProduct.quantity === 0) {
				return notification.error({ message: 'Producto sin stock!' });
			}

			const inList = itemsList.some(
				(product: ProductVariantWithStock) =>
					product.productVariantId === selectedProduct.id
			);
			if (inList) {
				return notification.error({
					message: 'El producto ya se encuentra en la lista!'
				});
			}

			setItemsError(false);

			add({
				productVariantId: selectedProduct.id,
				name: `${selectedProduct.productName} ${selectedProduct.name}`,
				iva: 'NO',
				quantity: 1,
				currency: selectedProduct.currency,
				price: selectedProduct.price,
				totalPrice: selectedProduct.price
			});
			updateCalculations();
			setSelectedProduct(null);
			setSearch('');
			setHasSearched(false);
			setProductsOptions([]);
			setProductsData([]);
		}
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
		<Row gutter={8} wrap={false}>
			<Col xs={23} sm={12} lg={8}>
				<Form.Item name='product' label='Buscar producto'>
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
			</Col>
			<Col style={{ display: 'flex', alignItems: 'center' }}>
				<Tooltip title='Agregar producto'>
					<Button
						type='text'
						icon={
							<BsPlusSquare
								size={22}
								color='#0D6EFD'
								style={{ display: 'flex', alignItems: 'center' }}
							/>
						}
						onClick={() => handleAddProduct(add)}
					/>
				</Tooltip>
			</Col>
		</Row>
	);
};

export default SearchProducts;
