import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormInstance, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CustomTag from './CustomTag';
import { shopServices } from '@/services/shopServices';
import { setShops } from '@/reducers/shops/shopSlice';
import { formatToTitleCase } from '@/utils/formats';
import { selectFilterOption } from '../../utils';

const SelectStocks = ({
	form,
	setIsQuitoSelected
}: {
	form: FormInstance;
	setIsQuitoSelected: Dispatch<SetStateAction<boolean>>;
}) => {
	const { shops } = useSelector((state: RootState) => state.shop);
	const [stockOptions, setStockOptions] = useState<
		{ value: string; label: string | null }[] | undefined
	>();
	const dispatch = useDispatch();

	const fetchShops = async () => {
		const data = await shopServices.getAll(false);
		if (data) {
			dispatch(setShops(data));
			setDefaultStocks(data);
		}
	};

	const setDefaultStocks = (data: Shop[]) => {
		const options = data?.map((shop: Shop) => {
			return {
				value: shop?.stockId,
				label: formatToTitleCase(shop?.name)
			};
		});
		setStockOptions(options);

		form.setFieldsValue({
			stockIds: options.map(opt => opt.value)
		});
	};

	useEffect(() => {
		if (shops?.length === 0) {
			fetchShops();
		}

		setDefaultStocks(shops);
	}, []);

	const mainStockId = shops.find(sh => sh.mainStock)?.stockId;
	const quitoStockId = shops.find(sh => sh.slug === 'manuarte-quito')?.stockId;

	return (
		<Form.Item
			name='stockIds'
			label='Crear stock en:'
			rules={[
				{
					required: true,
					message: 'Debe seleccionar al menos 1 bodega (Fabrica Cascajal)'
				}
			]}
		>
			<Select
				placeholder='Seleccione las bodegas'
				allowClear
				showSearch
				mode='multiple'
				tagRender={({ label, value, closable, onClose }) => {
					const isFixed = value === mainStockId;

					return (
						<CustomTag label={label} isFixed={isFixed} onClose={onClose} />
					);
				}}
				filterOption={selectFilterOption}
				options={stockOptions}
				onChange={values => {
					const newValues = values.includes(mainStockId)
						? values
						: [mainStockId, ...values];

					form.setFieldsValue({ stockIds: newValues });
					setIsQuitoSelected(
						newValues?.some((opt: string) => opt === quitoStockId)
					);
				}}
			/>
		</Form.Item>
	);
};

export default SelectStocks;
