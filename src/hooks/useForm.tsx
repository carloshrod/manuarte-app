import { ModalContentKey, ModalSubmitFnKey } from '@/enums';
import { addProduct } from '@/reducers/products/productSlice';
import { closeModal } from '@/reducers/ui/uiSlice';
import { createProduct } from '@/services/productServices';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';

const useForm = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const submitCreateProduct = async (values: ProductCreationAttr) => {
		try {
			const res = await createProduct(values);

			if (res?.status === 201) {
				dispatch(addProduct(res?.data));
				console.log('Producto agregado con éxito!');
				dispatch(closeModal());
			}
		} catch (error) {
			console.error(error);
		}
	};

	const SUBMIT_FUNCTIONS: Record<
		ModalSubmitFnKey,
		(values: any) => Promise<void>
	> = {
		[ModalContentKey.Products]: submitCreateProduct
	};

	return { form, SUBMIT_FUNCTIONS };
};

export default useForm;
