'use client';
import { useRef } from 'react';
import { Button, notification } from 'antd';
import { IoDownloadOutline } from 'react-icons/io5';
import { PiInvoice } from 'react-icons/pi';
import { BsSendArrowDown } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import QuotePDF from '../QuotePDF';

interface QuotePDFContainerProps {
	quote: Quote;
	shopSlug: string;
}

const QuotePDFContainer = ({ quote, shopSlug }: QuotePDFContainerProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const shopAbbr = shopSlug
		.split('-')
		.map(word => word.charAt(0))
		.join('')
		.toUpperCase();

	const downloadPDF = useReactToPrint({
		contentRef,
		bodyClass: 'p-4',
		documentTitle: `${shopAbbr}-CT${quote.serialNumber}-${quote.customerName.toUpperCase()}`
	});

	const sendDocument = async () => {
		if (quote.customerPhoneNumber) {
			const countryCode = quote.currency === 'COP' ? '57' : '593';
			const phoneNumber = `${countryCode}${quote.customerPhoneNumber}`;
			const message = 'Hola, aquí tienes el documento solicitado';
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

			window.open(whatsappUrl, '_blank');
		}

		notification.info({
			message: 'El cliente no tiene un número de teléfono asociado'
		});
	};

	return (
		<>
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
					>
						Enviar
					</Button>
				</div>
				<Button
					variant='outlined'
					color='primary'
					icon={
						<PiInvoice
							size={18}
							style={{ display: 'flex', alignItems: 'center' }}
						/>
					}
				>
					Generar Factura
				</Button>
			</div>

			<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] rounded-lg'>
				<div className='m-4 max-h-[480px] overflow-y-auto custom-scrollbar'>
					<QuotePDF quote={quote} pdfRef={contentRef} />
				</div>
			</div>
		</>
	);
};

export default QuotePDFContainer;
