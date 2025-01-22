import { Col, Form, Input, Row } from 'antd';
import { CUSTOMER_INPUTS_PROPS } from '@/components/admin/consts';

const CustomerInfoInputs = () => {
	return (
		<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
			{CUSTOMER_INPUTS_PROPS.map((item, i) => (
				<Col key={`${item.name}-${i}`} xs={24} sm={12} lg={8}>
					<Form.Item
						name={item.name}
						label={item.label}
						rules={[
							{
								required: true,
								message: item.ruleMsg
							}
						]}
					>
						<Input placeholder={item.placeholder} />
					</Form.Item>
				</Col>
			))}
		</Row>
	);
};

export default CustomerInfoInputs;
