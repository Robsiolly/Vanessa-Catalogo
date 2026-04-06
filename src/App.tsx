/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
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
  ArrowRight
} from 'lucide-react';

// --- Types ---
type Page = "catalog" | "gym-cleaning";

// --- Components ---

const GymCleaningPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTatameCard, setCurrentTatameCard] = useState(0);
  
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
      title: "Equipamentos Sempre Higienizados",
      desc: "Limpeza técnica focada em áreas de contato intenso para garantir a segurança dos alunos."
    },
    {
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200",
      title: "Tatames e Áreas Funcionais",
      desc: "Processo antibacteriano profissional que elimina riscos biológicos em superfícies porosas."
    },
    {
      url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200",
      title: "Tratamento Especializado de Pisos",
      desc: "Proteção e conservação com acabamento premium para pisos vinílicos e emborrachados."
    },
    {
      url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200",
      title: "Preparação Pré e Pós-Obra",
      desc: "Limpeza profunda para inaugurações ou reformas, entregando a academia pronta para uso."
    }
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
              <text x="10" y="85" className="fill-[#137067]" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '85px' }}>H</text>
              <text x="45" y="85" className="fill-[#e67e22]" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-none">Haja Clean</span>
            <span className="text-[8px] uppercase tracking-widest text-[#137067] font-bold">Facilities</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Catálogo
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Block 1: Intro & Main Carousel */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row overflow-hidden border-b border-gray-100">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-[45%] p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white z-10">
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-8">
                Limpeza Profissional <br />
                <span className="text-brand-teal">para Academias</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
                A Haja Clean Facilities oferece soluções completas de higienização para academias, 
                garantindo segurança, saúde e excelência operacional para seus alunos e colaboradores.
              </p>

              <ul className="space-y-4">
                {[
                  "Limpeza geral de equipamentos",
                  "Higienização de tatames",
                  "Tratamento de pisos",
                  "Limpeza pré e pós-obra",
                  "Sanitização de áreas de alto contato"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Interactive Carousel */}
          <div className="w-full lg:w-[55%] relative bg-gray-100 overflow-hidden min-h-[400px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={slides[currentSlide].url} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Slide Content Overlay */}
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl md:text-3xl font-bold mb-2"
                  >
                    {slides[currentSlide].title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/80 text-lg font-light max-w-lg"
                  >
                    {slides[currentSlide].desc}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
              <div className="hidden sm:flex gap-2 mr-4">
                {slides.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Block 2: Limpeza Profissional de Tatames */}
        <section className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8f9fa] py-16 md:py-24 px-6 md:px-12 lg:px-24 gap-12 lg:gap-24 items-center">
          {/* Left Side: Container for Image + Badge */}
          <div className="w-full lg:w-1/2 relative">
            {/* Image Container */}
            <div className="relative min-h-[400px] flex items-center justify-center bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://storage.googleapis.com/pigeon-vop-public/rndzaxhtei4afeu5dcphw4/1743942903038-tatame-cleaning.jpg" 
                alt="Limpeza Profissional de Tatames"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/5 to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white hidden md:block z-10">
              <ShieldCheck className="w-8 h-8 text-brand-teal mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Autenticidade</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal">Haja Clean</span>
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
              <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">
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
                  className="w-full bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.03)] cursor-grab active:cursor-grabbing"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-8">
                    <Sparkles className="w-7 h-7 text-brand-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {tatameCards[currentTatameCard].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
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
const Header = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // Transição de posição otimizada para o novo tamanho menor
  const x = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "calc(100vw - 280px)"]);
  const y = useTransform(scrollYProgress, [0.1, 0.4], ["0px", "calc(100vh - 120px)"]);
  
  const scale = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [1, 1.05, 1]);

  return (
    <motion.header 
      style={{ x, y, scale }}
      className="fixed top-0 left-0 z-[100] p-4 md:p-6 flex items-center pointer-events-none"
    >
      {/* Card com Efeito Vidro 3D */}
      <div className="flex items-center gap-2 md:gap-3 pointer-events-auto bg-white/40 backdrop-blur-2xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.5)] border border-white/40 ring-1 ring-brand-teal/10">
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <text x="10" y="85" className="fill-brand-teal" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '85px' }}>H</text>
            <text x="45" y="85" className="fill-brand-coral" style={{ fontFamily: 'serif', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            <line x1="25" y1="55" x2="105" y2="55" stroke="var(--color-brand-teal)" strokeWidth="3" />
            <path d="M100 48 L115 55 L100 62 Z" fill="var(--color-brand-teal)" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm md:text-lg font-display font-bold tracking-tight text-premium-dark leading-none">
            Haja Clean
          </h1>
          <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] text-brand-teal font-bold">
            Facilities Services
          </span>
        </div>
      </div>
    </motion.header>
  );
};

const HeroSection = ({ scrollYProgress, onNext }: { scrollYProgress: any, onNext: () => void }) => {
  // Efeitos cinematográficos baseados no scroll
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Metálico com Degradê de 3 Tons */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 bg-white"
      >
        {/* Camada 1: Degradê Base (Branco -> Cinza -> Verde) */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#d1d5db_45%,#137067_100%)] opacity-80" />
        
        {/* Camada 2: Brilho Metálico (Simula reflexo de metal) */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.8)_45%,rgba(255,255,255,0.8)_50%,transparent_65%)] mix-blend-overlay" />
        
        {/* Camada 3: Textura de Alumínio Escovado */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
        
        {/* Camada 4: Vinheta Suave para Foco Central */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 text-center px-6 max-w-4xl pt-16 md:pt-24"
      >
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-premium-dark tracking-tighter leading-tight mb-4 md:mb-6">
          Excelência em <br />
          <span className="text-brand-teal">Limpeza Profissional</span>
        </h2>
        <p className="text-base md:text-xl text-premium-dark/80 font-medium max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
          Transformamos ambientes corporativos com sofisticação, tecnologia e o mais alto rigor técnico em facilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(19, 112, 103, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-md px-8 py-4 md:px-10 md:py-5 rounded-full flex items-center gap-3 group transition-all duration-500 shadow-2xl border-2 border-brand-teal/40"
          >
            <span className="font-bold tracking-wide text-premium-dark">Próxima Seção</span>
            <ChevronDown className="w-5 h-5 text-brand-teal group-hover:translate-y-1 transition-transform" />
          </motion.button>
          
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-premium-dark/10 text-premium-dark font-bold hover:bg-premium-dark/20 transition-all"
          >
            Início
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-brand-teal to-transparent" />
      </motion.div>
    </section>
  );
};

const AboutSection = ({ scrollYProgress, onNext, onPrev }: { scrollYProgress: any, onNext: () => void, onPrev: () => void }) => {
  const yBg = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);
  const opacityContent = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  return (
    <section className="relative min-h-screen w-full py-16 md:py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-premium-dark">
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920" 
          alt="Modern Corporate Office"
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-premium-dark via-transparent to-premium-dark" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacityContent }}
        className="relative z-20 max-w-[1200px] w-full text-center"
      >
        <h3 className="text-brand-teal font-medium tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4">Nossa Identidade</h3>
        <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">Compromisso com a <br /> Perfeição Invisível</h2>
        <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-10">
          A Haja Clean Facilities Services nasceu para redefinir o conceito de manutenção e limpeza. 
          Não entregamos apenas serviços; entregamos tranquilidade e valorização patrimonial através de uma gestão impecável.
        </p>

        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

const ServicesSection = ({ scrollYProgress, onPrev }: { scrollYProgress: any, onPrev: () => void }) => {
  // Removidos efeitos de opacidade progressiva para leitura imediata
  
  const cards = [
    { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-brand-teal" />, title: "Rigor Técnico", desc: "Processos certificados e equipe altamente treinada para ambientes de alta complexidade." },
    { icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-brand-coral" />, title: "Tecnologia", desc: "Equipamentos de última geração e produtos sustentáveis de alta performance." },
    { icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-brand-teal" />, title: "Eficiência", desc: "Gestão inteligente de cronogramas para garantir a continuidade do seu negócio." },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-brand-coral" />, title: "Personalização", desc: "Soluções sob medida para as necessidades específicas de cada infraestrutura." }
  ];

  return (
    <section className="relative min-h-screen w-full py-16 md:py-24 px-6 flex flex-col items-center justify-center bg-premium-gray overflow-hidden">
      <div className="relative z-20 max-w-[1200px] w-full">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-brand-teal font-medium tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4">Especialidades</h3>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-premium-dark mb-6 md:mb-8">Soluções em Facilities</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glass p-6 md:p-8 rounded-3xl flex flex-col gap-4 md:gap-6 border-premium-dark/5 shadow-md bg-white/60"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                {card.icon}
              </div>
              <h4 className="text-lg md:text-xl font-display font-bold text-premium-dark">{card.title}</h4>
              <p className="text-premium-dark/60 leading-relaxed text-xs md:text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center">
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-md px-8 py-4 md:px-10 md:py-5 rounded-full flex items-center gap-3 group shadow-2xl border-2 border-brand-teal/30"
          >
            <ChevronUp className="w-5 h-5 text-brand-teal group-hover:-translate-y-1 transition-transform" />
            <span className="font-bold text-premium-dark">Voltar ao Topo</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("catalog");
  const { scrollYProgress } = useScroll();

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative bg-premium-gray font-sans selection:bg-brand-teal/30 selection:text-premium-dark">
      {currentPage === "catalog" ? (
        <div key="catalog">
          {/* Botão de Academias Fixo no Topo Direito */}
          <button
            onClick={() => setCurrentPage("gym-cleaning")}
            className="fixed top-6 right-6 z-[110] bg-white/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 shadow-xl flex items-center gap-2 hover:bg-white/60 transition-all group"
          >
            <Dumbbell className="w-3 h-3 text-brand-teal" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-premium-dark">Academias</span>
          </button>

          <Header scrollYProgress={scrollYProgress} />
          
          <main className="relative">
            <HeroSection scrollYProgress={scrollYProgress} onNext={() => scrollToSection(1)} />
            <AboutSection 
              scrollYProgress={scrollYProgress} 
              onNext={() => scrollToSection(2)} 
              onPrev={() => scrollToSection(0)} 
            />
            <ServicesSection scrollYProgress={scrollYProgress} onPrev={() => scrollToSection(0)} />
          </main>

          {/* Footer / Copyright */}
          <footer className="py-12 px-6 text-center border-t border-premium-dark/5 relative z-10 bg-premium-gray">
            <p className="text-xs text-premium-dark/40 tracking-widest uppercase">
              © 2026 Haja Clean Facilities Services. Todos os direitos reservados.
            </p>
          </footer>
        </div>
      ) : (
        <GymCleaningPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      )}
    </div>
  );
}
