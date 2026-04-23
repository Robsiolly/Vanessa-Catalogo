/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  Target,
  Award,
  Handshake
} from 'lucide-react';

// --- Types ---
type Page = "catalog" | "gym-cleaning";

// --- Components ---

const GymCleaningPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTatameCard, setCurrentTatameCard] = useState(0);
  
  const slides = [
    { url: "/5.jpeg", title: "Higienização de Equipamentos", desc: "Aplicação de produtos específicos que preservam o material e eliminam 99.9% dos microrganismos." },
    { url: "/6.jpeg", title: "Padrão de Recepção Premium", desc: "Primeira impressão é a que fica. Ambientes impecáveis para receber seus alunos com elegância." },
    { url: "/7.jpeg", title: "Vestiários e Áreas Úmidas", desc: "Controle bacteriológico rigoroso e desinfecção profunda em áreas de alto contato." },
    { url: "/8.jpeg", title: "Studios de Alta Performance", desc: "Limpeza técnica para salas de aula coletiva, mantendo o ambiente fresco e motivador." },
    { url: "/9.jpeg", title: "Excelência Haja Clean", desc: "O cuidado que sua marca merece em cada detalhe do ambiente de treino." },
    { url: "/10.jpeg", title: "Manutenção de Pisos", desc: "Tratamento especializado para pisos esportivos, garantindo brilho e aderência ideal." },
    { url: "/11.jpeg", title: "Segurança Sanitária", desc: "Protocolos rigorosos de desinfecção para garantir a saúde de alunos e colaboradores." },
    { url: "/12.jpeg", title: "Ambientes Renovados", desc: "Sua academia sempre com aspecto de nova, elevando a percepção de valor dos seus clientes." }
  ];

  const tatameCards = [
    {
      title: "Tatames Verdadeiramente Higienizados",
      text: "Ambientes esportivos acumulam microrganismos invisíveis. Nossa higienização profissional reduz riscos e eleva o padrão sanitário do espaço."
    },
    {
      title: "Limpeza Técnica Especializada",
      text: "Aplicação controlada de produtos e equipamentos adequados para limpeza profunda sem desgaste do tatame."
    },
    {
      title: "Mais Saúde no Ambiente de Treino",
      text: "Eliminação de odores, fungos e bactérias responsáveis por contaminações comuns em áreas esportivas."
    },
    {
      title: "Padrão Profissional Haja Clean",
      text: "Resultado visível, acabamento uniforme e sensação real de ambiente renovado."
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const nextTatame = () => setCurrentTatameCard((prev) => (prev + 1) % tatameCards.length);
  const prevTatame = () => setCurrentTatameCard((prev) => (prev - 1 + tatameCards.length) % tatameCards.length);

  // Parallax Effect for Image
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 25);
    setRotateY((centerX - x) / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#f8f9fa] flex flex-col overflow-y-auto overflow-x-hidden"
    >
      {/* Header Editorial */}
      <header className="sticky top-0 w-full h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
            <svg viewBox="0 0 120 120" className="w-8 h-8">
              <text x="10" y="85" className="fill-[#137067]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>H</text>
              <text x="45" y="85" className="fill-brand-coral" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-brand-coral leading-none">Haja Clean</span>
            <span className="text-[8px] tracking-widest text-[#137067] font-bold">Facilities Services</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm pointer-events-auto"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Início</span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Block 1: Intro & Main Carousel */}
        <section className="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex flex-col lg:flex-row overflow-hidden border-b border-gray-100">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-[45%] p-6 md:p-10 lg:p-24 flex flex-col justify-center bg-white z-10 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-brand-teal mb-6">
                <Dumbbell className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Serviço Especializado</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-black leading-tight mb-8">
                Limpeza Profissional <br />
                <span className="text-brand-teal">para Academias</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
                A Haja Clean Facilities oferece soluções completas de higienização para academias, 
                garantindo segurança, saúde e excelência operacional para seus alunos e colaboradores.
              </p>

              <ul className="space-y-4">
                {["Limpeza de equipamentos", "Tatames", "Pisos", "Sanitização"].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-2 text-gray-700 font-medium text-xs md:text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Interactive Carousel */}
          <div className="w-full lg:w-[55%] relative flex items-center justify-center p-4 md:p-12 lg:p-20 bg-gray-50/50">
            <div className="relative w-full h-full max-w-4xl aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] bg-black">
              <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.4, rotateY: 15, z: -200, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -15, z: 200, filter: "blur(20px)" }}
                transition={{ 
                  duration: 0.9, 
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.6 }
                }}
                className="absolute inset-0 perspective-1000"
              >
                {/* Parallax Container */}
                <motion.div
                  animate={{
                    x: rotateY * 2,
                    y: rotateX * 2
                  }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={slides[currentSlide].url} 
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Neon Glow Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-teal/20 to-transparent pointer-events-none" />
                </motion.div>

                {/* Content Overlay with staggered animation */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                      <div className="h-[1px] w-8 bg-brand-coral" />
                      <span className="text-brand-coral font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Lifestyle Gym</span>
                    </div>
                    <h3 className="text-lg md:text-3xl font-display font-bold text-white mb-2 md:mb-3 leading-tight drop-shadow-2xl">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-base font-light max-w-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                      {slides[currentSlide].desc}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute bottom-12 right-12 flex items-center gap-6 z-20">
              <div className="hidden sm:flex gap-3 mr-6">
                {slides.map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      width: i === currentSlide ? 40 : 8,
                      backgroundColor: i === currentSlide ? "#F07050" : "rgba(255,255,255,0.3)"
                    }}
                    className="h-1.5 rounded-full transition-all duration-500"
                  />
                ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all shadow-2xl"
              >
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white transition-all shadow-2xl"
              >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

        {/* Block 2: Limpeza Profissional de Tatames */}
        <section className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8f9fa] py-16 md:py-24 px-6 md:px-12 lg:px-24 gap-12 lg:gap-24 items-center">
          {/* Left Side: Container for Image + Badge */}
          <div className="w-full lg:w-1/2 relative">
            {/* Image Container using local file for 100% reliability */}
            <div className="relative min-h-[500px] lg:min-h-[650px] w-full bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <img 
                src="/13.jpeg" 
                alt="Limpeza Profissional de Tatames Haja Clean"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hidden md:flex flex-col items-center z-20">
              <ShieldCheck className="w-10 h-10 text-brand-teal mb-2" />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">Qualidade</span>
                <span className="text-xs font-black uppercase tracking-[0.1em] text-brand-teal">Haja Clean</span>
              </div>
            </div>
          </div>

          {/* Right Side: 3D Interactive Cards */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-6">
                Limpeza Profissional <br />
                <span className="text-brand-teal">de Tatames</span>
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                Os tatames são áreas de contato direto e intenso, exigindo um nível superior de higienização. 
                A Haja Clean Facilities aplica técnicas especializadas que eliminam bactérias, odores e impurezas 
                sem comprometer a estrutura do material, garantindo segurança e desempenho para atletas e alunos.
              </p>
            </motion.div>

            {/* 3D Card Container */}
            <div className="relative perspective-1000 min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTatameCard}
                  initial={{ opacity: 0, rotateY: 30, x: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, rotateY: -30, x: -40, filter: "blur(8px)" }}
                  whileHover={{ rotateY: 8, rotateX: -3, scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) prevTatame();
                    if (info.offset.x < -50) nextTatame();
                  }}
                  className="w-full max-w-lg bg-white/50 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.02)] cursor-grab active:cursor-grabbing"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {tatameCards[currentTatameCard].title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed font-light">
                    {tatameCards[currentTatameCard].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Card Navigation */}
              <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-between px-4">
                <div className="flex gap-2">
                  {tatameCards.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-700 ${i === currentTatameCard ? "w-10 bg-brand-teal" : "w-2 bg-gray-200"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={prevTatame}
                    className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-teal hover:border-brand-teal transition-all shadow-sm group"
                  >
                    <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
                  </button>
                  <button 
                    onClick={nextTatame}
                    className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-teal hover:border-brand-teal transition-all shadow-sm group"
                  >
                    <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-[100] p-4 md:p-8 flex items-center">
      {/* Card com Efeito Vidro 3D - Fixo no Topo Esquerdo */}
      <div className="flex items-center gap-2 md:gap-4 bg-white/60 backdrop-blur-2xl px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 ring-1 ring-brand-teal/5">
        <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <text x="10" y="85" className="fill-brand-teal" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>H</text>
            <text x="45" y="85" className="fill-brand-coral" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            <line x1="25" y1="55" x2="105" y2="55" stroke="var(--color-brand-teal)" strokeWidth="3" />
            <path d="M100 48 L115 55 L100 62 Z" fill="var(--color-brand-teal)" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-base md:text-xl font-serif font-bold tracking-tight text-brand-coral leading-none">
            Haja Clean
          </h1>
          <span className="text-[8px] md:text-[12px] tracking-[0.3em] text-brand-teal font-bold mt-1">
            Facilities Services
          </span>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ onNext }: { onNext: () => void }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    {
      icon: <Target className="w-8 h-8 text-brand-teal" />,
      title: "MISSÃO",
      content: "Oferecer serviços de limpeza profissional com excelência, responsabilidade e alto padrão de qualidade."
    },
    {
      icon: <Award className="w-8 h-8 text-brand-teal" />,
      title: "VALORES",
      content: "Profissionalismo, Transparência, Responsabilidade e Compromisso com a qualidade em cada detalhe."
    },
    {
      icon: <Handshake className="w-8 h-8 text-brand-teal" />,
      title: "COMPROMISSO",
      content: "Processos organizados e métodos profissionais que asseguram confiança e resultados consistentes."
    }
  ];

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden px-6 lg:px-12 py-32">
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="/1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center text-center">
        {/* Header Institucional */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-12 bg-brand-coral" />
            <span className="text-brand-coral font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">Bem vindo à Haja Clean</span>
            <div className="h-px w-12 bg-brand-coral" />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-gray-400 tracking-tighter leading-[0.9]">
            HAJA CLEAN
          </h2>
          
          <p className="text-xl md:text-3xl text-white/50 font-light tracking-tight mt-6 max-w-3xl mx-auto">
            Limpeza Especializada para <br />
            <span className="text-gray-400 font-medium border-b-2 border-brand-teal pb-1">Academias e Studios</span>
          </p>
        </motion.div>

        {/* Info Slider Section */}
        <div className="w-full max-w-2xl relative">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl relative group">
            {/* Glossy accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 blur-[60px] rounded-full -mr-16 -mt-16" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                    {cards[currentCard].icon}
                   </div>
                   <h3 className="text-brand-coral font-black tracking-[0.3em] uppercase text-xs">
                    {cards[currentCard].title}
                   </h3>
                </div>
                <p className="text-white/80 text-lg md:text-xl font-light text-left leading-relaxed">
                  {cards[currentCard].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls Inside */}
            <div className="flex items-center justify-between mt-12 md:mt-16 border-t border-white/10 pt-8">
              <div className="flex gap-2">
                {cards.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentCard(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${i === currentCard ? 'w-10 bg-brand-teal' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={prevCard} 
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextCard} 
                  className="p-3 rounded-full bg-brand-teal hover:bg-brand-teal/80 text-white transition-all shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-4 group"
        >
          <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.5em] group-hover:text-brand-coral transition-colors">Arraste para conhecer</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-16 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-brand-teal rounded-full" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

const AboutSection = ({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) => {
  return (
    <section className="relative min-h-screen w-full overflow-y-auto flex flex-col items-center justify-start bg-white px-6 md:px-12 pt-[140px] md:pt-[200px] pb-20">
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-brand-teal font-medium tracking-[0.4em] uppercase text-xs md:text-sm mb-6 mt-10">Nossa Identidade</h3>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-black mb-8 leading-tight">
            Excelência em cada <br />
            <span className="text-brand-teal">Detalhe</span>
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-premium-dark/70 leading-relaxed">
            <p>
              A Haja Clean é especialista em higienização de alta performance para academias e centros esportivos. 
              Entendemos que ambientes de treino exigem um rigor sanitário superior para garantir a saúde e segurança de seus alunos.
            </p>
            <p>
              Nossa equipe utiliza protocolos específicos para eliminação de fungos e bactérias em equipamentos e tatames, 
              garantindo um ambiente impecável que valoriza sua marca e fideliza seus clientes.
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-6">
            <div className="flex items-center gap-3 bg-brand-teal/5 px-6 py-3 rounded-2xl border border-brand-teal/10">
              <ShieldCheck className="w-6 h-6 text-brand-teal" />
              <span className="font-bold text-premium-dark text-sm uppercase tracking-wider">Segurança Total</span>
            </div>
            <div className="flex items-center gap-3 bg-brand-teal/5 px-6 py-3 rounded-2xl border border-brand-teal/10">
              <Sparkles className="w-6 h-6 text-brand-teal" />
              <span className="font-bold text-premium-dark text-sm uppercase tracking-wider">Qualidade Premium</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="/nossa_identidade.jpg" 
              alt="Profissional Haja Clean em serviço"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Badge Flutuante */}
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-teal rounded-2xl flex items-center justify-center text-white">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-bold text-premium-dark leading-none">100%</p>
                <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mt-1">Equipe Treinada</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesSection = ({ onPrev }: { onPrev: () => void }) => {
  const services = [
    { title: "Higienização de Equipamentos", icon: "🧼", desc: "Limpeza técnica de aparelhos de musculação e cardio, removendo suor, bactérias e resíduos sem danificar superfícies." },
    { title: "Limpeza de Pisos e Áreas de Treino", icon: "🧽", desc: "Tratamento adequado para cada tipo de piso, garantindo segurança, estética e durabilidade." },
    { title: "Desinfecção de Tatames", icon: "🥋", desc: "Higienização profunda com produtos específicos que eliminam microrganismos e odores." },
    { title: "Limpeza de Vestiários e Banheiros", icon: "🚿", desc: "Controle rigoroso de higiene em áreas críticas, prevenindo contaminações e mau cheiro." },
    { title: "Sanitização de Áreas Comuns", icon: "🧴", desc: "Recepção, corredores e espaços compartilhados sempre limpos e organizados." },
    { title: "Rotina Operacional Profissional", icon: "👥", desc: "Execução baseada em cronogramas, controle de ponto e supervisão contínua da equipe." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => setCurrentIndex((prev) => (prev + 1) % services.length);
  const prevService = () => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);

  return (
    <section className="relative min-h-screen w-full overflow-y-auto flex flex-col items-center justify-start bg-premium-gray px-4 md:px-12 pt-[60px] md:pt-[100px] pb-12 overflow-hidden">
      {/* Background de Academia em Relevo (Sutil) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply grayscale">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 md:mt-12 mb-2 md:mb-4"
        >
          <h3 className="text-brand-teal font-medium tracking-[0.4em] uppercase text-[9px] md:text-xs mb-1 md:mb-2">Especialidades</h3>
          <h2 className="text-xl md:text-3xl font-display font-bold text-black">
            Nossos <span className="text-brand-teal">Serviços</span>
          </h2>
        </motion.div>

        {/* Carrossel de Cards 3D Efeito Vidro */}
        <div className="w-full relative flex items-center justify-center gap-1 md:gap-6 perspective-1000">
          <button 
            onClick={prevService}
            className="p-1.5 md:p-3 rounded-full bg-white/40 backdrop-blur-md shadow-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all z-20"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="flex-1 max-w-3xl overflow-hidden py-2 px-1 md:px-2">
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, rotateY: 45, x: 50 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: -45, x: -50 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  whileHover={{ 
                    rotateX: 5, 
                    rotateY: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="w-full max-w-[280px] sm:max-w-md aspect-video bg-white/30 backdrop-blur-2xl p-3 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center gap-1.5 md:gap-3 relative overflow-hidden group"
                >
                  {/* Reflexo de Vidro */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                  
                  <div className="text-2xl md:text-4xl mb-0.5 drop-shadow-lg">{services[currentIndex].icon}</div>
                  <h3 className="text-sm md:text-xl font-bold text-black uppercase tracking-wider leading-tight">
                    {services[currentIndex].title}
                  </h3>
                  <p className="text-premium-dark/80 leading-relaxed text-[10px] md:text-sm max-w-[95%] md:max-w-[90%]">
                    {services[currentIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button 
            onClick={nextService}
            className="p-1.5 md:p-3 rounded-full bg-white/40 backdrop-blur-md shadow-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all z-20"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Indicadores de Progresso Compactos */}
        <div className="flex gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === i ? 'w-8 bg-brand-teal' : 'w-2 bg-premium-dark/10'
              }`}
            />
          ))}
        </div>

        {/* Frase de Autoridade */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 max-w-2xl text-center px-4"
        >
          <p className="text-premium-dark/70 font-medium italic text-sm md:text-base leading-relaxed">
            <span className="text-brand-teal text-2xl block mb-3">💡</span>
            "Mais do que limpeza, entregamos padrão profissional para academias que valorizam segurança, organização e experiência do aluno."
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-4 bg-premium-dark text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-brand-teal transition-all"
        >
          Solicitar Orçamento
        </motion.button>
      </div>
    </section>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("catalog");
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSections = 3;

  const paginate = (newDirection: number) => {
    const nextSection = currentSection + newDirection;
    if (nextSection >= 0 && nextSection < totalSections) {
      setDirection(newDirection);
      setCurrentSection(nextSection);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : (direction > 0 ? '100%' : '-100%'),
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    })
  };

  return (
    <div className="relative min-h-screen w-full bg-premium-gray font-sans selection:bg-brand-teal/30 selection:text-premium-dark">
      {currentPage === "catalog" ? (
        <div key="catalog" className="min-h-screen w-full relative">
          {/* Navegação Lateral (Dots) */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[110] hidden md:flex flex-col gap-5">
            {Array.from({ length: totalSections }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentSection ? 1 : -1);
                  setCurrentSection(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentSection === i ? 'bg-brand-teal scale-150 shadow-[0_0_15px_rgba(19,112,103,0.6)]' : 'bg-premium-dark/20 hover:bg-brand-teal/40'
                }`}
                aria-label={`Ir para seção ${i + 1}`}
              />
            ))}
          </div>

          {/* Botões de Navegação Laterais (Estilo Catálogo Premium) - Agora menores e mais acima */}
          <div className="fixed top-[120px] md:top-[160px] left-0 right-0 pointer-events-none z-[105] flex items-center justify-between px-6 md:px-12">
            {currentSection > 0 ? (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => paginate(-1)}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-xl flex items-center justify-center text-premium-dark hover:bg-white hover:scale-110 transition-all group"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
            ) : <div />}

            {currentSection < totalSections - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => paginate(1)}
                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-xl flex items-center justify-center text-premium-dark hover:bg-white hover:scale-110 transition-all group"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            )}
          </div>

          {/* Botão de Academias Fixo no Topo Direito */}
          <button
            onClick={() => setCurrentPage("gym-cleaning")}
            className="fixed top-8 right-8 z-[110] bg-white/60 backdrop-blur-2xl px-4 py-3 md:px-6 rounded-full border border-white/40 shadow-2xl flex items-center gap-3 hover:bg-white hover:scale-105 transition-all group"
          >
            <Dumbbell className="w-4 h-4 text-brand-teal" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-dark hidden md:block">Academia</span>
          </button>

          <Header />
          
          <main className="min-h-screen w-full relative bg-premium-gray">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentSection}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                  filter: { duration: 0.5 }
                }}
                className="absolute inset-0 w-full h-full"
              >
                {currentSection === 0 && <HeroSection onNext={() => paginate(1)} />}
                {currentSection === 1 && (
                  <AboutSection 
                    onNext={() => paginate(1)} 
                    onPrev={() => paginate(-1)} 
                  />
                )}
                {currentSection === 2 && (
                  <ServicesSection onPrev={() => paginate(-1)} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Copyright Discreto */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] opacity-30">
            <p className="text-[8px] md:text-[10px] text-premium-dark tracking-[0.4em] uppercase whitespace-nowrap">
              © 2026 Haja Clean • Catálogo Digital Corporativo
            </p>
          </div>
        </div>
      ) : (
        <GymCleaningPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      )}
    </div>
  );
}
