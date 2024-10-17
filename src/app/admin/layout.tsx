'use client';
import { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import {
	TbLayoutSidebarLeftCollapseFilled,
	TbLayoutSidebarRightCollapseFilled
} from 'react-icons/tb';
import { PiUserCircle } from 'react-icons/pi';
import { menuItems } from './consts';

const { Header, Sider, Content } = Layout;
const AdminLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [collapsed, setCollapsed] = useState(false);
	const [selectedItem, setSelectedItem] = useState(['1']);
	const [hide, setHide] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

	return (
		<Layout className='h-screen'>
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
					onSelect={({ key }) => (key !== '9' ? setSelectedItem([key]) : null)}
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
						Administrador
					</Button>
				</Header>
				<Content
					style={{
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
