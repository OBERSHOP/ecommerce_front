- shadcn
- zod
- zustand
- react hook form
- axios
- tanstack query v5
- js-cookie



src/
├── app/                        # Rotas Next.js (App Router)
│   ├── login/                 # Página de login
│   ├── home/                  # Página inicial pública
│   ├── dashboard/             # Área logada (admin, seller)
│   ├── middleware.ts          # Proteção de rotas baseada em role
│   └── layout.tsx             # Layout padrão
├── components/                # Componentes reutilizáveis
├── features/                  # Domínios do sistema (ex: auth, products)
│   └── auth/
│       ├── hooks/
│       ├── services/
│       └── components/
├── lib/                       # Funções utilitárias e helpers
│   ├── rbac.ts                # Lógica de permissão por role
│   └── api.ts                 # Instância do Axios
├── schema/                    # Schemas Zod
├── store/                     # Zustand (authStore, uiStore, etc.)
├── types/                     # Tipagens globais
└── utils/                     # Funções genéricas
