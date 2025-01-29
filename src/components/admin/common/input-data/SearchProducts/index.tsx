import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Col,
	Form,
	FormInstance,
	notification,
	Row,
	Select,
	SelectProps,
	Spin
} from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { StoreValue } from 'antd/es/form/interface';
import { getProductsData, updateCalculations } from '@/components/admin/utils';

type AddItemFormListFn = (
	defaultValue?: StoreValue,
	insertIndex?: number
) => void;

interface SearchProductsProps {
	form: FormInstance;
	add: AddItemFormListFn;
	setItemsError: Dispatch<SetStateAction<boolean>>;
	isQuote: boolean;
	setSelectedProducts: Dispatch<SetStateAction<Record<string, number>>>;
}

const SearchProducts = ({
	form,
	add,
	setItemsError,
	isQuote,
	setSelectedProducts
}: SearchProductsProps) => {
	const params = useParams() ?? {};
	const [productsOptions, setProductsOptions] = useState<
		SelectProps['options']
	>([]);
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

	const handleAddProduct = (add: AddItemFormListFn) => {
		if (selectedProduct) {
			if (!isQuote) {
				if (selectedProduct.quantity === 0) {
					return notification.error({ message: 'Producto sin stock!' });
				}

				setSelectedProducts(prev => ({
					...prev,
					[selectedProduct.id]: selectedProduct.quantity
				}));
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
				stockItemId: selectedProduct.stockItemId,
				name: `${selectedProduct.productName} ${selectedProduct.name}`,
				iva: 'NO',
				quantity: 1,
				currency: selectedProduct.currency,
				price: selectedProduct.price,
				totalPrice: selectedProduct.price
			});
			updateCalculations(form);
		}
	};

	const handleSelect = (newValue: string) => {
		const product = productsData?.find(p => p.id === newValue);
		setSelectedProduct(product as ProductVariantWithStock);
	};

	useEffect(() => {
		if (selectedProduct) {
			handleAddProduct(add);
			setHasSearched(false);
			setProductsOptions([]);
			setProductsData([]);
			setSelectedProduct(null);
		}
	}, [selectedProduct]);

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
			<Col span={24}>
				<Form.Item
					name='product'
					label='Buscar producto'
					style={{ maxWidth: 500 }}
				>
					<Select
						allowClear
						showSearch
						placeholder='Nombre o código del producto'
						defaultActiveFirstOption={false}
						suffixIcon={null}
						filterOption={false}
						onSearch={handleSearch}
						onSelect={handleSelect}
						notFoundContent={searchingOrNoContent}
						options={(productsOptions || []).map(d => ({
							value: d.value,
							label: d.label
						}))}
					/>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default SearchProducts;
