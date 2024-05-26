import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
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
			<body
				className={`${inter.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
			>
				<Header />
				<div className='flex-1 px-8 py-12 grid'>
					<main className='max-w-7xl mx-auto w-full'>{children}</main>
				</div>
			</body>
		</html>
	);
}
