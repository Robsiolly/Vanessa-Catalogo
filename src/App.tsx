/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronDown, ChevronUp, ShieldCheck, Sparkles, Clock, Users } from 'lucide-react';

// --- Components ---

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-md px-8 py-4 md:px-10 md:py-5 rounded-full flex items-center gap-3 group shadow-2xl border-2 border-brand-teal/30"
          >
            <span className="font-bold text-premium-dark">Ver Serviços</span>
            <ChevronDown className="w-5 h-5 text-brand-teal group-hover:translate-y-1 transition-transform" />
          </motion.button>
          
          <motion.button
            onClick={onPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all border border-white/20"
          >
            Voltar
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
  const { scrollYProgress } = useScroll();

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative bg-premium-gray">
      <Header scrollYProgress={scrollYProgress} />
      
      <main className="relative">
        <HeroSection scrollYProgress={scrollYProgress} onNext={() => scrollToSection(1)} />
        <AboutSection scrollYProgress={scrollYProgress} onNext={() => scrollToSection(2)} onPrev={() => scrollToSection(0)} />
        <ServicesSection scrollYProgress={scrollYProgress} onPrev={() => scrollToSection(0)} />
      </main>

      {/* Cinematic Transition Overlay */}
      <AnimatePresence>
        {/* This could be used for specific transition effects between sections */}
      </AnimatePresence>

      {/* Footer / Copyright */}
      <footer className="py-12 px-6 text-center border-t border-premium-dark/5 relative z-10 bg-premium-gray">
        <p className="text-xs text-premium-dark/40 tracking-widest uppercase">
          © 2026 Haja Clean Facilities Services. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
