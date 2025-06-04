import { useEffect, useState } from 'react';
import { Form, Select, SelectProps, Spin } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import { getCitiesData } from '@/components/admin/utils';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

interface SearchCityProps {
	initialValue?: { cityId: string; cityName: string };
}

const SearchCity = ({ initialValue }: SearchCityProps) => {
	const [cityOptions, setCityOptions] = useState<SelectProps['options']>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const form = useFormInstance();

	useEffect(() => {
		if (initialValue?.cityId && initialValue?.cityName) {
			const option = {
				value: initialValue.cityId,
				label: initialValue.cityName
			};
			setCityOptions([option]);
			form.setFieldsValue({ cityId: initialValue.cityId });
		}
	}, [initialValue?.cityId, initialValue?.cityName]);

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
				setCityOptions([]);
				setIsSearching(false);
				return;
			}
			setHasSearched(true);

			timeout = setTimeout(async () => {
				const res = await getCitiesData({
					currentValue,
					newValue
				});

				if (res) {
					setCityOptions(res.formattedData);
				}
				setIsSearching(false);
			}, 500);
		} else {
			setCityOptions([]);
			setIsSearching(false);
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
		<Form.Item name='cityId' label='Ciudad'>
			<Select
				allowClear
				showSearch
				placeholder='Ingresa la ciudad'
				defaultActiveFirstOption={false}
				suffixIcon={null}
				filterOption={false}
				onSearch={handleSearch}
				notFoundContent={searchingOrNoContent}
				options={(cityOptions || []).map(d => ({
					value: d.value,
					label: d.label
				}))}
			/>
		</Form.Item>
	);
};

export default SearchCity;
