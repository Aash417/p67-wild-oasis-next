import { auth } from '@/lib/auth';
import { getBookedDatesByCabinId, getSettings } from '@/lib/data-service';
import DateSelector from './DateSelector';
import LoginMessage from './LoginMessage';
import ReservationForm from './ReservationForm';

export default async function Reservation({ cabin }: { cabin: any }) {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);

	const session = await auth();

	return (
		<div className='grid grid-cols-2 gap-2 border border-primary-800 min-h-[400px]'>
			<DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}
