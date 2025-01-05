import { Button, Form, Input } from 'antd';
import { IoAdd, IoRemoveCircleOutline } from 'react-icons/io5';
import { AiOutlineAppstore } from 'react-icons/ai';

const ProductVariantFormList = ({ isUpdating }: { isUpdating: boolean }) => {
	const label = isUpdating ? 'Presentación' : 'Presentaciones';
	const validateMsg = isUpdating
		? 'La presentación del producto es requerida'
		: 'Por favor, agregue una presentación o elimine este campo';

	return (
		<Form.List name='productVariants'>
			{(fields, { add, remove }, { errors }) => (
				<>
					{fields.map((field, index) => (
						<Form.Item
							label={index === 0 ? label : ''}
							required={isUpdating}
							key={field.key}
						>
							<div className='flex items-center gap-2'>
								<Form.Item
									{...field}
									key={field.key}
									validateTrigger={['onChange', 'onBlur']}
									rules={[
										{
											required: true,
											whitespace: true,
											message: validateMsg
										}
									]}
									noStyle
								>
									<Input placeholder='Nombre de la presentación' />
								</Form.Item>
								{fields.length > 0 && !isUpdating ? (
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
					{!isUpdating ? (
						<Form.Item>
							<Button
								color='primary'
								variant='dashed'
								onClick={() => add()}
								icon={
									<IoAdd
										size={20}
										style={{ display: 'flex', alignItems: 'center' }}
									/>
								}
								className='mt-4'
							>
								<span>Presentación</span> <AiOutlineAppstore size={20} />
							</Button>
							<Form.ErrorList errors={errors} />
						</Form.Item>
					) : null}
				</>
			)}
		</Form.List>
	);
};

export default ProductVariantFormList;
