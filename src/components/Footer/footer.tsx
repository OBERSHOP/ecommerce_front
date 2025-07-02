'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-gray-200 pt-10 pb-4">
      <div className="max-w-screen-xl mx-auto px-4">
        {' '}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Sobre nós */}{' '}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Sobre nós
            </h3>{' '}
            <ul className="space-y-2">
              <li>
                {' '}
                <Link
                  href="/politica-privacidade"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Política de Privacidade{' '}
                </Link>
              </li>{' '}
              <li>
                <Link
                  href="/politica-uso"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  {' '}
                  Política de Uso
                </Link>{' '}
              </li>
              <li>
                {' '}
                <Link
                  href="/trocas-devolucoes"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Trocas e Devoluções{' '}
                </Link>
              </li>{' '}
            </ul>
          </div>
          {/* Coluna 2: Atendimento */}{' '}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Atendimento
            </h3>{' '}
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                {' '}
                <Phone className="h-4 w-4 text-gray-600 mt-1" />
                <span className="text-gray-600 text-sm">
                  +55 (19) 98305-2559
                </span>{' '}
              </li>
              <li className="flex items-start gap-2">
                {' '}
                <Image
                  src="/whatsapp_small.svg"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="h-4 w-4 text-gray-600 mt-1"
                />
                <span className="text-gray-600 text-sm">
                  +55 (19) 98305-2559
                </span>{' '}
              </li>
              <li className="flex items-start gap-2">
                {' '}
                <Mail className="h-4 w-4 text-gray-600 mt-1" />
                <span className="text-gray-600 text-sm">
                  atendimento@obershop.com.br
                </span>{' '}
              </li>
              <li className="flex items-start gap-2">
                {' '}
                <MapPin className="h-4 w-4 text-gray-600 mt-1" />
                <span className="text-gray-600 text-sm max-w-[300px]">
                  {' '}
                  Av. Industrial Oscar Berggren, 501 - Fundos - Anexo Salão 01 -
                  Parque Industrial Recanto Nova Odessa - SP, 13380-360
                </span>{' '}
              </li>
            </ul>{' '}
          </div>
          {/* Coluna 3: Formas de Pagamento e Certificações */}
          <div className="space-y-8">
            {' '}
            {/* Formas de Pagamento */}
            <div>
              {' '}
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Formas de Pagamento
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {' '}
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  <Image
                    src="/visa_logo.webp"
                    alt="Visa"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />{' '}
                </div>
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  {' '}
                  <Image
                    src="/mastercard_logo.webp"
                    alt="Mastercard"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  <Image
                    src="/express_logo.webp"
                    alt="American Express"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />{' '}
                </div>
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  {' '}
                  <Image
                    src="/diners_logo.webp"
                    alt="Hipercard"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  <Image
                    src="/elo_logo.webp"
                    alt="Elo"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />{' '}
                </div>
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  {' '}
                  <Image
                    src="/hipercard_logo.webp"
                    alt="Pix"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  <Image
                    src="/mercado_logo.webp"
                    alt="Boleto"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />{' '}
                </div>
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  {' '}
                  <Image
                    src="/boleto_logo.webp"
                    alt="Código de Barras"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
                <div className="bg-white p-1 rounded shadow-sm flex items-center justify-center">
                  {' '}
                  <Image
                    src="/pix-logo.png"
                    alt="Código de Barras"
                    width={60}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
              </div>
            </div>
            {/* Certificações */}{' '}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Certificações
              </h3>{' '}
              <div>
                <Image
                  src="/selos.png"
                  alt="Selo Verde"
                  width={200}
                  height={200}
                  className="h-full"
                />
              </div>
            </div>
            {/* Compra Segura */}{' '}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Compra Segura
              </h3>{' '}
              <div className="flex flex-wrap gap-2">
                <div className="p-1 rounded">
                  {' '}
                  <Image
                    src="/reclama_aqui.webp"
                    alt="Reclame Aqui"
                    width={120}
                    height={40}
                    className="object-contain h-8"
                  />
                </div>{' '}
                <div className="p-1 rounded">
                  <Image
                    src="/site_seguro.webp"
                    alt="Site Seguro"
                    width={120}
                    height={40}
                    className="object-contain h-8"
                  />{' '}
                </div>
              </div>
            </div>{' '}
          </div>
        </div>
        {/* Linha divisória */}{' '}
        <div className="border-t border-gray-300 my-8"></div>
        {/* Copyright e créditos */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p className="text-center w-full">
            Copyright OBER SHOP COMÉRCIO LTDA - 52.326.109/0001-17 - 2025. Todos
            os direitos reservados.
          </p>{' '}
        </div>
      </div>
    </footer>
  );
}
