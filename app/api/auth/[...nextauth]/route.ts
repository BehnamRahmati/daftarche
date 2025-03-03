import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!, // Set in your .env file
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Set in your .env file
		}),
		// Add more providers here (e.g. GitHubProvider, FacebookProvider, etc.)
	],
	secret: process.env.NEXTAUTH_SECRET, // Generate using 'openssl rand -base64 32'
});
export { handler as GET, handler as POST };
