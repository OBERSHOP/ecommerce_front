'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Estrutura de dados para as categorias (simulando dados que virão do backend)
type Subcategory = {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
};

type Category = {
  name: string;
  href: string;
  hasSubmenu: boolean;
  subcategories?: Subcategory[];
};

// Dados de exemplo (serão substituídos pelos dados do backend)
const categories: Category[] = [
  {
    name: "Compras recorrentes",
    href: "/compras-recorrentes",
    hasSubmenu: false
  },
  {
    name: "Categorias",
    href: "/categorias",
    hasSubmenu: true,
    subcategories: [
      { name: "Todas as categorias", href: "/categorias" },
      { name: "Mais vendidos", href: "/categorias/mais-vendidos" },
      { name: "Ofertas do dia", href: "/categorias/ofertas" }
    ]
  },
  {
    name: "Artesanato",
    href: "/artesanato",
    hasSubmenu: true,
    subcategories: [
      { 
        name: "Materiais para artesanato", 
        href: "/artesanato/materiais",
        subItems: [
          { name: "Tecidos", href: "/artesanato/materiais/tecidos" },
          { name: "Tintas", href: "/artesanato/materiais/tintas" },
          { name: "Papéis", href: "/artesanato/materiais/papeis" }
        ]
      },
      { name: "Ferramentas", href: "/artesanato/ferramentas" },
      { name: "Kits", href: "/artesanato/kits" }
    ]
  },
  {
    name: "Beleza",
    href: "/beleza",
    hasSubmenu: false
  },
  {
    name: "Casa, Mesa e Banho",
    href: "/casa-mesa-banho",
    hasSubmenu: true,
    subcategories: [
      { name: "Cozinha", href: "/casa-mesa-banho/cozinha" },
      { name: "Banheiro", href: "/casa-mesa-banho/banheiro" },
      { name: "Quarto", href: "/casa-mesa-banho/quarto" },
      { name: "Decoração", href: "/casa-mesa-banho/decoracao" }
    ]
  },
  {
    name: "Higiene e Limpeza",
    href: "/higiene-limpeza",
    hasSubmenu: true,
    subcategories: [
      { name: "Produtos de limpeza", href: "/higiene-limpeza/produtos" },
      { name: "Utensílios", href: "/higiene-limpeza/utensilios" }
    ]
  },
  {
    name: "Industrial",
    href: "/industrial",
    hasSubmenu: false
  },
  {
    name: "Lançamentos",
    href: "/lancamentos",
    hasSubmenu: false
  },
  {
    name: "Produtos em Oferta",
    href: "/produtos-oferta",
    hasSubmenu: false
  },
  {
    name: "Pet",
    href: "/pet",
    hasSubmenu: false
  },
  {
    name: "Saúde e Proteção",
    href: "/saude-protecao",
    hasSubmenu: false
  },
  {
    name: "Utilidade Doméstica",
    href: "/utilidade-domestica",
    hasSubmenu: true,
    subcategories: [
      { name: "Cozinha", href: "/utilidade-domestica/cozinha" },
      { name: "Lavanderia", href: "/utilidade-domestica/lavanderia" },
      { name: "Organização", href: "/utilidade-domestica/organizacao" }
    ]
  }
];

export function Navbar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Detectar scroll para adicionar sombra
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeCategory = categories.find(c => c.name === hoveredCategory);

  return (
    <div 
      ref={navRef}
      className="relative z-30 hidden lg:flex"
    >
      {/* Barra de navegação principal */}
      <nav className={cn(
        "bg-white border-b border-gray-200 transition-shadow duration-300",
        isScrolled && "shadow-md"
      )}>
        <div className="max-w-screen-2xl mx-auto">
          <ul className="flex overflow-x-auto">
            {categories.map((category) => (
              <li 
                key={category.href}
                className="relative"
                onMouseEnter={() => {
                  setHoveredCategory(category.name);
                  setHoveredSubcategory(null);
                }}
              >
                <Link 
                  href={category.href}
                  className={cn(
                    "flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                    hoveredCategory === category.name 
                      ? "text-ober-primary bg-gray-50" 
                      : "text-gray-700 hover:text-ober-primary hover:bg-gray-50"
                  )}
                >
                  {category.name}
                  {category.hasSubmenu && (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mega menu (painel lateral) */}
      {hoveredCategory && activeCategory?.hasSubmenu && (
        <div 
          className="absolute top-10 left-0 right-0 bg-gray-900 text-white z-50 shadow-xl"
          onMouseLeave={() => {
            setHoveredCategory(null);
            setHoveredSubcategory(null);
          }}
        >
          <div className="max-w-screen-2xl mx-auto grid grid-cols-4">
            {/* Coluna de subcategorias */}
            <div className="col-span-1 py-4 pr-4 border-r border-gray-700">
              <h3 className="text-lg font-medium px-6 py-2">{hoveredCategory}</h3>
              <ul>
                {activeCategory.subcategories?.map((subcategory) => (
                  <li 
                    key={subcategory.href}
                    onMouseEnter={() => setHoveredSubcategory(subcategory.name)}
                    className={cn(
                      "px-6 py-2 transition-colors",
                      hoveredSubcategory === subcategory.name 
                        ? "bg-gray-800" 
                        : "hover:bg-gray-800"
                    )}
                  >
                    <Link 
                      href={subcategory.href}
                      className="flex items-center justify-between w-full"
                    >
                      <span>{subcategory.name}</span>
                      {subcategory.subItems && (
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna de subitems (terceiro nível) */}
            <div className="col-span-3 py-4 px-6">
              {hoveredSubcategory && (
                <div>
                  <h4 className="text-lg font-medium mb-4">{hoveredSubcategory}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {activeCategory.subcategories
                      ?.find(sub => sub.name === hoveredSubcategory)
                      ?.subItems?.map((item) => (
                        <Link 
                          key={item.href}
                          href={item.href}
                          className="text-sm text-gray-300 hover:text-white hover:underline"
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
              {!hoveredSubcategory && (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Selecione uma subcategoria para ver mais opções</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay para o submenu */}
      {hoveredCategory && activeCategory?.hasSubmenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          style={{ top: navRef.current?.getBoundingClientRect().bottom }}
        />
      )}
    </div>
  );
}
