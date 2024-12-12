'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Layout, Menu, theme } from 'antd';
import {
	TbLayoutSidebarLeftCollapseFilled,
	TbLayoutSidebarRightCollapseFilled
} from 'react-icons/tb';
import { PiUserCircle } from 'react-icons/pi';
import { Provider } from 'react-redux';
import CustomModal from '@/components/layout/Modal';
import getMenuItems from '@/app/admin/getMenuItems';
import store from '@/reducers/store';
import { useSession } from 'next-auth/react';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [collapsed, setCollapsed] = useState(false);
	const [hide, setHide] = useState(false);
	const [selectedItem, setSelectedItem] = useState<string[]>([]);
	const pathname = usePathname();
	const { data: session, update } = useSession();
	const menuItems = getMenuItems();

	useEffect(() => {
		update();
	}, []);

	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

	const getInitialSelectedItem = (pathname: string) => {
		return (
			menuItems.find(item =>
				typeof item.label === 'string'
					? item.label === pathname
					: item.label.props.href === pathname
			)?.key || '1'
		);
	};

	useEffect(() => {
		const newSelectedItem = [getInitialSelectedItem(pathname)];
		setSelectedItem(newSelectedItem);
	}, [pathname]);

	const handleMenuSelect = ({ key }: { key: string }) => {
		if (key !== '9') setSelectedItem([key]);
	};

	return (
		<Provider store={store}>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					className='p-2'
					trigger={null}
					collapsible
					collapsed={collapsed}
					breakpoint='md'
					onBreakpoint={broken => {
						setCollapsed(broken);
						setHide(broken);
					}}
				>
					<h1 className='text-center p-4 text-2xl text-white font-bold'>
						{collapsed ? 'M' : 'MANUARTE'}
					</h1>
					<Menu
						theme='dark'
						mode='inline'
						defaultSelectedKeys={['1']}
						selectedKeys={selectedItem}
						onSelect={handleMenuSelect}
						items={menuItems}
					/>
				</Sider>
				<Layout>
					<Header
						style={{ padding: 0, background: colorBgContainer }}
						className='flex justify-end md:justify-between drop-shadow-md'
					>
						{!hide ? (
							<Button
								type='text'
								icon={
									collapsed ? (
										<TbLayoutSidebarRightCollapseFilled size={20} />
									) : (
										<TbLayoutSidebarLeftCollapseFilled size={20} />
									)
								}
								onClick={() => setCollapsed(!collapsed)}
								style={{
									fontSize: '16px',
									width: 64,
									height: 64
								}}
							/>
						) : null}
						<Button
							type='text'
							icon={<PiUserCircle size={20} />}
							iconPosition='end'
							style={{
								fontSize: '16px',
								height: 64,
								padding: '0 24px'
							}}
						>
							{session?.user?.email}
						</Button>
					</Header>
					<Content
						style={{
							height: '89vh',
							padding: 24,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							overflow: 'auto',
							scrollbarWidth: 'thin',
							scrollbarGutter: 'stable'
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
			<CustomModal />
		</Provider>
	);
};

export default AdminLayout;
