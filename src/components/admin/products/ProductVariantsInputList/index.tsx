import { Button, Form, Input } from 'antd';
import { IoAdd, IoRemoveCircleOutline } from 'react-icons/io5';
import { AiOutlineAppstore } from 'react-icons/ai';

const ProductVariantsInputList = () => {
	return (
		<Form.List name='productVariants'>
			{(fields, { add, remove }, { errors }) => (
				<>
					{fields.map((field, index) => (
						<Form.Item
							label={index === 0 ? 'Presentaciones del producto' : ''}
							required={false}
							key={field.key}
						>
							<div className='flex items-center gap-2'>
								<Form.Item
									{...field}
									validateTrigger={['onChange', 'onBlur']}
									rules={[
										{
											required: true,
											whitespace: true,
											message:
												'Por favor, agregue una presentación o elimine este campo'
										}
									]}
									noStyle
								>
									<Input placeholder='Nombre de la presentación' />
								</Form.Item>
								{fields.length > 0 ? (
									<IoRemoveCircleOutline
										className='dynamic-delete-button cursor-pointer'
										size={20}
										color='#FF4D4f'
										onClick={() => remove(field.name)}
									/>
								) : null}
							</div>
						</Form.Item>
					))}
					<Form.Item>
						<Button
							color='primary'
							variant='dashed'
							onClick={() => add()}
							icon={<IoAdd size={20} />}
						>
							<span className='hidden'>Presentación</span>{' '}
							<AiOutlineAppstore size={20} />
						</Button>
						<Form.ErrorList errors={errors} />
					</Form.Item>
				</>
			)}
		</Form.List>
	);
};

export default ProductVariantsInputList;
