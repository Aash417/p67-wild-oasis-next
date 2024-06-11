'use client';

import { deleteReservation } from '@/lib/actions';
import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';

export default function ReservationList({ bookings }: { bookings: any }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(currBookings, bookingId) => {
			return currBookings.filter((booking: any) => booking.id !== bookingId);
		}
	);

	async function handleDelete(bookingId: number) {
		optimisticDelete(bookingId);

		await deleteReservation(bookingId);
	}

	return (
		<ul className='space-y-6'>
			{optimisticBookings.map((booking: any) => (
				<ReservationCard booking={booking} onDelete={handleDelete} key={booking.id} />
			))}
		</ul>
	);
}
