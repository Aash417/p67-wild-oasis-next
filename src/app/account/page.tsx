import { auth } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'account',
};

export default async function Page() {
	const session = await auth();
	const firstName = session?.user?.name?.split(' ').at(0);

	return <div>Welcome, {firstName}</div>;
}
