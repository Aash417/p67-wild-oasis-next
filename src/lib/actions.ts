'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { getBookings } from './data-service';
import { supabase } from './supabase';

export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}

export async function createBooking(bookingData: any, formData: any) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in.');

	const newBooking = {
		...bookingData,
		guestId: session?.user?.guestId,
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations'),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: 'unconfirmed',
	};

	console.log('newBooking :', newBooking);
	const { error } = await supabase
		.from('bookings')
		.insert([newBooking])
		// So that the newly created object gets returned!
		.select()
		.single();

	if (error) throw new Error('Booking could not be created');

	revalidatePath(`/cabin/${bookingData.cabinId}`);
	redirect('/cabins/thankyou');
}

export async function UpdateProfile(formData: any) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in.');

	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error('Please provide a valid national ID');

	const updateData = { nationalID, nationality, countryFlag };
	const { data, error } = await supabase
		.from('guests')
		.update(updateData)
		.eq('id', session?.user?.guestId)
		.select()
		.single();

	if (error) throw new Error('Guest could not be updated');

	revalidatePath('/account/profile');
	return data;
}

export async function deleteReservation(bookingId: number) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in.');

	const guestBookings = await getBookings(session?.user?.guestId);
	const guestBookingsIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingsIds.includes(bookingId))
		throw new Error('You are not allowed to delete this booking');

	const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
	if (error) {
		throw new Error('Booking could not be deleted');
	}

	revalidatePath('/account/reservations');
}

export async function updateBooking(formData: any) {
	const bookingId = Number(formData.get('bookingId'));
	const session = await auth();
	if (!session) throw new Error('You must be logged in.');

	const guestBookings = await getBookings(session?.user?.guestId);
	const guestBookingsIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingsIds.includes(bookingId))
		throw new Error('You are not allowed to update this booking');

	const updateData = {
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations').slice(0, 100),
	};
	const { error } = await supabase
		.from('bookings')
		.update(updateData)
		.eq('id', bookingId)
		.select()
		.single();

	if (error) throw new Error('Booking could not be updated');

	revalidatePath('/account/reservations');
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	redirect('/account/reservations');
}
