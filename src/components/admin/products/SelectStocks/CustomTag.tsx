import { ReactNode } from 'react';

interface CustomTagProps {
	label: ReactNode;
	isFixed: boolean;
	onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CustomTag = ({ label, isFixed, onClose }: CustomTagProps) => {
	return (
		<span
			className='ant-select-selection-item'
			style={{ userSelect: 'none', marginRight: 3 }}
		>
			<span className='ant-select-selection-item-content'>{label}</span>
			{!isFixed && (
				<span
					className='ant-select-selection-item-remove'
					style={{
						fontSize: 24,
						fontWeight: 300
					}}
					onMouseDown={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onClick={onClose}
				>
					×
				</span>
			)}
		</span>
	);
};

export default CustomTag;
