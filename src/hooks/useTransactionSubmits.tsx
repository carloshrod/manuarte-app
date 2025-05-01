import { DrawerContent, TransactionType } from '@/types/enums';
import useForm from './useForm';
import { useSession } from 'next-auth/react';
import { useDrawerStore } from '@/stores/drawerStore';

interface TransactionSubmitValueProps {
	fn: (values: SubmitTransactionDto) => Promise<void>;
	label: string;
	confirmTitle: string;
	confirmText: string;
}

const useTransactionSubmits = ({
	shops,
	selectedTransfer
}: {
	shops: Shop[];
	selectedTransfer: Transaction | null;
}) => {
	const { submitTransaction, submitUpdateTransaction } = useForm();
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';
	const { dataToHandle } = useDrawerStore.getState();

	const TRANSACTION_SUBMITS: Record<string, TransactionSubmitValueProps> = {
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
			label: 'INGRESAR',
			confirmTitle:
				'¿Estás seguro de que quieres hacer este ingreso de stock directo?',
			confirmText:
				'Se ingresarán al stock las cantidades para los items agregados'
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
			label: dataToHandle ? 'EDITAR' : 'TRANSFERIR',
			confirmTitle:
				'¿Estás seguro de que quieres hacer esta transferencia de stock?',
			confirmText:
				'Se egresarán del stock de origen las cantidades para los items agregados'
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
			label: 'INGRESAR',
			confirmTitle:
				'¿Estás seguro de que quieres hacer este ingreso de stock por transferencia?',
			confirmText:
				'Se ingresarán al stock de destino las cantidades para los items agregados'
		},
		[DrawerContent.exit]: {
			fn: async (values: SubmitTransactionDto) =>
				await submitTransaction(
					{ ...values, type: TransactionType.EXIT },
					shops
				),
			label: 'EGRESAR',
			confirmTitle: '¿Estás seguro de que quieres hacer este egreso de stock?',
			confirmText:
				'Se egresarán del stock las cantidades para los items agregados'
		}
	};

	return { TRANSACTION_SUBMITS };
};

export default useTransactionSubmits;
