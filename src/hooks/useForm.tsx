import { useState } from 'react';
import { Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { ModalContentKey, ModalSubmitFnKey } from '@/enums';
import { addProduct } from '@/reducers/products/productSlice';
import { closeModal } from '@/reducers/ui/uiSlice';
import { createProduct } from '@/services/productServices';

notification.config({
	placement: 'topRight',
	duration: 3
});

const useForm = () => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const submitCreateProduct = async (values: ProductCreationAttr) => {
		try {
			setIsLoading(true);
			const res = await createProduct(values);

			if (res?.status === 201) {
				notification.success({ message: 'Producto agregado con éxito!' });
				dispatch(addProduct(res?.data));
				dispatch(closeModal());
			}
		} catch (error) {
			console.error(error);
			notification.error({ message: 'Ocurrió un error. Intentalo más tarde' });
		} finally {
			setIsLoading(false);
		}
	};

	const SUBMIT_FUNCTIONS: Record<
		ModalSubmitFnKey,
		(values: any) => Promise<void>
	> = {
		[ModalContentKey.Products]: submitCreateProduct
	};

	return { form, isLoading, SUBMIT_FUNCTIONS };
};

export default useForm;
