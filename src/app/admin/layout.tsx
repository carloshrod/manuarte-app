'use client';
import { useEffect, useState } from 'react';
import { Button, Layout, Skeleton, theme } from 'antd';
import {
	TbLayoutSidebarLeftCollapseFilled,
	TbLayoutSidebarRightCollapseFilled
} from 'react-icons/tb';
import { PiUserCircle } from 'react-icons/pi';
import { Provider } from 'react-redux';
import CustomModal from '@/components/layout/Modal';
import store from '@/reducers/store';
import { useSession } from 'next-auth/react';
import { formatToTitleCase } from '@/utils/utils';
import SidebarMenu from '../../components/layout/SidebarMenu';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [collapsed, setCollapsed] = useState(false);
	const [hide, setHide] = useState(false);
	const { data: session, update } = useSession();

	useEffect(() => {
		update();
	}, []);

	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

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
					<SidebarMenu session={session} />
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
							{session ? (
								<div>
									<span className='font-bold me-2'>
										{formatToTitleCase(session?.user?.roleName as string)}:
									</span>{' '}
									{session?.user?.email}
								</div>
							) : (
								<Skeleton.Button active style={{ width: 200 }} />
							)}
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
