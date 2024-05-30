'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const activeFilter = searchParams.get('capacity') ?? 'all';

	function handleFilter(filter: string) {
		const params = new URLSearchParams(searchParams);
		params.set('capacity', filter);
		router.replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className='border border-primary-800 flex'>
			<Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>
				All cabins
			</Button>
			<Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>
				1&mdash;3 guests
			</Button>
			<Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>
				7&mdash;guests
			</Button>
			<Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>
				12&mdash; guests
			</Button>
		</div>
	);
}

function Button({
	filter,
	handleFilter,
	activeFilter,
	children,
}: {
	filter: string;
	handleFilter: (filter: string) => void;
	activeFilter: string;
	children: React.ReactNode;
}) {
	return (
		<button
			className={`px-5 py-2 hover:bg-primary-700 ${
				filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
			}`}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}
