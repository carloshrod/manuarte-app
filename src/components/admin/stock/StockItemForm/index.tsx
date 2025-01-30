import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Form, Select, SelectProps, Spin } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import useForm from '@/hooks/useForm';
import { getProductsData } from '../../utils';
import FormButtons from '../../common/ui/FormButtons';
import { useSelector } from 'react-redux';

const StockItemForm = () => {
	const { form, isLoading } = useForm();
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const [productsOptions, setProductsOptions] = useState<
		SelectProps['options']
	>([]);
	const [search, setSearch] = useState<string>('');
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	useState<ProductVariantWithStock | null>(null);
	const params = useParams() ?? {};

	const onSubmit = async (values: StockItemDto) => {
		console.log(values);
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
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			// initialValues={}
			clearOnDestroy
			onFinish={values => onSubmit(values)}
		>
			<Form.Item name='productVariantId' label='Buscar producto'>
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
			<FormButtons
				label={dataToEdit ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default StockItemForm;
