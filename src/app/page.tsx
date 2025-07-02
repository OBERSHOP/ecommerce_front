'use client';

import { Header } from '@/components/Header/header';
import { Navbar } from '@/components/Navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';


export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <Navbar />

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
            src="/placeholder-roupas.png"
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

