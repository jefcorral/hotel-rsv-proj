"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

import { signIn } from "@/auth"
import { isMockMode } from "@/lib/mock"
import { prisma } from "@/lib/prisma"

function str(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

export async function authenticate(formData: FormData) {
  const callbackUrl = str(formData, "callbackUrl") || "/account"
  try {
    await signIn("credentials", {
      email: str(formData, "email"),
      password: str(formData, "password"),
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/login?error=credentials`)
    }
    throw error
  }
  redirect(callbackUrl.startsWith("/") ? callbackUrl : "/account")
}

export async function registerUser(formData: FormData) {
  const name = str(formData, "fullName")
  const email = str(formData, "email").toLowerCase()
  const phoneCode = str(formData, "countryCode")
  const phone = str(formData, "phone")
  const password = str(formData, "password")
  const confirmPassword = str(formData, "confirmPassword")

  const back = "/register"
  if (!name || !email || !password) {
    redirect(`${back}?error=missing`)
  }
  if (password.length < 8 || !/\d/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
    redirect(`${back}?error=weak`)
  }
  if (password !== confirmPassword) {
    redirect(`${back}?error=mismatch`)
  }

  if (isMockMode) {
    redirect(`/login?registered=1&email=${encodeURIComponent(email)}`)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    redirect(`${back}?error=exists`)
  }

  await prisma.user.create({
    data: {
      name,
      email,
      phone: phone ? `${phoneCode} ${phone}`.trim() : null,
      password: await bcrypt.hash(password, 12),
      role: "guest",
    },
  })

  redirect(`/login?registered=1&email=${encodeURIComponent(email)}`)
}
