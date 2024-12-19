import { Menu, Skeleton } from 'antd';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import getMenuItems from './getMenuItems';
import { useDispatch } from 'react-redux';
import { openModal } from '@/reducers/ui/uiSlice';
import { usePathname } from 'next/navigation';
import { ModalContent } from '@/types/enums';

const SidebarMenu = ({ session }: { session: Session | null }) => {
	const menuItems = getMenuItems(session as Session);
	const [selectedItem, setSelectedItem] = useState<string[]>([]);
	const dispatch = useDispatch();
	const pathname = usePathname();

	const getInitialSelectedItem = (pathname: string) => {
		return menuItems.find(item => item.path === pathname)?.key || '1';
	};

	useEffect(() => {
		const newSelectedItem = [getInitialSelectedItem(pathname)];
		setSelectedItem(newSelectedItem);
	}, [pathname, session]);

	const handleMenuSelect = ({ key }: { key: string }) => {
		if (key !== 'logout') setSelectedItem([key]);
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
			selectedKeys={session ? selectedItem : undefined}
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
