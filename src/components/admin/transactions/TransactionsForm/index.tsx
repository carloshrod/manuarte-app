import useForm from '@/hooks/useForm';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { HiChevronDoubleRight } from 'react-icons/hi';
import TransactionsProductFormList from '../../common/input-data/TransactionsProductFormList';
import { useSelector } from 'react-redux';
import { DrawerContent, TransactionType } from '@/types/enums';
import { useWatch } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { formatToTitleCase } from '@/utils/formats';

const TransactionsForm = () => {
	const { form, isLoading, itemsError, setItemsError, submitTransaction } =
		useForm();
	const {
		drawer: { content }
	} = useSelector((state: RootState) => state.ui);
	const { shops } = useSelector((state: RootState) => state.shop);

	useEffect(() => {
		if (shops?.length > 0 && content === DrawerContent.transfer) {
			form.setFieldsValue({
				fromId: shops?.find(shop => shop.mainStock)?.stockId
			});
		}
	}, []);

	const stockOptions = shops?.map(shop => {
		return {
			value: shop?.stockId,
			label: formatToTitleCase(shop?.stockName)
		};
	});

	const fromId = useWatch('fromId', form);
	const filteredStockOptions = stockOptions?.filter(
		opt => opt.value !== fromId
	);

	const fromShopSlug = fromId
		? shops?.find(shop => shop.stockId === fromId)?.slug
		: undefined;

	const SUBMITS: Record<string, (values: SubmitTransactionDto) => void> = {
		[DrawerContent.enterBySupplier]: async (values: SubmitTransactionDto) =>
			await submitTransaction(
				{
					...values,
					toId: shops?.find(shop => shop.mainStock)?.stockId as string,
					type: TransactionType.ENTER
				},
				shops
			),
		[DrawerContent.exit]: async (values: SubmitTransactionDto) =>
			await submitTransaction({ ...values, type: TransactionType.EXIT }, shops)
	};

	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={{
				items: []
			}}
			onFinish={values => SUBMITS[content as string](values)}
			className='h-full flex flex-col justify-between'
		>
			<Row gutter={16} className='items-center'>
				{content === DrawerContent.enterBySupplier ? (
					<Col span={24}>
						<div className='flex justify-between gap-4 pb-6'>
							<Form.Item
								name='supplierId'
								label='Proveedor'
								rules={[
									{
										required: true,
										message: 'El proveedor es requerido'
									}
								]}
								className='flex-1'
							>
								<Select
									placeholder='Seleccionar proveedor...'
									options={[
										{
											value: '5feee178-3140-44d7-80ce-67db48fd8789',
											label: 'Manuarte'
										},
										{
											value: 'bfda9954-7bff-4359-a235-dfce36bfed8c',
											label: 'Otros'
										}
									]}
								/>
							</Form.Item>
							<HiChevronDoubleRight
								size={24}
								style={{ margin: '32px auto 0 auto' }}
							/>
							<div className='flex flex-col flex-1 gap-2'>
								<span>Destino</span>
								<span className='h-[32px] px-3 py-1 bg-[#e5e5e5] rounded-md'>
									Fabrica Cascajal
								</span>
							</div>
						</div>
					</Col>
				) : null}

				{content === DrawerContent.transfer ? (
					<Col span={24}>
						<div className='flex justify-between gap-4 pb-6'>
							<Form.Item
								name='fromId'
								label='Origen'
								rules={[
									{
										required: true,
										message: 'El origen es requerido'
									}
								]}
								className='flex-1'
							>
								<Select options={stockOptions} />
							</Form.Item>
							<HiChevronDoubleRight
								size={24}
								style={{ margin: '32px auto 0 auto' }}
							/>
							<Form.Item
								name='toId'
								label='Destino'
								rules={[
									{
										required: true,
										message: 'El destino es requerido'
									}
								]}
								className='flex-1'
							>
								<Select
									placeholder='Seleccionar destino...'
									options={filteredStockOptions}
								/>
							</Form.Item>
						</div>
					</Col>
				) : null}

				{content === DrawerContent.enter ? (
					<Col span={24}>
						<div className='flex justify-between gap-4 pb-4'>
							<div className='flex flex-col flex-1 gap-2'>
								<span>Destino</span>
								<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
									Seleccionar bodega de destino
								</span>
							</div>
							<div className='flex flex-col flex-1 gap-2'>
								<span>Lista de transferencias</span>
								<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
									Seleccionar...
								</span>
							</div>
						</div>
					</Col>
				) : null}

				{content === DrawerContent.exit ? (
					<Col xs={24} sm={12}>
						<Form.Item
							name='fromId'
							label='Stock'
							rules={[
								{
									required: true,
									message: 'El stock es requerido'
								}
							]}
							className='flex-1'
						>
							<Select
								placeholder='Seleccionar stock...'
								options={stockOptions}
							/>
						</Form.Item>
					</Col>
				) : null}

				{content !== DrawerContent.enter ? (
					<>
						<Col span={24}>
							<Form.Item
								name='description'
								label='Descripción'
								rules={[
									{
										required: true,
										message: 'La descripción es requerida'
									}
								]}
							>
								<Input.TextArea placeholder='Ingresa una descripción' />
							</Form.Item>
						</Col>
						<Col span={24}>
							{content === DrawerContent.enterBySupplier || fromId ? (
								<TransactionsProductFormList
									form={form}
									itemsError={itemsError}
									setItemsError={setItemsError}
									fromShopSlug={fromShopSlug}
								/>
							) : null}
						</Col>
					</>
				) : null}
			</Row>

			<div className='flex flex-col items-end py-4 bg-white'>
				<Button
					type='primary'
					className='w-[90%] max-w-[200px]'
					style={{ fontWeight: 600 }}
					htmlType='submit'
					loading={isLoading}
				>
					ENVIAR
				</Button>
			</div>
		</Form>
	);
};

export default TransactionsForm;
