import { create } from 'zustand'

type Role = 'user' | 'seller' | 'admin'

interface AdminPrivileges {
  manageUsers?: boolean
  manageProducts?: boolean
  viewReports?: boolean
  // outros campos booleanos que vierem da API
}

interface AuthState {
  sessionId: string | null
  type: Role | null
  privileges: AdminPrivileges | null
  setAuth: (payload: {
    sessionId: string
    type: Role
    privileges?: AdminPrivileges
  }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  sessionId: null,
  type: null,
  privileges: null,
  setAuth: ({ sessionId, type, privileges }) =>
    set({ sessionId, type, privileges: privileges ?? null }),
  logout: () => set({ sessionId: null, type: null, privileges: null }),
}))
