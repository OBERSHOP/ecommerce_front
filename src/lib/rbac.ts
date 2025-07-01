export type Role = 'user' | 'seller' | 'admin'

export const roleAccess = {
  user: ['home'],
  seller: ['home', 'seller'],
  admin: ['home', 'seller', 'admin', 'admin/users', 'admin/reports'],
}

export function canAccess(role: Role | null, route: string): boolean {
  if (!role) return false
  return roleAccess[role].includes(route)
}
