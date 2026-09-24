"use server"

import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"

function str(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value.trim() : ""
}

const FAILING_CARDS = ["4000000000000002", "4000000000009995"]

export async function processMockPayment(formData: FormData) {
  const bookingId = str(formData, "bookingId")
  const cardNumber = str(formData, "cardNumber").replace(/\s/g, "")
  const cardName = str(formData, "cardName")
  const cardExpiry = str(formData, "cardExpiry")

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  })
  if (!booking) redirect("/rooms")

  const checkoutUrl = `/book/checkout?ref=${bookingId}`

  if (
    !/^\d{13,19}$/.test(cardNumber) ||
    !cardName ||
    !/^\d{2}\s?\/\s?\d{2}$/.test(cardExpiry)
  ) {
    redirect(`${checkoutUrl}&error=invalid`)
  }

  const failed =
    FAILING_CARDS.includes(cardNumber) || cardNumber.endsWith("0000")

  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: booking.totalPrice,
      currency: booking.currency,
      status: failed ? "failed" : "succeeded",
      stripePaymentIntentId: `mock_${Math.random().toString(36).slice(2, 12)}`,
      paidAt: failed ? null : new Date(),
    },
  })

  if (failed) {
    redirect(`/book/retry?ref=${bookingId}&reason=declined&payment=${payment.id}`)
  }

  redirect(`/book/confirmation?ref=${bookingId}`)
}
