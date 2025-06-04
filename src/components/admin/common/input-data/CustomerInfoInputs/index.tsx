import { Col, Form, Input, Row } from 'antd';
import SearchCity from '../SearchCity';
import { CUSTOMER_INPUTS_PROPS } from '@/components/admin/consts';
import { useDrawerStore } from '@/stores/drawerStore';

const CustomerInfoInputs = () => {
	const { dataToHandle, customerInfo: existingCustomer } =
		useDrawerStore.getState();

	const initialData = existingCustomer || dataToHandle;

	return (
		<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
			{CUSTOMER_INPUTS_PROPS.map((item, i) => (
				<Col key={`${item.name}-${i}`} xs={24} sm={12} lg={8}>
					{item.name === 'cityId' ? (
						<SearchCity
							initialValue={
								initialData?.cityId && initialData.cityName
									? {
											cityId: initialData.cityId,
											cityName: `${initialData.cityName}, ${initialData?.regionName}, ${initialData?.countryIsoCode}`
										}
									: undefined
							}
						/>
					) : (
						<Form.Item
							name={item.name}
							label={item.label}
							rules={[
								{
									required: 'ruleMsg' in item,
									message: item.ruleMsg
								}
							]}
						>
							<Input placeholder={item.placeholder} />
						</Form.Item>
					)}
				</Col>
			))}
		</Row>
	);
};

export default CustomerInfoInputs;
