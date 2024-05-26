import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import '../styles/globals.css';

const inter = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
	title: {
		template: 'Wild oasis | %s',
		default: 'Wild Oasis',
	},
	description: 'Luxurious cabin hotel',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-primary-950 text-primary-100 min-h-screen`}>
				<header>
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>

				<footer>copyright by wild oasis</footer>
			</body>
		</html>
	);
}
