import { getBookedDatesByCabinId, getCabin } from '@/lib/data-service';

export async function GET(request: Request, { params }: { params: { cabinId: String } }) {
	const { cabinId } = params;

	try {
		const [cabin, bookDates] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);

		return Response.json({ cabin, bookDates });
	} catch (error) {}
	return Response.json({ test: 'Cabin not found' });
}
