'use client';
import { useEffect, useRef, useState } from 'react';
import QuotePDF from '@/components/admin/quotes/QuotePDF';
import BillingPDF from '@/components/admin/billings/BillingPDF';
import { quoteServices } from '@/services/quoteServices';
import { billingServices } from '@/services/billingServices';
import PDFActions from '../../ui/PDFActions';

interface QuotePDFContainerProps {
	shopSlug: string;
	serialNumber: string;
	isQuote: boolean;
}

const PDFContainer = ({
	shopSlug,
	serialNumber,
	isQuote
}: QuotePDFContainerProps) => {
	const [data, setData] = useState<Quote | Billing>();
	const contentRef = useRef<HTMLDivElement>(null);
	const currency = shopSlug.includes('quito') ? 'USD' : 'COP';

	const fetchData = async () => {
		if (serialNumber) {
			const data = isQuote
				? await quoteServices.getOne({ serialNumber })
				: await billingServices.getOne({ serialNumber });

			setData(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<PDFActions
				isQuote={isQuote}
				data={isQuote ? (data as Quote) : (data as Billing)}
				contentRef={contentRef}
				shopSlug={shopSlug}
			/>

			<div className='shadow-[6px_6px_24px_rgba(0,0,0,0.25)] rounded-lg'>
				{data ? (
					<div className='m-4 max-h-[480px] overflow-y-auto custom-scrollbar'>
						{isQuote ? (
							<QuotePDF
								quote={{ ...(data as Quote), currency }}
								pdfRef={contentRef}
								shopSlug={shopSlug}
							/>
						) : (
							<BillingPDF
								billing={{ ...(data as Billing), currency }}
								pdfRef={contentRef}
								shopSlug={shopSlug}
							/>
						)}
					</div>
				) : null}
			</div>
		</>
	);
};

export default PDFContainer;
