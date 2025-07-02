'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Logo from '/public/logo.svg';
import Whatsapp from '/public/whatsapp.svg';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevenir scroll quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-ober-primary text-white py-4 px-3 flex justify-between items-center lg:justify-center lg:gap-3">
        {/* Menu mobile toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white hover:bg-ober-primary/90"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="OBER Shop"
            width={120}
            height={80}
            className="max-h-[40px]"
          />
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:block bg-white rounded-md relative px-2 w-full lg:max-w-1/3">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full p-2 pl-3 pr-10 rounded-md text-black"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link href="https://api.whatsapp.com/send?phone=5519983052559" target='blank' className="hover:underline hidden lg:flex">
            <div className="flex items-center text-sm gap-2 bg-green-600 px-2 py-1 rounded">
              <Image
                src={Whatsapp}
                alt="WhatsApp"
                width={30}
                height={30}
                className="mr-1"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Atendimento</span>
                <span className="text-sm font-medium">pelo WhatsApp</span>
              </div>
            </div>
          </Link>

          <Link href="/login" className="hover:underline">
            <User className="h-5 w-5 md:h-6 md:w-6" />
          </Link>
          <Link href="/cart" className="hover:underline">
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
          </Link>
        </div>
      </header>

      {/* Search bar - mobile */}
      <div className="md:hidden bg-ober-primary px-3 pt-2 pb-5">
        <div className="bg-white rounded-md relative px-2 w-full">
          <input
            type="text"
            placeholder="O que você está procurando?"
            className="w-full p-2 pl-3 pr-10 rounded-md text-black"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          isMobileMenuOpen ? "block" : "hidden"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-3/4 max-w-xs bg-white shadow-lg transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image
            src={Logo}
            alt="OBER Shop"
            width={100}
            height={60}
            className="w-auto h-auto"
            style={{ maxHeight: '30px' }}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-4">
          <Link 
            href="https://api.whatsapp.com/send?phone=5519983052559" 
            target='blank'
            className="flex items-center gap-2 p-2 bg-green-600 text-white rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src={Whatsapp}
              alt="WhatsApp"
              width={24}
              height={24}
            />
            <span className="text-sm font-medium">Atendimento pelo WhatsApp</span>
          </Link>
          
          <nav className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider pt-2">
              Menu
            </h3>
            {[
              { href: "/compras-recorrentes", label: "Compras recorrentes" },
              { href: "/categorias", label: "Categorias" },
              { href: "/artesanato", label: "Artesanato" },
              { href: "/beleza", label: "Beleza" },
              { href: "/casa-mesa-banho", label: "Casa, Mesa e Banho" },
              { href: "/higiene-limpeza", label: "Higiene e Limpeza" },
              { href: "/industrial", label: "Industrial" },
              { href: "/lancamentos", label: "Lançamentos" },
              { href: "/produtos-oferta", label: "Produtos em Oferta" },
              { href: "/pet", label: "Pet" },
              { href: "/saude-protecao", label: "Saúde e Proteção" },
              { href: "/utilidade-domestica", label: "Utilidade Doméstica" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
