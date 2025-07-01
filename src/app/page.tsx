'use client';

// import { useAuthStore } from '@/store/authStore'
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // const { type } = useAuthStore()

  return (
    <main className="w-full">
      {/* Banner Superior */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight">
          OBER<span className="text-cyan-300">SHOP</span>
        </div>
        <input
          type="text"
          placeholder="O que você está procurando?"
          className="w-1/2 p-2 rounded-md text-black"
        />
        <div className="flex gap-4 items-center text-sm">
          <Link href="/login" className="hover:underline">
            Entrar ou cadastrar-se
          </Link>
          <Link href="/cart" className="hover:underline">
            🛒 Carrinho
          </Link>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-white shadow-sm border-b">
        <div className="flex gap-6 px-6 py-3 text-sm font-medium text-gray-700">
          <Link href="#">Compras recorrentes</Link>
          <Link href="#">Categorias</Link>
          <Link href="#">Beleza</Link>
          <Link href="#">Casa</Link>
          <Link href="#">Limpeza</Link>
          <Link href="#">Lançamentos</Link>
          <Link href="#">Pet</Link>
          <Link href="#">Utilidades</Link>
        </div>
      </nav>

      {/* Banner promocional */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-10 items-center">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Frete Grátis SP</h2>
            <p className="text-gray-700">Frete fixo de R$ 5,00 Sul e Sudeste</p>
            <p className="text-gray-600">
              Toque macio, embalada a vácuo e antialérgica
            </p>
            <p className="text-2xl font-bold text-blue-800">
              De <span className="line-through">R$59,90</span> por{' '}
              <span className="text-4xl text-blue-900">R$39,90</span>
            </p>
            <Link
              href="#"
              className="inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Comprar Agora
            </Link>
          </div>
          <Image
            src="/placeholder-roupas.png" // substitua com a URL real ou use assets
            alt="Manta Microfibra"
            width={500}
            height={400}
            className="rounded shadow-lg"
          />
        </div>
      </section>

      {/* Rodapé rápido */}
      <footer className="bg-blue-900 text-white text-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p>Privacidade segura · Pagamentos seguros · Garantia de entrega</p>
        <p>⚠️ Tenha cuidado com mensagens falsas dos Correios</p>
      </footer>
    </main>
  );
}
