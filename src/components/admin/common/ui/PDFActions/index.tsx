import { Button, MenuProps, notification, Space } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import { BsSendArrowDown } from 'react-icons/bs';
import { PiInvoice } from 'react-icons/pi';
import { RefObject } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BillingStatus, ModalContent } from '@/types/enums';
import { useModalStore } from '@/stores/modalStore';
import DropdownMenu from '../DropdownMenu';
import { MdOutlinePendingActions } from 'react-icons/md';

const PDFActions = ({
	isQuote,
	data,
	shopSlug,
	contentRef
}: {
	isQuote: boolean;
	data: Quote | Billing;
	shopSlug: string;
	contentRef: RefObject<HTMLDivElement>;
}) => {
	const { openModal } = useModalStore.getState();

	const city = data?.city?.toUpperCase() ?? 'NA';
	const customerName = data?.fullName?.toUpperCase() ?? 'CONSUMIDOR FINAL';
	const currency = shopSlug.includes('quito') ? 'USD' : 'COP';
	const isNotPaid = data?.status !== BillingStatus.PAID;

	const downloadPDF = useReactToPrint({
		contentRef,
		bodyClass: 'p-4',
		documentTitle: `${city} - ${customerName}`
	});

	const sendDocument = async () => {
		if (data?.phoneNumber) {
			const countryCode = currency === 'COP' ? '57' : '593';
			const phoneNumber = `${countryCode}${data.phoneNumber}`;
			const message = 'Hola, aquí tienes el documento solicitado';
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

			window.open(whatsappUrl, '_blank');
			return;
		}

		notification.info({
			message: 'El cliente no tiene un número de teléfono asociado'
		});
	};

	const dropDownItems: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Space className='px-2'>
					<Button
						variant='text'
						color='primary'
						icon={
							<PiInvoice
								size={18}
								style={{ display: 'flex', alignItems: 'center' }}
							/>
						}
						onClick={() =>
							openModal({
								title: 'Generar Factura',
								content: ModalContent.billings,
								dataToHandle: data
							})
						}
					>
						Generar Factura
					</Button>
				</Space>
			)
		},
		{
			key: '2',
			label: (
				<Space className='px-2'>
					<Button
						variant='text'
						color='primary'
						icon={
							<MdOutlinePendingActions
								size={18}
								style={{ display: 'flex', alignItems: 'center' }}
							/>
						}
						onClick={() =>
							openModal({
								title: 'Pedido | Abono',
								content: ModalContent.billingsPartialPayment,
								dataToHandle: data
							})
						}
					>
						Pedido | Abono
					</Button>
				</Space>
			)
		}
	];

	return (
		<div className='flex items-center justify-between ps-4'>
			<div className='flex gap-2'>
				<Button
					variant='outlined'
					color='primary'
					icon={
						<IoDownloadOutline
							size={18}
							style={{ display: 'flex', alignItems: 'center' }}
						/>
					}
					onClick={() => downloadPDF()}
				>
					Descargar
				</Button>
				<Button
					variant='outlined'
					color='primary'
					icon={
						<BsSendArrowDown
							size={18}
							style={{ display: 'flex', alignItems: 'center' }}
						/>
					}
					onClick={sendDocument}
					disabled={!isQuote && isNotPaid}
				>
					Enviar
				</Button>
			</div>
			{isQuote ? <DropdownMenu items={dropDownItems} label='Factura' /> : null}
		</div>
	);
};

export default PDFActions;
