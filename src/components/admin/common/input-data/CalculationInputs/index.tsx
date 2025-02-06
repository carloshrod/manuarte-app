import { Form, FormInstance, InputNumber } from 'antd';
import { QUOTE_CALCULATIONS_INPUTS_PROPS } from '@/components/admin/consts';
import { formatInputCurrency } from '@/utils/formats';
import { updateCalculations } from '@/components/admin/utils';

const CalculationInputs = ({ form }: { form: FormInstance }) => {
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
						min={0}
						controls={false}
						formatter={value => formatInputCurrency(value)}
						variant={item.readOnly ? 'borderless' : 'outlined'}
						className='textRight'
						style={{
							width: '100%',
							backgroundColor: item.readOnly ? '#e5e5e5' : undefined
						}}
						readOnly={item.readOnly}
						onChange={() => updateCalculations(form)}
					/>
				</Form.Item>
			))}
		</div>
	);
};

export default CalculationInputs;
