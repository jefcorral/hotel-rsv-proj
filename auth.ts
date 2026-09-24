import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { isMockMode } from "@/lib/mock"
import { prisma } from "@/lib/prisma"

const MOCK_USERS = [
  {
    id: "mock-admin",
    email: "admin@villa-aurelia.com",
    password: "admin123",
    name: "Hotel Admin",
    role: "super_admin",
  },
  {
    id: "mock-guest",
    email: "guest@villa-aurelia.com",
    password: "guest123",
    name: "Demo Guest",
    role: "guest",
  },
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase()
        const password = String(credentials?.password ?? "")
        if (!email || !password) return null

        if (isMockMode) {
          const mock = MOCK_USERS.find(
            (u) => u.email === email && u.password === password
          )
          return mock ? { ...mock, password: undefined } : null
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user?.password) return null

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null

        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role ?? "guest"
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
})
