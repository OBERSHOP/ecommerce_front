'use client';

import { useAuthStore } from '@/store/authStore';

export default function HomePage() {
  const { type } = useAuthStore();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo ao Marketplace</h1>

      <div className="mt-4 text-muted-foreground">
        {type === 'user' && (
          <p>
            Você está logado como <strong>Usuário</strong>.
          </p>
        )}
        {type === 'seller' && (
          <p>
            Você está logado como <strong>Vendedor</strong>.
          </p>
        )}
        {type === 'admin' && (
          <p>
            Você está logado como <strong>Administrador</strong>.
          </p>
        )}
        {!type && <p>Você ainda não está autenticado.</p>}
      </div>
    </div>
  );
}
