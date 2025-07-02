'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/features/auth/services/loginService'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header/header'
import { Navbar } from '@/components/Navbar/navbar'
import { Footer } from '@/components/Footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  remember: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      remember: false,
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data)
      router.push('/')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Credenciais inválidas ou erro no servidor.'
      setError(message)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna de Login */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Preencha com seus dados</h2>
              
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input 
                    type="email" 
                    placeholder="E-mail*" 
                    className="w-full border-gray-300" 
                    {...register('email')} 
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Senha*" 
                    className="w-full border-gray-300" 
                    {...register('password')} 
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Checkbox id="remember" {...register('remember')} />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Lembrar-me
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'ENTRANDO...' : 'ACESSAR'}
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <Link href="/recuperar-senha" className="hover:underline">
                    Perdeu sua senha?
                  </Link>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <span>Ou acesse via sua conta</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button" 
                    className="flex items-center justify-center gap-2 bg-[#3b5998] hover:bg-[#3b5998]/90"
                  >
                    <Image src="/facebook-icon.png" alt="Facebook" width={20} height={20} />
                    FACEBOOK
                  </Button>
                  
                  <Button 
                    type="button" 
                    className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                  >
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} />
                    GOOGLE
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Coluna de Cadastro */}
            <div className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Novo cadastro</h2>
              <p className="text-gray-600 mb-6">
                Crie uma conta para acompanhar seus pedidos, salvar produtos favoritos e receber ofertas exclusivas.
              </p>
              
              <Link href="/cadastro">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  CADASTRAR
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Ao criar uma conta, você concorda com nossa política de privacidade e termos de uso.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
