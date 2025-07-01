'use client'

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/authStore'

export function AuthInitializer() {
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    const sessionId = Cookies.get('sessionId')
    const type = Cookies.get('type') as 'user' | 'seller' | 'admin' | undefined

    if (sessionId && type) {
      setAuth({ sessionId, type })
    }
  }, [setAuth]) // ✅ adicionando setAuth na dependência
  // eslint vai parar de reclamar

  return null
}
