import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest } from 'next/server';

const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
	],
	callbacks: {
		authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
			return !!auth?.user;
		},
	},
};

export const {
	auth,
	handlers: { GET, POST },
} = NextAuth(authConfig);
