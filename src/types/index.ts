export interface NewUser {
  id?: string
  createdAt: Date
  updatedAt: Date
  clerkId: string
  email: string
  entries: JournalEntry[]
}

export interface User extends NewUser {
  id: string
}

export interface NewJournalEntry {
  id?: string
  createdAt: Date
  updatedAt: Date
  userId: string
  user?: User
  content: string
  // analysis?: IAnalysis
}

export interface JournalEntry extends NewJournalEntry {
  id: string
  analysis?: Analysis
}

export interface NewAnalysis {
  id?: string
  createdAt: Date
  updatedAt: Date
  userId: string
  entryId: string
  entry: JournalEntry
  mood: string
  summary: string
  color: string
  negative: boolean
}

export interface Analysis extends NewAnalysis {
  id: string
}
