import apiClient from '@/lib/apiClient';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/authStore';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await apiClient.post('/login', { email, password });
  const { type, sessionId, ...privileges } = res.data;

  // Gravar em cookies para middleware funcionar
  Cookies.set('sessionId', sessionId);
  Cookies.set('type', type);

  // Gravar no Zustand
  useAuthStore.getState().setAuth({
    sessionId,
    type,
    privileges: type === 'admin' ? privileges : undefined,
  });
}
