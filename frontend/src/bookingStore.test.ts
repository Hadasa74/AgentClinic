import { describe, expect, it } from 'vitest'
import {
  BOOKINGS_STORAGE_KEY,
  createBooking,
  loadBookings,
  saveBookings,
  type AppointmentBooking,
} from './bookingStore'

function createMemoryStorage(initialValue: string | null = null) {
  let value = initialValue

  return {
    getItem: (key: string) => (key === BOOKINGS_STORAGE_KEY ? value : null),
    setItem: (key: string, nextValue: string) => {
      if (key === BOOKINGS_STORAGE_KEY) {
        value = nextValue
      }
    },
    get value() {
      return value
    },
  }
}

const validInput = {
  agentId: 'nova-7',
  ailmentId: 'memory-drift',
  therapyId: 'memory-support',
  slotId: 'slot-2026-11-09-0930',
}

describe('booking workflow rules', () => {
  it('creates a booking for an agent, related ailment, matching therapy, and valid slot', () => {
    const result = createBooking(validInput, [])

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value).toEqual({
        ...validInput,
        id: 'booking-slot-2026-11-09-0930',
      })
    }
  })

  it('rejects therapy unrelated to the selected ailment', () => {
    const result = createBooking({ ...validInput, therapyId: 'energy-pacing' }, [])

    expect(result).toEqual({
      ok: false,
      error: 'Choose a therapy related to the selected ailment.',
    })
  })

  it('rejects an ailment that is not associated with the selected agent', () => {
    const result = createBooking({ ...validInput, agentId: 'pip-12' }, [])

    expect(result).toEqual({
      ok: false,
      error: 'Choose an ailment associated with this agent.',
    })
  })

  it('rejects unknown appointment slots', () => {
    const result = createBooking({ ...validInput, slotId: 'unknown-slot' }, [])

    expect(result).toEqual({
      ok: false,
      error: 'Choose an available appointment time.',
    })
  })

  it('rejects slots already booked', () => {
    const existingBooking: AppointmentBooking = {
      ...validInput,
      id: 'existing-booking',
    }

    const result = createBooking(validInput, [existingBooking])

    expect(result).toEqual({
      ok: false,
      error: 'That appointment time is no longer available.',
    })
  })
})

describe('booking persistence', () => {
  it('loads bookings after they have been saved', () => {
    const storage = createMemoryStorage()
    const created = createBooking(validInput, [])
    expect(created.ok).toBe(true)
    if (!created.ok) return

    expect(saveBookings(storage, [created.value])).toEqual({ ok: true, value: undefined })
    expect(loadBookings(storage)).toEqual({ ok: true, value: [created.value] })
  })

  it('reports malformed saved data instead of treating it as an empty schedule', () => {
    const storage = createMemoryStorage('{not json')

    expect(loadBookings(storage)).toEqual({
      ok: false,
      error: 'Saved appointment data is invalid and could not be loaded.',
    })
  })

  it('reports inaccessible browser storage', () => {
    const storage = {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    }

    expect(loadBookings(storage)).toEqual({
      ok: false,
      error: 'Saved appointments could not be read from this browser.',
    })
    expect(saveBookings(storage, [])).toEqual({
      ok: false,
      error: 'The appointment could not be saved in this browser.',
    })
  })
})
