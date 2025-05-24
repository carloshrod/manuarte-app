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
	setIsQuitoSelected,
	label = 'Crear stock en:',
	updatingStockItem
}: {
	form: FormInstance;
	setIsQuitoSelected: Dispatch<SetStateAction<boolean>>;
	label?: string;
	updatingStockItem?: boolean;
}) => {
	const { shops } = useSelector((state: RootState) => state.shop);
	const [stockOptions, setStockOptions] = useState<
		{ value: string; label: string | null }[] | undefined
	>();
	const dispatch = useDispatch();

	const fetchShops = async () => {
		if (shops?.length === 0) {
			const data = await shopServices.getAll(false);
			if (data) {
				dispatch(setShops(data));
				setDefaultStocks(data);
			}
		}
	};

	const setDefaultStocks = (data: Shop[]) => {
		const filteredData = updatingStockItem
			? data.filter(item => !item.mainStock)
			: data;

		const options = filteredData?.map((shop: Shop) => {
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
		fetchShops();
		setDefaultStocks(shops);
	}, []);

	const mainStockId = shops.find(sh => sh.mainStock)?.stockId;
	const quitoStockId = shops.find(sh => sh.slug === 'manuarte-quito')?.stockId;

	return (
		<Form.Item
			name='stockIds'
			label={label}
			rules={[
				{
					required: !updatingStockItem,
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
					const newValues =
						values.includes(mainStockId) || updatingStockItem
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
