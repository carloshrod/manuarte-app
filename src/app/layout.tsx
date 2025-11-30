import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/locale/es_ES';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export const metadata: Metadata = {
	title: 'Manuarte - Admin Panel',
	description:
		'Panel de administración de Manuarte, fabricante y proveedor de insumos para la elaboración de jabones y velas artesanales',
	icons: {
		icon: '/favicon.ico'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
			>
				<AntdRegistry>
					<ConfigProvider locale={es_ES}>
						<SessionProvider>{children}</SessionProvider>
					</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
