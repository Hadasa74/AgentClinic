import { agents, ailments, appointmentSlots, therapies } from './clinicData'

export type AppointmentBooking = {
  id: string
  agentId: string
  ailmentId: string
  therapyId: string
  slotId: string
}

export type BookingInput = Omit<AppointmentBooking, 'id'>

export type Result<T> = { ok: true; value: T } | { ok: false; error: string }

type StoragePort = Pick<Storage, 'getItem' | 'setItem'>

export const BOOKINGS_STORAGE_KEY = 'agentclinic:appointments:v1'

function isValidBooking(value: unknown): value is AppointmentBooking {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const booking = value as Record<string, unknown>
  if (
    typeof booking.id !== 'string' ||
    typeof booking.agentId !== 'string' ||
    typeof booking.ailmentId !== 'string' ||
    typeof booking.therapyId !== 'string' ||
    typeof booking.slotId !== 'string'
  ) {
    return false
  }

  const agent = agents.find((item) => item.id === booking.agentId)
  const therapy = therapies.find((item) => item.id === booking.therapyId)
  return Boolean(
    agent &&
      agent.ailmentIds.includes(booking.ailmentId) &&
      ailments.some((item) => item.id === booking.ailmentId) &&
      therapy?.ailmentIds.includes(booking.ailmentId) &&
      appointmentSlots.some((item) => item.id === booking.slotId),
  )
}

function isValidBookingList(value: unknown): value is AppointmentBooking[] {
  if (!Array.isArray(value) || !value.every(isValidBooking)) {
    return false
  }

  const slotIds = value.map((booking) => booking.slotId)
  return new Set(slotIds).size === slotIds.length
}

export function createBooking(
  input: BookingInput,
  existingBookings: readonly AppointmentBooking[],
): Result<AppointmentBooking> {
  const agent = agents.find((item) => item.id === input.agentId)
  if (!agent || !agent.ailmentIds.includes(input.ailmentId)) {
    return { ok: false, error: 'Choose an ailment associated with this agent.' }
  }

  const therapy = therapies.find((item) => item.id === input.therapyId)
  if (!therapy || !therapy.ailmentIds.includes(input.ailmentId)) {
    return { ok: false, error: 'Choose a therapy related to the selected ailment.' }
  }

  if (!appointmentSlots.some((slot) => slot.id === input.slotId)) {
    return { ok: false, error: 'Choose an available appointment time.' }
  }

  if (existingBookings.some((booking) => booking.slotId === input.slotId)) {
    return { ok: false, error: 'That appointment time is no longer available.' }
  }

  return {
    ok: true,
    value: { ...input, id: `booking-${input.slotId}` },
  }
}

export function loadBookings(storage: StoragePort): Result<AppointmentBooking[]> {
  let saved: string | null
  try {
    saved = storage.getItem(BOOKINGS_STORAGE_KEY)
  } catch {
    return { ok: false, error: 'Saved appointments could not be read from this browser.' }
  }

  if (saved === null) {
    return { ok: true, value: [] }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(saved)
  } catch {
    return { ok: false, error: 'Saved appointment data is invalid and could not be loaded.' }
  }

  if (!isValidBookingList(parsed)) {
    return { ok: false, error: 'Saved appointment data is invalid and could not be loaded.' }
  }

  return { ok: true, value: parsed }
}

export function saveBookings(
  storage: StoragePort,
  bookings: readonly AppointmentBooking[],
): Result<void> {
  if (!isValidBookingList(bookings)) {
    return { ok: false, error: 'The appointment data is invalid and could not be saved.' }
  }

  try {
    storage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings))
  } catch {
    return { ok: false, error: 'The appointment could not be saved in this browser.' }
  }

  return { ok: true, value: undefined }
}
