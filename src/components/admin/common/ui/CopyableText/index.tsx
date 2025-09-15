import { Tooltip } from 'antd';
import { useState } from 'react';

const CopyableText = ({ text }: { text: string }) => {
	const [tooltip, setTooltip] = useState('Copiar');

	const copyText = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setTooltip('Copiado ✓');
			setTimeout(() => setTooltip('Copiar'), 1500);
		} catch (err) {
			console.error('Error al copiar:', err);
			setTooltip('Error');
			setTimeout(() => setTooltip('Copiar'), 1500);
		}
	};
	return (
		<Tooltip title={tooltip}>
			<span
				onClick={copyText}
				style={{
					cursor: 'pointer'
				}}
			>
				{text}
			</span>
		</Tooltip>
	);
};

export default CopyableText;
