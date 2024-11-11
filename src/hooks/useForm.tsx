import { useState } from 'react';
import { Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import {
	addProduct,
	addProductVariant,
	getProductVariants
} from '@/reducers/products/productSlice';
import { closeModal } from '@/reducers/ui/uiSlice';
import {
	createProductService,
	addProductVariantService,
	getAllProductVariants,
	updateProductService,
	updateProductVariantService
} from '@/services/productServices';
import { AxiosResponse } from 'axios';

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
			notification.error({ message: 'Ocurrió un error. Inténtalo más tarde' });
		} finally {
			setIsLoading(false);
		}
	};

	const submitCreateProduct = async (values: SubmitProductDto) => {
		await handleSubmit({
			serviceFn: createProductService,
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
				updateProductService(valuesToUpdate, productId),
			values,
			onSuccess: async () => {
				const productVariantsData = await getAllProductVariants();
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
				updateProductVariantService(valuesToUpdate, productVariantId),
			values,
			onSuccess: async () => {
				const productVariantsData = await getAllProductVariants();
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
				addProductVariantService(newVariantValues, productId),
			values,
			onSuccess: res => dispatch(addProductVariant(res.data.newProductVariant))
		});
	};

	return {
		form,
		isLoading,
		submitCreateProduct,
		submitUpdateProduct,
		submitUpdateProductVariant,
		submitAddProductVariant
	};
};

export default useForm;
