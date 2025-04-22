import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user?.hashedPassword) return null

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

                return isValid ? user : null
            },
        }),
    ],
    session: { strategy: 'jwt' as const },
    callbacks: {
        async signIn({ user }) {
            // For Google provider, ensure user is connected to database
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email! },
            })

            if (existingUser) {
                user.id = existingUser.id
            }

            return true
        },
        async jwt({ token, user, trigger }) {
            // Handle user ID for both credential and OAuth logins
            if (user) {
                token.userId = user.id
            }

            // Update session after user update
            if (trigger === 'update') {
                const updatedUser = await prisma.user.findUnique({
                    where: { id: token.userId },
                })
                token.name = updatedUser?.name
                token.email = updatedUser?.email
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.userId as string
                // For TypeScript validation
                session.user.name = token.name as string
                session.user.email = token.email as string
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/login',
        error: '/login',
        newUser: '/',
    },
}
