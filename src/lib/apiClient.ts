import axios from 'axios'
import { useAuthStore } from '@/store/authStore'

const apiClient = axios.create({
  baseURL: 'https://sua-api.com', // ajuste para sua API real
})

// Interceptador para adicionar header Session-Id automaticamente
apiClient.interceptors.request.use((config) => {
  const sessionId = useAuthStore.getState().sessionId
  if (sessionId) {
    config.headers['Session-Id'] = sessionId
  }
  return config
})

export default apiClient
