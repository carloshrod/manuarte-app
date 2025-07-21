import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { IoMdAdd } from 'react-icons/io';
import { ButtonVariantType } from 'antd/es/button';
import { ReactNode } from 'react';

interface DropdownMenuProps {
	items: MenuProps['items'];
	variant?: ButtonVariantType;
	prependIcon?: boolean;
	label: string;
	children?: ReactNode;
}

const DropdownMenu = ({
	items,
	variant = 'outlined',
	prependIcon = true,
	label,
	children
}: DropdownMenuProps) => {
	return (
		<Dropdown menu={{ items }}>
			{!children ? (
				<Button variant={variant} color='primary' style={{ cursor: 'default' }}>
					{prependIcon ? (
						<IoMdAdd
							size={18}
							style={{ display: 'flex', alignItems: 'center' }}
						/>
					) : null}
					<p className='max-sm:hidden'>{label}</p>
					<DownOutlined />
				</Button>
			) : (
				children
			)}
		</Dropdown>
	);
};

export default DropdownMenu;
