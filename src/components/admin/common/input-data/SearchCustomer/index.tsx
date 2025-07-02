import { useState } from 'react';
import { Select, SelectProps, Spin } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { getCustomersData } from '@/components/admin/utils';
import { useDrawerStore } from '@/stores/drawerStore';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';

const SearchCustomer = () => {
	const [customersOptions, setCustomersOptions] = useState<
		SelectProps['options']
	>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [customersData, setCustomersData] = useState<Customer[]>([]);
	const { updateDrawer } = useDrawerStore.getState();
	const { shops } = useSelector((state: RootState) => state.shop);
	const { shopSlug } = useParams();
	const shop = shops.find(sh => sh.slug === shopSlug);

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
				setCustomersOptions([]);
				setIsSearching(false);
				return;
			}
			setHasSearched(true);

			timeout = setTimeout(async () => {
				const res = await getCustomersData({
					currentValue,
					newValue,
					isoCode: shop?.isoCode as string
				});

				if (res) {
					setCustomersOptions(res.formattedData);
					setCustomersData(res.data);
				}
				setIsSearching(false);
			}, 500);
		} else {
			setCustomersOptions([]);
			setIsSearching(false);
		}
	};

	const handleChange = (newValue: string) => {
		const customer = customersData?.find(c => c.personId === newValue);
		if (customer) {
			updateDrawer({ customerInfo: customer });
		}
		setCustomersOptions([]);
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
		<div className='flex items-center gap-2'>
			<p className='text-[14px]'>Buscar cliente:</p>
			<Select
				allowClear
				showSearch
				value={''}
				placeholder='Nombre o DNI del cliente'
				defaultActiveFirstOption={false}
				suffixIcon={null}
				filterOption={false}
				onSearch={handleSearch}
				onChange={handleChange}
				notFoundContent={searchingOrNoContent}
				options={(customersOptions || []).map(d => ({
					value: d.value,
					label: d.label
				}))}
				style={{ width: 300 }}
			/>
		</div>
	);
};

export default SearchCustomer;
