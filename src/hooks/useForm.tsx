import { useState } from 'react';
import { Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { productServices } from '@/services/productServices';
import { productCategoryServices } from '@/services/productCategoryServices';
import { userServices } from '@/services/userServices';
import {
	addProduct,
	addProductVariant,
	getProductVariants
} from '@/reducers/products/productSlice';
import { closeModal } from '@/reducers/ui/uiSlice';
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
import { AxiosError, AxiosResponse } from 'axios';

notification.config({
	placement: 'topRight',
	duration: 3
});

interface handleSubmitProps {
	serviceFn: (values: any) => Promise<AxiosResponse>;
	values: any;
	onSuccess: (res: AxiosResponse) => void;
}

const useForm = () => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

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
				dispatch(closeModal());
			}
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
		values: { name: string },
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

	return {
		form,
		isLoading,
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
		submitUpdateCustomer
	};
};

export default useForm;
