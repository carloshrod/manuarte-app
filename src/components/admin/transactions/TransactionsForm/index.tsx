import useForm from '@/hooks/useForm';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { HiChevronDoubleRight } from 'react-icons/hi';
import TransactionsProductFormList from '../../common/input-data/TransactionsProductFormList';
import { useSelector } from 'react-redux';
import { DrawerContent, TransactionType } from '@/types/enums';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { formatToTitleCase } from '@/utils/formats';
import { transactionServices } from '@/services/transactionServices';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useDrawerStore } from '@/stores/drawerStore';

const TransactionsForm = () => {
	const {
		form,
		isLoading,
		itemsError,
		setItemsError,
		submitTransaction,
		submitUpdateTransaction
	} = useForm();
	const { content, dataToHandle } = useDrawerStore.getState();
	const { shops } = useSelector((state: RootState) => state.shop);
	const [transfers, setTransfers] = useState<Transaction[]>([]);
	const [selectedTransfer, setSelectedTransfer] = useState<Transaction | null>(
		null
	);
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';
	const shopName =
		session?.user?.shop && session?.user?.shop.toUpperCase().replace('-', ' ');

	const fetchTransfers = async (toId: string) => {
		try {
			const data = await transactionServices.getAll(toId);
			if (data) {
				setTransfers(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (
			shops?.length > 0 &&
			content === DrawerContent.enterByProduction &&
			!isAdmin
		) {
			form.setFieldsValue({
				fromId: shops?.find(shop => shop.slug === session?.user?.shop)?.stockId
			});
		}

		if (shops?.length > 0 && content === DrawerContent.transfer) {
			form.setFieldsValue({
				fromId: shops?.find(shop => shop.mainStock)?.stockId
			});
		}

		if (dataToHandle) {
			form.setFieldsValue({
				fromId: dataToHandle?.fromId,
				toId: dataToHandle?.toId,
				description: dataToHandle?.description,
				items: dataToHandle?.items?.map((item: TransactionItem) => {
					return {
						id: item?.id,
						quantity: item?.quantity,
						productVariantId: item?.productVariantId,
						stockItemId: item?.stockItemId,
						stockItemQuantity: item?.stockItemQuantity,
						name: `${item?.productName} ${item?.productVariantName}`
					};
				})
			});
		}

		if (content === DrawerContent.enter && !isAdmin) {
			const defaultToId = shops.find(
				shp => shp?.slug === session?.user?.shop
			)?.stockId;
			form.setFieldsValue({
				toId: defaultToId
			});

			if (defaultToId) {
				fetchTransfers(defaultToId);
			}
		}

		if (content === DrawerContent.exit && !isAdmin) {
			const defaultFromId = shops.find(
				shp => shp?.slug === session?.user?.shop
			)?.stockId;
			form.setFieldsValue({
				fromId: defaultFromId
			});
		}
	}, []);

	const handleStockToChange = async (toId: string) => {
		if (content === DrawerContent.enter && toId) {
			fetchTransfers(toId);

			setSelectedTransfer(null);
			form.setFieldsValue({ transferId: undefined });
		}
	};

	const transferId = useWatch('transferId', form);
	useEffect(() => {
		if (content === DrawerContent.enter && transferId) {
			const toId = form.getFieldValue('toId');
			const fetchItems = async () => {
				const items: TransactionItem[] =
					transferId && (await transactionServices.getItems(transferId, toId));

				form.setFieldsValue({
					items: items?.map(item => {
						return {
							quantity: item?.quantity,
							productVariantId: item?.productVariantId,
							stockItemId: item?.stockItemId,
							name: `${item?.productName} ${item?.productVariantName}`
						};
					})
				});
			};

			fetchItems();
			const transfer = transfers?.find(transf => transf.id === transferId);
			if (transfer) {
				setSelectedTransfer(transfer);
			}
		}
	}, [transferId]);

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

	const transferOptions = transfers?.map(transf => {
		return {
			value: transf?.id,
			label: formatToTitleCase(transf?.description)
		};
	});

	const fromShopSlug = fromId
		? shops?.find(shop => shop.stockId === fromId)?.slug
		: undefined;

	const SUBMITS: Record<
		string,
		{ fn: (values: SubmitTransactionDto) => void; label: string }
	> = {
		[DrawerContent.enterByProduction]: {
			fn: async (values: SubmitTransactionDto) => {
				const toId =
					shops?.find(shop => {
						return isAdmin ? shop.mainStock : shop.slug === session?.user?.shop;
					})?.stockId || '';

				await submitTransaction(
					{
						...values,
						toId,
						type: TransactionType.ENTER
					},
					shops
				);
			},
			label: 'INGRESAR'
		},
		[DrawerContent.transfer]: {
			fn: async (values: SubmitTransactionDto) => {
				if (!dataToHandle) {
					await submitTransaction(
						{ ...values, type: TransactionType.TRANSFER },
						shops
					);
				} else {
					await submitUpdateTransaction({ ...values }, dataToHandle?.id, shops);
				}
			},
			label: dataToHandle ? 'EDITAR' : 'TRANSFERIR'
		},
		[DrawerContent.enter]: {
			fn: async (values: SubmitTransactionDto) =>
				await submitTransaction(
					{
						...values,
						fromId: selectedTransfer?.fromId as string,
						type: TransactionType.ENTER,
						description: `Ingreso: ${selectedTransfer?.description}`
					},
					shops
				),
			label: 'INGRESAR'
		},
		[DrawerContent.exit]: {
			fn: async (values: SubmitTransactionDto) =>
				await submitTransaction(
					{ ...values, type: TransactionType.EXIT },
					shops
				),
			label: 'EGRESAR'
		}
	};

	const submit = SUBMITS[content as string];

	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={{
				items: []
			}}
			onFinish={values => submit?.fn(values) ?? null}
			className='h-full flex flex-col justify-between'
		>
			<Row gutter={16} className='items-center'>
				{content === DrawerContent.enterByProduction ? (
					<Col span={12}>
						<div className='flex flex-col flex-1 gap-2 pb-6'>
							<span>Destino</span>
							<span className='h-[32px] px-3 py-1 bg-[#e5e5e5] rounded-md'>
								{isAdmin
									? 'Fabrica Cascajal'
									: shopName && formatToTitleCase(shopName)}
							</span>
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
								className='flex-1 custom-disabled-select'
							>
								<Select
									options={stockOptions}
									onChange={value => {
										if (value === form.getFieldValue('toId')) {
											form.setFieldsValue({ toId: undefined });
										}
									}}
									disabled={dataToHandle}
								/>
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
								className='flex-1 custom-disabled-select'
							>
								<Select
									placeholder='Seleccionar destino...'
									options={filteredStockOptions}
									disabled={dataToHandle}
								/>
							</Form.Item>
						</div>
					</Col>
				) : null}

				{content === DrawerContent.enter ? (
					<>
						<Col span={12}>
							<Form.Item
								name='toId'
								label='Destino'
								rules={[
									{
										required: true,
										message: 'El destino es requerido'
									}
								]}
								className='custom-disabled-select'
							>
								<Select
									placeholder='Seleccionar destino...'
									options={stockOptions}
									onChange={value => handleStockToChange(value)}
									disabled={!isAdmin}
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name='transferId'
								label='Lista de transferencias'
								rules={[
									{
										required: true,
										message: 'La transferencia es requerida'
									}
								]}
							>
								<Select
									placeholder='Seleccionar transferencia...'
									options={transferOptions}
								/>
							</Form.Item>
						</Col>
						{selectedTransfer?.id ? (
							<Col span={24}>
								<div className='flex justify-between gap-4 mb-4'>
									<div className='flex flex-col flex-1 gap-2'>
										<span>Origen</span>
										<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
											{selectedTransfer?.fromName}
										</span>
									</div>
									<div className='flex flex-col flex-1 gap-2'>
										<span>Fecha</span>
										<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
											{moment(selectedTransfer?.createdDate)
												.startOf('day')
												.format('YYYY/MM/DD')}
										</span>
									</div>
								</div>
							</Col>
						) : null}
					</>
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
							className='flex-1 custom-disabled-select'
						>
							<Select
								placeholder='Seleccionar stock...'
								options={stockOptions}
								disabled={!isAdmin}
							/>
						</Form.Item>
					</Col>
				) : null}

				<>
					{content !== DrawerContent.enter ? (
						<Col span={24}>
							<Form.Item
								name='description'
								label='Descripción'
								rules={[
									{
										required: content !== DrawerContent.enterByProduction,
										message: 'La descripción es requerida'
									}
								]}
							>
								<Input.TextArea placeholder='Ingresa una descripción' />
							</Form.Item>
						</Col>
					) : null}

					{selectedTransfer?.id ? (
						<Divider orientation='left'>Productos</Divider>
					) : null}

					<Col span={24}>
						{content === DrawerContent.enterByProduction ||
						fromId ||
						selectedTransfer?.id ||
						dataToHandle ? (
							<TransactionsProductFormList
								form={form}
								itemsError={itemsError}
								setItemsError={setItemsError}
								fromShopSlug={isAdmin ? fromShopSlug : session?.user?.shop}
							/>
						) : null}
					</Col>
				</>
			</Row>

			<div className='flex flex-col items-end py-4 bg-white'>
				<Button
					type='primary'
					className='w-[90%] max-w-[200px]'
					style={{ fontWeight: 600 }}
					htmlType='submit'
					loading={isLoading}
				>
					{submit?.label ?? 'ENVIAR'}
				</Button>
			</div>
		</Form>
	);
};

export default TransactionsForm;
