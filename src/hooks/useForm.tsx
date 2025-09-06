import { useState } from 'react';
import { Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { AxiosError, AxiosResponse } from 'axios';
import { productServices } from '@/services/productServices';
import { productCategoryServices } from '@/services/productCategoryServices';
import { userServices } from '@/services/userServices';
import {
	addProduct,
	addProductVariant,
	getProductVariants
} from '@/reducers/products/productSlice';
import {
	addProductCategory,
	updateProductCategory
} from '@/reducers/productCategories/productCategorySlice';
import {
	addCustomer,
	addStaff,
	updateCustomer,
	updateStaff,
	updateStaffPermissions
} from '@/reducers/users/userSlice';
import { quoteServices } from '@/services/quoteServices';
import { addQuote, updateQuote } from '@/reducers/quotes/quoteSlice';
import { billingServices } from '@/services/billingServices';
import { addBilling, updateBilling } from '@/reducers/billings/billingSlice';
import { stockItemServices } from '@/services/stockItemServices';
import {
	addStockItem,
	updateStockItem
} from '@/reducers/stockItems/stockItemSlice';
import { transactionServices } from '@/services/transactionServices';
import {
	addTransaction,
	updateTransaction,
	updateTransactionState
} from '@/reducers/transactions/transactionSlice';
import { useModalStore } from '@/stores/modalStore';
import { useDrawerStore } from '@/stores/drawerStore';
import usePdf from './usePdf';
import { validateUniqueProductVariantsName } from './utils';
import { BillingStatus } from '@/types/enums';
import { cashSessionServices } from '@/services/cashSessionServices';
import {
	addCashMovement,
	setCashSession
} from '@/reducers/cashSession/cashSessionSlice';

notification.config({
	placement: 'topRight',
	duration: 3
});

interface handleSubmitProps {
	serviceFn: (values: any) => Promise<AxiosResponse>;
	values: any;
	onSuccess: (res: AxiosResponse) => void;
	modal?: boolean;
}

const useForm = () => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [itemsError, setItemsError] = useState(false);
	const dispatch = useDispatch();
	const { closeModal } = useModalStore.getState();
	const { closeDrawer } = useDrawerStore.getState();
	const { sendPdfAfterCreateDoc } = usePdf();

	const handleSubmit = async ({
		serviceFn,
		values,
		onSuccess
	}: handleSubmitProps) => {
		try {
			setIsLoading(true);
			const res = await serviceFn(values);

			if (res?.status === 200 || res?.status === 201) {
				notification.success({
					message: res.data.message ?? 'Operación realizada con éxito'
				});
				onSuccess(res);
				closeModal();
				closeDrawer();
			}
			return res;
		} catch (error) {
			console.error(error);
			const message =
				error instanceof AxiosError
					? error?.response?.data.message
					: 'Ocurrió un error. Inténtalo más tarde';
			notification.error({ message });
		} finally {
			setIsLoading(false);
		}
	};

	const submitCreateProduct = async (values: SubmitProductDto) => {
		const pVariantsAreUnique =
			values.productVariants &&
			validateUniqueProductVariantsName(values.productVariants);

		if (!pVariantsAreUnique) {
			return notification.error({
				message:
					'Estás intentando crear más de una presentación con el mismo nombre'
			});
		}

		await handleSubmit({
			serviceFn: productServices.createProduct,
			values,
			onSuccess: res => dispatch(addProduct(res.data.newProduct))
		});
	};

	const submitUpdateProduct = async (
		values: SubmitProductDto,
		productId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				productServices.updateProduct(valuesToUpdate, productId),
			values,
			onSuccess: async () => {
				const productVariantsData =
					await productServices.getAllProductVariants(false);
				dispatch(getProductVariants(productVariantsData));
			}
		});
	};

	const submitUpdateProductVariant = async (
		values: SubmitProductDto,
		productVariantId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				productServices.updateProductVariant(valuesToUpdate, productVariantId),
			values,
			onSuccess: async () => {
				const productVariantsData =
					await productServices.getAllProductVariants(false);
				dispatch(getProductVariants(productVariantsData));
			}
		});
	};

	const submitAddProductVariant = async (
		values: Omit<SubmitProductVariantDto, 'productId'>,
		productId: string
	) => {
		await handleSubmit({
			serviceFn: async newVariantValues =>
				productServices.addProductVariant(newVariantValues, productId),
			values,
			onSuccess: res => dispatch(addProductVariant(res.data.newProductVariant))
		});
	};

	const submitCreateProductCategory = async (values: { name: string }) => {
		await handleSubmit({
			serviceFn: productCategoryServices.createProductCategory,
			values,
			onSuccess: res =>
				dispatch(addProductCategory(res.data.newProductCategory))
		});
	};

	const submitUpdateProductCategory = async (
		values: { name: string },
		productCategoryId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				productCategoryServices.updateProductCategory(
					valuesToUpdate,
					productCategoryId
				),
			values,
			onSuccess: res =>
				dispatch(updateProductCategory(res.data.updatedProductCategory))
		});
	};

	const submitRegisterStaff = async (values: SubmitStaffDto) => {
		await handleSubmit({
			serviceFn: userServices.registerStaff,
			values,
			onSuccess: res => dispatch(addStaff(res.data.newUser))
		});
	};

	const submitUpdateStaff = async (
		values: SubmitStaffDto,
		personId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				userServices.updateStaff(valuesToUpdate, personId),
			values,
			onSuccess: res => dispatch(updateStaff(res.data.updatedUser))
		});
	};

	const submitEditPermissions = async (
		values: { extraPermissions: string[] },
		userId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				userServices.setPermissions(valuesToUpdate, userId),
			values,
			onSuccess: () =>
				dispatch(
					updateStaffPermissions({
						extraPermissions: values.extraPermissions,
						userId
					})
				)
		});
	};

	const submitRegisterCustomer = async (values: SubmitCustomerDto) => {
		await handleSubmit({
			serviceFn: userServices.registerCustomer,
			values,
			onSuccess: res => dispatch(addCustomer(res.data.newCustomer))
		});
	};

	const submitUpdateCustomer = async (
		values: SubmitCustomerDto,
		personId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				userServices.updateCustomer(valuesToUpdate, personId),
			values,
			onSuccess: res => dispatch(updateCustomer(res.data.updatedCustomer))
		});
	};

	const submitCreateQuote = async (values: SubmitQuoteDto) => {
		if (values?.items?.length < 1) {
			setItemsError(true);
			return;
		}

		await handleSubmit({
			serviceFn: quoteServices.create,
			values,
			onSuccess: async res => {
				dispatch(addQuote(res?.data?.newQuote));

				if (values?.phoneNumber) {
					await sendPdfAfterCreateDoc({
						isQuote: true,
						serialNumber: res?.data?.newQuote?.serialNumber,
						shopSlug: values?.shopSlug as string
					});
				}
			}
		});
	};

	const submitUpdateQuote = async (values: SubmitQuoteDto, quoteId: string) => {
		if (values?.items?.length < 1) {
			setItemsError(true);
			return;
		}

		await handleSubmit({
			serviceFn: valuesToUpdate =>
				quoteServices.update(valuesToUpdate, quoteId),
			values,
			onSuccess: async res => {
				dispatch(updateQuote(res.data.updatedQuote));

				if (values?.phoneNumber) {
					await sendPdfAfterCreateDoc({
						isQuote: true,
						serialNumber: res?.data?.updatedQuote?.serialNumber,
						shopSlug: values?.shopSlug as string
					});
				}
			}
		});
	};

	const submitCreateBilling = async ({
		values,
		fetchBillings = undefined
	}: {
		values: SubmitBillingDto;
		fetchBillings?: () => void;
	}) => {
		return await handleSubmit({
			serviceFn: billingServices.create,
			values,
			onSuccess: async res => {
				if (fetchBillings) {
					fetchBillings();
				}
				dispatch(addBilling(res.data.newBilling));
				const { status, serialNumber } = res?.data?.newBilling;

				if (values?.phoneNumber && status === BillingStatus.PAID) {
					await sendPdfAfterCreateDoc({
						isQuote: false,
						serialNumber,
						shopSlug: values?.shopSlug as string
					});
				}
			}
		});
	};

	const submitUpdateBilling = async (
		values: {
			status: string;
			payments: Payment[];
			stockId: string;
			items: BillingItem[];
			comments: string;
		},
		currentBillingData: {
			billingId: string;
			currentStatus: BillingStatus;
			serialNumber: string;
			phoneNumber: string;
			shopSlug: string;
		}
	) => {
		const { billingId, currentStatus, serialNumber, phoneNumber, shopSlug } =
			currentBillingData;

		await handleSubmit({
			serviceFn: valuesToUpdate =>
				billingServices.update(valuesToUpdate, billingId),
			values,
			onSuccess: async _res => {
				dispatch(
					updateBilling({
						id: billingId,
						status: values?.status,
						effectiveDate: new Date().toISOString(),
						paymentMethods: values?.payments?.map(p => p?.paymentMethod) || []
					})
				);

				if (
					phoneNumber &&
					currentStatus !== BillingStatus.PAID &&
					values?.status === BillingStatus.PAID
				) {
					await sendPdfAfterCreateDoc({
						isQuote: false,
						serialNumber,
						shopSlug: shopSlug as string
					});
				}
			}
		});
	};

	const submitCreateStockItem = async (values: SubmitStockItemDto) => {
		await handleSubmit({
			serviceFn: stockItemServices.create,
			values,
			onSuccess: res => dispatch(addStockItem(res.data.newStockItem))
		});
	};

	const submitUpdateStockItem = async (
		values: SubmitStockItemDto,
		stockItemId: string
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				stockItemServices.update(valuesToUpdate, stockItemId),
			values,
			onSuccess: res => dispatch(updateStockItem(res.data.updatedStockItem))
		});
	};

	const submitTransaction = async (
		values: SubmitTransactionDto,
		shops: Shop[]
	) => {
		await handleSubmit({
			serviceFn: transactionServices.create,
			values,
			onSuccess: res => {
				const fromName = shops.find(
					shop => shop.stockId === res.data.newTransaction?.fromId
				)?.stockName;
				const toName = shops.find(
					shop => shop.stockId === res.data.newTransaction?.toId
				)?.stockName;

				const newTransaction = {
					...res.data.newTransaction,
					fromName,
					toName
				};

				dispatch(addTransaction(newTransaction));

				if (values?.transferId) {
					dispatch(
						updateTransactionState({
							id: values?.transferId,
							state: 'SUCCESS'
						})
					);
				}
			}
		});
	};

	const submitUpdateTransaction = async (
		values: SubmitTransactionDto,
		transactionId: string,
		shops: Shop[]
	) => {
		await handleSubmit({
			serviceFn: valuesToUpdate =>
				transactionServices.update(valuesToUpdate, transactionId),
			values,
			onSuccess: res => {
				const fromName = shops.find(
					shop => shop.stockId === res.data.updatedTransaction?.fromId
				)?.stockName;
				const toName = shops.find(
					shop => shop.stockId === res.data.updatedTransaction?.toId
				)?.stockName;

				const updatedTransaction = {
					...res.data.updatedTransaction,
					fromName,
					toName
				};

				dispatch(updateTransaction(updatedTransaction));
			}
		});
	};

	const submitOpenCashSession = async (
		values: { declaredOpeningAmount: number; comments?: string },
		shopId: string
	) => {
		await handleSubmit({
			serviceFn: body => cashSessionServices.open(body, shopId),
			values,
			onSuccess: res => dispatch(setCashSession(res?.data?.cashSession))
		});
	};

	const submitCloseCashSession = async (
		values: { declaredClosingAmount: number; comments?: string },
		shopId: string
	) => {
		await handleSubmit({
			serviceFn: body => cashSessionServices.close(body, shopId),
			values,
			onSuccess: res => dispatch(setCashSession(res?.data?.cashSession))
		});
	};

	const submitCreateCashMovement = async (
		values: SubmitCashMovementDto,
		shopId: string
	) => {
		await handleSubmit({
			serviceFn: body => cashSessionServices.createMovement(body, shopId),
			values,
			onSuccess: res => {
				const { newCashMovement, newBalance } = res.data ?? {};
				dispatch(addCashMovement({ newCashMovement, newBalance }));
			}
		});
	};

	return {
		form,
		isLoading,
		itemsError,
		setItemsError,
		submitCreateProduct,
		submitUpdateProduct,
		submitUpdateProductVariant,
		submitAddProductVariant,
		submitCreateProductCategory,
		submitUpdateProductCategory,
		submitRegisterStaff,
		submitUpdateStaff,
		submitEditPermissions,
		submitRegisterCustomer,
		submitUpdateCustomer,
		submitCreateQuote,
		submitUpdateQuote,
		submitCreateBilling,
		submitUpdateBilling,
		submitCreateStockItem,
		submitUpdateStockItem,
		submitTransaction,
		submitUpdateTransaction,
		submitCreateCashMovement,
		submitOpenCashSession,
		submitCloseCashSession
	};
};

export default useForm;
