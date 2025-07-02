'use client';

import { Header } from '@/components/Header/header';
import { Navbar } from '@/components/Navbar/navbar';
import { Footer } from '@/components/Footer/footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Shield, CreditCard, Truck, Instagram, Facebook, Youtube, ChevronLeft, ChevronRight, Play, Star, Bell, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

// Primeiro, vamos definir uma interface para o tipo de produto
interface Product {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  oldPrice: string;
  price: string;
  code: string;
}

// Dados dos produtos para o carrossel
const productData: Product[] = [
  {
    id: 1,
    name: "Pano Multiuso Wiper Obertech - 30cm X 37.5cm - 52g/m² - 50 Folhas - Branco (71889220)",
    image: "/products/pano-multiuso-1.jpg",
    rating: 5,
    reviews: 8,
    oldPrice: "26,99",
    price: "25,64",
    code: "71889220"
  },
  {
    id: 2,
    name: "Lenço Higiênico - 25cm X 30cm - 52g/m² - 50 Folhas - Branco (71889205)",
    image: "/products/lenco-higienico.jpg",
    rating: 5,
    reviews: 8,
    oldPrice: "24,90",
    price: "23,66",
    code: "71889205"
  },
  {
    id: 3,
    name: "Pano Multiuso Wiper Obertech - 38cm X 70cm - 52g/m² - 50 Folhas - Branco (71889230)",
    image: "/products/pano-multiuso-2.jpg",
    rating: 5,
    reviews: 8,
    oldPrice: "59,99",
    price: "56,99",
    code: "71889230"
  },
  {
    id: 4,
    name: "Pano Multiuso Wiper Obertech - 30cm X 37.5cm - 75g/m² - 50 Folhas - Branco (71889201)",
    image: "/products/pano-multiuso-3.jpg",
    rating: 5,
    reviews: 8,
    oldPrice: "31,99",
    price: "30,39",
    code: "71889201"
  },
  {
    id: 5,
    name: "Lenço Descartável - 20cm X 25cm - 45g/m² - 100 Folhas - Branco (71889210)",
    image: "/products/lenco-descartavel.jpg",
    rating: 5,
    reviews: 6,
    oldPrice: "29,90",
    price: "28,40",
    code: "71889210"
  },
  {
    id: 6,
    name: "Pano Multiuso Wiper Obertech - 40cm X 40cm - 60g/m² - 50 Folhas - Branco (71889240)",
    image: "/products/pano-multiuso-4.jpg",
    rating: 5,
    reviews: 10,
    oldPrice: "34,99",
    price: "33,24",
    code: "71889240"
  },
  {
    id: 7,
    name: "Lenço Umedecido Antibacteriano - 20cm X 15cm - 50 Unidades (71889250)",
    image: "/products/lenco-umedecido.jpg",
    rating: 5,
    reviews: 12,
    oldPrice: "19,90",
    price: "18,90",
    code: "71889250"
  },
  {
    id: 8,
    name: "Kit Panos Multiuso - 4 Tamanhos Diferentes - 200 Folhas Total (71889260)",
    image: "/products/kit-panos.jpg",
    rating: 5,
    reviews: 15,
    oldPrice: "99,90",
    price: "94,90",
    code: "71889260"
  }
];

export default function HomePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRobot, setIsRobot] = useState(false);
  
  // Estados para o carrossel
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  
  // Ajustar itens por página com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    
    // Definir o valor inicial
    handleResize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Limpar listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Navegar para a próxima página com animação
  const nextPage = () => {
    if (isTransitioning) return;
    
    setDirection('next');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
      
      // Resetar estado de transição após a mudança de página
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };
  
  // Navegar para a página anterior com animação
  const prevPage = () => {
    if (isTransitioning) return;
    
    setDirection('prev');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
      
      // Resetar estado de transição após a mudança de página
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };
  
  // Ir para uma página específica com animação
  const goToPage = (pageIndex: number) => {
    if (isTransitioning || pageIndex === currentPage) return;
    
    setDirection(pageIndex > currentPage ? 'next' : 'prev');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(pageIndex);
      
      // Resetar estado de transição após a mudança de página
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };
  
  // Obter produtos da página atual
  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return productData.slice(startIndex, startIndex + itemsPerPage);
  };

  // Adicionar produto ao carrinho com feedback visual
  const addToCart = (product: Product) => {
    // Aqui você implementaria a lógica real de adicionar ao carrinho
    console.log(`Produto adicionado: ${product.code}`);
    
    // Feedback visual (você pode expandir isso com um toast/notificação)
    const button = document.getElementById(`add-btn-${product.id}`);
    if (button) {
      button.classList.add('bg-green-200', 'text-green-800');
      button.textContent = 'Adicionado ✓';
      
      setTimeout(() => {
        button.classList.remove('bg-green-200', 'text-green-800');
        button.textContent = 'Adicionar';
      }, 1500);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de cadastro na newsletter
    console.log('Newsletter signup:', { name, email, isRobot });
    // Reset form
    setName('');
    setEmail('');
    setIsRobot(false);
  };

  return (
    <main className="w-full relative">
      <Header />
      <Navbar />

      {/* Barra de compromissos */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Compromisso Ober Shop</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-xs">Privacidade segura</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">Pagamentos seguros</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span className="text-xs">Garantia de entrega</span>
              </div>
            </div>
            
            <div className="flex items-center mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-yellow-400" />
                <span className="text-xs">Tenha cuidado com mensagens dos Correios cobrando taxas fictícias não pague.</span>
                <button className="text-xs underline">Ver mais</button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Seção de Categorias */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-10">Categorias</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {/* Artesanato */}
            <Link href="/artesanato" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/artesanato.jpg" 
                  alt="Artesanato" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Artesanato</span>
            </Link>
            
            {/* Beleza */}
            <Link href="/beleza" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/beleza.jpg" 
                  alt="Beleza" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Beleza</span>
            </Link>
            
            {/* Cama, Mesa e Banho */}
            <Link href="/casa-mesa-banho" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/cama-mesa-banho.jpg" 
                  alt="Cama, Mesa e Banho" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Cama, Mesa e Banho</span>
            </Link>
            
            {/* Higiene e Limpeza */}
            <Link href="/higiene-limpeza" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/higiene-limpeza.jpg" 
                  alt="Higiene e Limpeza" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Higiene e Limpeza</span>
            </Link>
            
            {/* Industrial */}
            <Link href="/industrial" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/industrial.jpg" 
                  alt="Industrial" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Industrial</span>
            </Link>
            
            {/* Saúde e Proteção */}
            <Link href="/saude-protecao" className="flex flex-col items-center group">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3 border border-gray-200">
                <Image 
                  src="/categorias/saude-protecao.jpg" 
                  alt="Saúde e Proteção" 
                  width={128} 
                  height={128}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-800 transition-colors">Saúde e Proteção</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Marcas */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-10">Conheça nossas Marcas</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Botão de navegação esquerda */}
            <button 
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Marca anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            
            {/* Marcas */}
            <div className="flex justify-center gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-40 h-24 flex items-center justify-center">
                <Image 
                  src="/marcas/ober-pro.png" 
                  alt="OBER Pro" 
                  width={120} 
                  height={60}
                  className="object-contain max-h-full"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-40 h-24 flex items-center justify-center">
                <Image 
                  src="/marcas/fortlimp.png" 
                  alt="Fortlimp" 
                  width={120} 
                  height={60}
                  className="object-contain max-h-full"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-40 h-24 flex items-center justify-center">
                <Image 
                  src="/marcas/maximo.png" 
                  alt="Máximo!" 
                  width={120} 
                  height={60}
                  className="object-contain max-h-full"
                />
              </div>
            </div>
            
            {/* Botão de navegação direita */}
            <button 
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Próxima marca"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Produtos - Saúde e Proteção */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-600 mb-10">Saúde e Proteção</h2>
          
          <div className="relative overflow-hidden" ref={carouselRef}>
            {/* Botão de navegação esquerda */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={prevPage}
              aria-label="Página anterior"
              disabled={isTransitioning}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            
            {/* Produtos */}
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-8 transition-all duration-300 transform",
                isTransitioning && direction === 'next' && "translate-x-[-10px] opacity-0",
                isTransitioning && direction === 'prev' && "translate-x-[10px] opacity-0"
              )}
            >
              {getCurrentPageItems().map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200 hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-4 overflow-hidden rounded-md">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={200} 
                      height={200}
                      className="object-contain h-48 transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm text-gray-700 h-12 overflow-hidden hover:text-blue-800 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm line-through">
                    R$ {product.oldPrice}
                  </div>
                  <div className="flex items-center text-green-600 font-bold text-xl">
                    R$ {product.price}
                  </div>
                  <div className="flex items-center text-green-600 text-xs mt-1 mb-3">
                    <Image 
                      src="/recorrencia-icon.png" 
                      alt="Recorrência" 
                      width={16} 
                      height={16}
                      className="mr-1"
                    />
                    com recorrência
                  </div>
                  <button 
                    id={`add-btn-${product.id}`}
                    className="w-full py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => addToCart(product)}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
            
            {/* Botão de navegação direita */}
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={nextPage}
              aria-label="Próxima página"
              disabled={isTransitioning}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          
          {/* Indicadores de paginação */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={cn(
                  "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  currentPage === index 
                    ? "w-6 h-2 bg-blue-500 rounded-full" 
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full hover:w-4"
                )}
                aria-label={`Ir para página ${index + 1}`}
                disabled={isTransitioning}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Premiação APAS SHOW */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">OBER é premiada na APAS SHOW</h2>
          
          <div className="relative max-w-3xl mx-auto rounded-lg overflow-hidden">
            <div className="relative pb-[56.25%] bg-black">
              {/* Placeholder para o vídeo */}
              <Image 
                src="/apas-show-video-thumbnail.jpg" 
                alt="OBER na APAS SHOW" 
                fill
                className="object-cover"
              />
              
              {/* Botão de play */}
              <button 
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Reproduzir vídeo"
              >
                <div className="rounded-full bg-white/30 p-4 backdrop-blur-sm">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
              </button>
              
              {/* Controles de navegação */}
              <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70">
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70">
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
          
          <p className="text-center mt-6 max-w-2xl mx-auto">
            Por mais um ano consecutivo o reconhecimento na 
            premiação @apasshow e @popalbrasil de Melhor Estande Sustentável.
          </p>
        </div>
      </section>

      {/* Seção de Newsletter */}
      <section className="bg-blue-900 py-8 border-t border-blue-800">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-white">Receba ofertas e novidades por e-mail</h2>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <Input
              type="text"
              placeholder="Digite seu nome"
              className="max-w-xs bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="E-mail"
              className="max-w-xs bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Checkbox 
                id="not-robot" 
                checked={isRobot}
                onCheckedChange={(checked) => setIsRobot(checked as boolean)}
              />
              <label htmlFor="not-robot" className="text-sm text-white">
                Não sou um robô
              </label>
              <Image 
                src="/recaptcha.png" 
                alt="reCAPTCHA" 
                width={70} 
                height={40}
                className="ml-2" 
              />
            </div>
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              CADASTRAR
            </Button>
          </form>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefício 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-blue-900">
                <Shield size={48} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Compre com segurança</h3>
              <p className="text-sm text-gray-600">Seus Dados Sempre Protegidos</p>
            </div>

            {/* Benefício 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-blue-900">
                <CreditCard size={48} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Parcele suas compras</h3>
              <p className="text-sm text-gray-600">Em até 3 Vezes</p>
            </div>

            {/* Benefício 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-blue-900">
                <Truck size={48} />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Entrega em todo Brasil</h3>
              <p className="text-sm text-gray-600">Via Transportadora ou Correios</p>
            </div>

            {/* Benefício 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 text-blue-900">
                <Image 
                  src="/pix-icon.png" 
                  alt="Pix" 
                  width={48} 
                  height={48} 
                />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Pague com o Pix</h3>
              <p className="text-sm text-gray-600">Aceitamos pagamentos via Pix</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Redes Sociais */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-8">Acompanhe a Ober Shop</h2>
          <div className="flex justify-center gap-6">
            <Link href="https://instagram.com/obershop" target="_blank" className="bg-blue-800 p-4 rounded-full hover:bg-blue-700 transition-colors">
              <Instagram size={24} />
            </Link>
            <Link href="https://facebook.com/obershop" target="_blank" className="bg-blue-800 p-4 rounded-full hover:bg-blue-700 transition-colors">
              <Facebook size={24} />
            </Link>
            <Link href="https://tiktok.com/@obershop" target="_blank" className="bg-blue-800 p-4 rounded-full hover:bg-blue-700 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.321 5.562C18.0715 4.35539 17.3351 2.70424 17.273 0.964H12.701V16.217C12.701 18.382 11.041 20.133 8.92 20.133C6.799 20.133 5.139 18.382 5.139 16.217C5.139 14.052 6.799 12.301 8.92 12.301C9.371 12.301 9.8 12.378 10.201 12.518V7.762C9.779 7.688 9.351 7.651 8.92 7.651C4.264 7.651 0.5 11.493 0.5 16.217C0.5 20.941 4.264 24.783 8.92 24.783C13.576 24.783 17.34 20.941 17.34 16.217V8.393C19.053 9.643 21.107 10.349 23.273 10.349V5.699C23.273 5.699 21.046 5.699 19.321 5.562Z" fill="white"/>
              </svg>
            </Link>
            <Link href="https://youtube.com/obershop" target="_blank" className="bg-blue-800 p-4 rounded-full hover:bg-blue-700 transition-colors">
              <Youtube size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Botão flutuante do WhatsApp */}
      <Link 
        href="https://api.whatsapp.com/send?phone=5519983052559" 
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contato via WhatsApp"
      >
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={30}
          height={30}
        />
      </Link>

      {/* Rodapé completo */}
      <Footer />
    </main>
  );
}













