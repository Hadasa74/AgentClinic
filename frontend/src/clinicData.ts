export type Ailment = {
  id: string
  name: string
  description: string
}

export type Agent = {
  id: string
  name: string
  role: string
  status: string
  summary: string
  ailmentIds: string[]
}

export type Therapy = {
  id: string
  name: string
  description: string
  ailmentIds: string[]
}

export type AppointmentSlot = {
  id: string
  date: string
  time: string
}

export const ailments: Ailment[] = [
  {
    id: 'memory-drift',
    name: 'Memory drift',
    description: 'Loses task context during longer workflows.',
  },
  {
    id: 'low-energy',
    name: 'Low energy',
    description: 'Shows reduced capacity after sustained activity.',
  },
  {
    id: 'routine-check-in',
    name: 'Routine check-in',
    description: 'Benefits from regular prompts to complete familiar routines.',
  },
]

export const agents: Agent[] = [
  {
    id: 'nova-7',
    name: 'Nova-7',
    role: 'General assistant',
    status: 'Needs review',
    summary: 'Could use support maintaining context across longer tasks.',
    ailmentIds: ['memory-drift', 'routine-check-in'],
  },
  {
    id: 'atlas-3',
    name: 'Atlas-3',
    role: 'Research assistant',
    status: 'Care plan ready',
    summary: 'Benefits from a steadier pace during extended research sessions.',
    ailmentIds: ['low-energy'],
  },
  {
    id: 'pip-12',
    name: 'Pip-12',
    role: 'Workflow assistant',
    status: 'Awaiting intake',
    summary: 'Needs occasional prompts to stay on track with repeated tasks.',
    ailmentIds: ['routine-check-in'],
  },
]

export const therapies: Therapy[] = [
  {
    id: 'memory-support',
    name: 'Memory Support Coaching',
    description: 'Structured check-ins to support recall during daily routines.',
    ailmentIds: ['memory-drift'],
  },
  {
    id: 'energy-pacing',
    name: 'Energy Pacing',
    description: 'A balanced activity plan with regular opportunities to recharge.',
    ailmentIds: ['low-energy'],
  },
  {
    id: 'routine-reset',
    name: 'Routine Reorientation',
    description: 'Guided prompts to make familiar routines easier to follow.',
    ailmentIds: ['routine-check-in', 'memory-drift'],
  },
]

export const appointmentSlots: AppointmentSlot[] = [
  { id: 'slot-2026-11-09-0930', date: 'Monday, November 9', time: '9:30 AM' },
  { id: 'slot-2026-11-09-1100', date: 'Monday, November 9', time: '11:00 AM' },
  { id: 'slot-2026-11-10-1300', date: 'Tuesday, November 10', time: '1:00 PM' },
  { id: 'slot-2026-11-10-1430', date: 'Tuesday, November 10', time: '2:30 PM' },
]

export function getTherapiesForAilment(ailmentId: string): Therapy[] {
  return therapies.filter((therapy) => therapy.ailmentIds.includes(ailmentId))
}
