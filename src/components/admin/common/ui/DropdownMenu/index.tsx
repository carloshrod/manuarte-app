import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { IoMdAdd } from 'react-icons/io';

interface DropdownMenuProps {
	items: MenuProps['items'];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
	return (
		<Dropdown menu={{ items }}>
			<Button variant='outlined' color='primary'>
				<IoMdAdd size={18} style={{ display: 'flex', alignItems: 'center' }} />
				<p className='max-sm:hidden'>Factura</p>
				<DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default DropdownMenu;
