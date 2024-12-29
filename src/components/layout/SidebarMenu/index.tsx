import { Menu, Skeleton } from 'antd';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import getMenuItems, { allMenuItems } from './getMenuItems';
import { useDispatch } from 'react-redux';
import { openModal } from '@/reducers/ui/uiSlice';
import { usePathname } from 'next/navigation';
import { ModalContent } from '@/types/enums';

const SidebarMenu = ({ session }: { session: Session | null }) => {
	const menuItems = getMenuItems(session as Session);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const dispatch = useDispatch();
	const pathname = usePathname();

	useEffect(() => {
		const selectedItem =
			allMenuItems.find(item => {
				return pathname.startsWith(item.path);
			})?.key || '';
		setSelectedItems([selectedItem]);
	}, [pathname]);

	const handleMenuSelect = ({ key }: { key: string }) => {
		if (key !== 'logout') setSelectedItems([key]);
	};

	const handleConfirmLogout = ({ key }: { key: string }) => {
		if (key === 'logout') {
			dispatch(
				openModal({
					title: '',
					content: ModalContent.logout
				})
			);
		}
	};

	return session ? (
		<Menu
			className='flex flex-col gap-1'
			theme='dark'
			mode='inline'
			defaultSelectedKeys={session ? ['1'] : []}
			selectedKeys={session ? selectedItems : undefined}
			onSelect={handleMenuSelect}
			items={menuItems}
			onClick={handleConfirmLogout}
		/>
	) : (
		<ul className='flex flex-col gap-1'>
			{Array.from({ length: 8 }).map((_, index) => (
				<li key={index} className='m-1'>
					<Skeleton.Button
						active
						block
						style={{ height: 40, outline: '1px solid transparent' }}
					/>
				</li>
			))}
		</ul>
	);
};

export default SidebarMenu;
