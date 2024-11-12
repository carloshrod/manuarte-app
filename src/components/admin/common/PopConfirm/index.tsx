import { Popconfirm, PopconfirmProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const PopConfirm = ({ title, onConfirm, children }: PopconfirmProps) => {
	return (
		<Popconfirm
			title={title}
			description='¿Estás seguro de que quieres borrar esta presentación del producto?'
			onConfirm={onConfirm}
			okText='Sí'
			okButtonProps={{ style: { width: 50 } }}
			cancelText='No'
			cancelButtonProps={{
				style: { width: 50 },
				variant: 'outlined',
				color: 'danger'
			}}
			placement='left'
			icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
		>
			{children}
		</Popconfirm>
	);
};

export default PopConfirm;
