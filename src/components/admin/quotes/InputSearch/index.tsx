import { useState } from 'react';
import { useParams } from 'next/navigation';
import { productServices } from '@/services/productServices';
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

type AddItemFormListFn = (
	defaultValue?: StoreValue,
	insertIndex?: number
) => void;

interface InputSearchProps {
	form: FormInstance;
	add: AddItemFormListFn;
	updateCalculations: () => void;
}

const InputSearch = ({ form, add, updateCalculations }: InputSearchProps) => {
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

	let timeout: ReturnType<typeof setTimeout> | null;
	let currentValue: string;

	const fetchProducts = (value: string) => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		currentValue = value;

		const getProductsData = async () => {
			if (!value || value.length < 3) {
				setProductsOptions([]);
				setIsSearching(false);
				return;
			}

			setHasSearched(true);

			try {
				const data = await productServices.getProductsWithStockInfo({
					shopSlug: params?.shopSlug as string,
					search: value
				});

				if (currentValue === value) {
					const formattedData = data.map((item: any) => ({
						value: item.id,
						label: `${item.productName} ${item.name}`
					}));
					setProductsOptions(formattedData);
					setProductsData(data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsSearching(false);
			}
		};

		if (value) {
			timeout = setTimeout(getProductsData, 500);
		} else {
			setProductsOptions([]);
			setIsSearching(false);
		}
	};

	const handleSearch = (newValue: string) => {
		setIsSearching(true);
		fetchProducts(newValue);
	};

	const handleChange = (newValue: string) => {
		setSearch(newValue);
		const product = productsData?.find(p => p.id === newValue);
		setSelectedProduct(product as ProductVariantWithStock);
	};

	const productsList = Form.useWatch('products', form);
	const handleAddProduct = (add: AddItemFormListFn) => {
		if (selectedProduct) {
			if (selectedProduct.quantity === 0) {
				return notification.error({ message: 'Producto sin stock!' });
			}

			const inList = productsList.some(
				(product: ProductVariantWithStock) => product.id === selectedProduct.id
			);
			if (inList) {
				return notification.error({
					message: 'El producto ya se encuentra en la lista!'
				});
			}

			add({
				id: selectedProduct.id,
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

export default InputSearch;
