import Link from 'next/link';

export default function Navigation() {
	return (
		<div className=''>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/cabins'>cabins</Link>
				</li>
				<li>
					<Link href='/about'>About</Link>
				</li>
				<li>
					<Link href='/account'>Your account</Link>
				</li>
			</ul>
		</div>
	);
}
