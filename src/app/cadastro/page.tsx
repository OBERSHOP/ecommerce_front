'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/Header/header'
import { Navbar } from '@/components/Navbar/navbar'
import { Footer } from '@/components/Footer/footer'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  gender: z.enum(['masculino', 'feminino']),
  whatsappNotifications: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>

export default function CadastroPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      whatsappNotifications: false,
      emailNotifications: false,
      gender: 'masculino'
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      // Aqui você implementaria a chamada para o serviço de cadastro
      console.log('Dados de cadastro:', data)
      
      // Redirecionar para a página de login após o cadastro
      router.push('/login?cadastro=sucesso')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao realizar cadastro. Tente novamente.'
      setError(message)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-screen-md mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Novo cadastro</h2>
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    type="text" 
                    placeholder="Nome completo*" 
                    className="w-full border-gray-300" 
                    {...register('fullName')} 
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
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
                
                <div>
                  <Input 
                    type="date" 
                    placeholder="Data de nascimento*" 
                    className="w-full border-gray-300" 
                    {...register('birthDate')} 
                  />
                  {errors.birthDate && (
                    <p className="text-sm text-red-500 mt-1">{errors.birthDate.message}</p>
                  )}
                </div>
                
                <div>
                  <Input 
                    type="password" 
                    placeholder="Confirmar senha*" 
                    className="w-full border-gray-300" 
                    {...register('confirmPassword')} 
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Sexo:</p>
                <RadioGroup defaultValue="masculino" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="masculino" 
                      id="masculino" 
                      {...register('gender')} 
                    />
                    <label htmlFor="masculino" className="text-sm text-gray-600">
                      Masculino
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="feminino" 
                      id="feminino" 
                      {...register('gender')} 
                    />
                    <label htmlFor="feminino" className="text-sm text-gray-600">
                      Feminino
                    </label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="whatsappNotifications" 
                    {...register('whatsappNotifications')} 
                  />
                  <label htmlFor="whatsappNotifications" className="ml-2 text-sm text-gray-600">
                    Quero receber notificações por WhatsApp
                  </label>
                </div>
                
                <div className="flex items-center">
                  <Checkbox 
                    id="emailNotifications" 
                    {...register('emailNotifications')} 
                  />
                  <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-600">
                    Quero receber ofertas por e-mail
                  </label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white mt-6" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'CADASTRANDO...' : 'CADASTRAR'}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Ao criar uma conta, você concorda com nossa{' '}
                <Link href="/politica-privacidade" className="text-blue-600 hover:underline">
                  política de privacidade
                </Link>{' '}
                e{' '}
                <Link href="/termos-uso" className="text-blue-600 hover:underline">
                  termos de uso
                </Link>.
              </p>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}