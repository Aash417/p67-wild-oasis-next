'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

export interface AppContextType {
	range: DateRange | undefined;
	setRange: Dispatch<SetStateAction<DateRange | undefined>>;
	resetRange: () => void;
}

const ReservationContext = createContext<AppContextType | undefined>(undefined);
const initialState = { from: undefined, to: undefined };
export function ReservationProvider({ children }: { children: React.ReactNode }) {
	const [range, setRange] = useState<DateRange | undefined>(initialState);
	const resetRange = () => setRange(initialState);

	const value: AppContextType = { range, setRange, resetRange };
	return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

export function useReservation() {
	const context = useContext(ReservationContext);

	if (!context) throw new Error('context was used outside provider');

	return context;
}
