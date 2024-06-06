import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest } from 'next/server';
import { createGuest, getGuest } from './data-service';

interface Account {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
	id_token: string;
	expires_at: number;
	provider: string;
	type: string;
	providerAccountId: string;
}
interface User {
	guestId?: number;
	id: string;
	name: string;
	email: string;
	image: string;
}
interface UserProfile {
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	email: string;
	email_verified: boolean;
	at_hash: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	iat: number;
	exp: number;
}

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
		async signIn({
			user,
			account,
			profile,
		}: {
			user: User;
			account: Account;
			profile: UserProfile;
		}) {
			try {
				const existingGuest = await getGuest(user.email);

				if (!existingGuest) await createGuest({ email: user.email, fullName: user.name });

				return true;
			} catch (error) {
				return false;
			}
		},

		async session({ session }: { session: { user: User; expires: string } }) {
			const guest = await getGuest(session.user.email);

			session.user.guestId = guest.id;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
