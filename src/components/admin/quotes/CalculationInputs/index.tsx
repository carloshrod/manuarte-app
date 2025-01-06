import { Form, InputNumber } from 'antd';
import { QUOTE_CALCULATIONS_INPUTS_PROPS } from '../consts';

const CalculationInputs = ({
	updateCalculations
}: {
	updateCalculations: () => void;
}) => {
	return (
		<div>
			{QUOTE_CALCULATIONS_INPUTS_PROPS.map((item, index) => (
				<Form.Item
					key={index}
					name={item.name}
					label={item.label}
					layout='horizontal'
					labelCol={{ span: 8 }}
				>
					<InputNumber
						formatter={value =>
							`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						variant={item.readOnly ? 'borderless' : 'outlined'}
						style={{
							width: '100%',
							backgroundColor: item.readOnly ? '#e5e5e5' : undefined
						}}
						readOnly={item.readOnly}
						onChange={updateCalculations}
					/>
				</Form.Item>
			))}
		</div>
	);
};

export default CalculationInputs;
