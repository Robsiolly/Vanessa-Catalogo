/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
  Handshake,
  Stethoscope,
  Phone,
  Mail,
  MessageSquare,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

// --- Animation Variants ---
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const slideUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  viewport: { once: true, margin: "-50px" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  viewport: { once: true }
};

const premiumHover = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const textReveal = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// --- Types ---
type Page = "catalog" | "gym-cleaning" | "clinic-cleaning" | "products" | "about" | "contact";

// --- Components ---

const Counter: React.FC<{ value: number }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    let timer: any;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const increment = end / (duration / 16);
        const updateCount = () => {
          start += increment;
          if (start < end) {
            setCount(Math.floor(start));
            timer = requestAnimationFrame(updateCount);
          } else {
            setCount(end);
          }
        };
        updateCount();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => {
      if (timer) cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [value]);
  
  return <span ref={nodeRef} className="text-4xl md:text-5xl font-bold text-white group-hover:text-brand-teal transition-colors">{count}</span>;
};


const ClinicCleaningPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  
  const slides = [
    { url: "/clinica/1.mp4", title: "Desinfecção de Ambientes Críticos", desc: "Protocolos rigorosos para salas de exames e consultórios, garantindo esterilização e segurança." },
    { url: "/clinica/2.mp4", title: "Gestão de Resíduos Hospitalares", desc: "Manuseio especializado seguindo todas as normas da ANVISA para descarte seguro." },
    { url: "/clinica/3.mp4", title: "Limpeza Técnica de Superfícies", desc: "Uso de desinfetantes de nível hospitalar que eliminam 99.9% de patógenos." },
    { url: "/clinica/4.mp4", title: "Padrão de Recepção e Espera", desc: "Ambientes impecáveis que transmitem confiança e cuidado para seus pacientes." },
    { url: "/clinica/5.mp4", title: "Higienização de Mobiliário Clínico", desc: "Cuidado minucioso com macas, cadeiras e equipamentos sensíveis." },
    { url: "/clinica/6.mp4", title: "Vestiários e Áreas de Apoio", desc: "Controle bacteriológico rigoroso em todas as dependências da clínica." },
    { url: "/clinica/7.mp4", title: "Qualidade do Ar e Ambiente", desc: "Práticas que auxiliam na manutenção da pureza do ar em ambientes fechados." },
    { url: "/clinica/8.mp4", title: "Segurança Profissionais", desc: "Proteção para sua equipe através de um ambiente de trabalho higienizado profissionalmente." },
    { url: "/clinica/9.mp4", title: "Excelência Haja Clean Saúde", desc: "O padrão ouro em facilities para o setor de saúde e bem-estar." }
  ];

  const clinicCards = [
    {
      title: "Segurança Biológica Rigorosa",
      text: "Nossos processos são desenhados para mitigar riscos de contaminação cruzada em ambientes de saúde."
    },
    {
      title: "Treinamento Especializado",
      text: "Equipe capacitada especificamente para as particularidades e normativas do ambiente clínico."
    },
    {
      title: "Produtos de Nível Hospitalar",
      text: "Utilizamos apenas insumos certificados que garantem a eficácia da desinfecção sem agredir o patrimônio."
    },
    {
      title: "Compliance e Auditoria",
      text: "Relatórios detalhados e acompanhamento rigoroso para garantir que sua clínica esteja sempre em conformidade."
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % clinicCards.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + clinicCards.length) % clinicCards.length);

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
      <header className="sticky top-0 w-full h-20 px-6 md:px-12 flex items-center justify-between bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
            <svg viewBox="0 0 120 120" className="w-6 h-6 md:w-8 md:h-8">
              <text x="10" y="85" className="fill-[#137067]" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>H</text>
              <text x="45" y="85" className="fill-brand-coral" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-bold text-brand-coral leading-none">Haja Clean</span>
            <span translate="no" className="text-[6px] md:text-[8px] tracking-widest text-[#137067] font-bold notranslate">Facilities Services</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium shadow-sm pointer-events-auto"
        >
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">VOLTAR</span>
        </button>
      </header>

      <div className="flex-1">
        {/* Section 1 */}
        <section className="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex flex-col lg:flex-row overflow-hidden border-b border-gray-100">
          <div className="w-full lg:w-[45%] p-6 md:p-10 lg:p-24 flex flex-col justify-center bg-white z-10 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-brand-teal mb-6">
                <Stethoscope className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.3em]">Limpeza Clínica Técnica</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-black leading-tight mb-8">
                Higiene Profissional <br />
                <span className="text-brand-teal">para Clínicas</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-10 font-light">
                A Haja Clean Facilities eleva o padrão de desinfecção para clínicas e ambientes de saúde, 
                garantindo segurança biológica e um ambiente acolhedor para pacientes e profissionais.
              </p>

              <motion.ul 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {["Desinfecção hospitalar", "Gestão de resíduos", "Limpeza técnica", "Sanitização"].map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={slideUp}
                    className="flex items-center gap-3 text-gray-700 font-medium text-xs md:text-sm group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-teal group-hover:text-brand-coral transition-colors" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <div className="w-full lg:w-[55%] relative flex items-center justify-center p-4 md:p-12 lg:p-20 bg-gray-50/50" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
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
                  <motion.div
                    animate={{
                      x: rotateY * 2,
                      y: rotateX * 2
                    }}
                    className="w-full h-full relative"
                  >
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover scale-110"
                    >
                      <source src={slides[currentSlide].url} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-teal/20 to-transparent pointer-events-none" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                    <motion.div
                      initial={{ opacity: 0, y: 30, x: -20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <div className="flex items-center gap-3 mb-2 md:mb-4">
                        <div className="h-[1px] w-8 bg-brand-coral" />
                        <span className="text-brand-coral font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Medical Care</span>
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

              <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center gap-4 md:gap-6 z-20">
                <div className="hidden md:flex gap-3 mr-4">
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

        {/* Section 2 */}
        <section className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8f9fa] py-20 md:py-32 px-6 md:px-12 lg:px-24 gap-12 lg:gap-24 items-center overflow-hidden">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative min-h-[500px] lg:min-h-[650px] w-full bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
              <img 
                src="/clinica/70.jpeg" 
                alt="Ambiente Clínico Haja Clean"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hidden md:flex flex-col items-center z-20">
              <ShieldCheck className="w-10 h-10 text-brand-teal mb-2" />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">Qualidade</span>
                <span className="text-xs font-black uppercase tracking-[0.1em] text-brand-teal">Saúde Haja Clean</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-6">
                Excelência Operacional <br />
                <span className="text-brand-teal">em Saúde</span>
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-lg">
                O ambiente clínico requer atenção redobrada. Nosso compromisso é com a manutenção de um espaço 
                estéril, seguro e organizado, permitindo que você foque exclusivamente no atendimento de excelência 
                aos seus pacientes.
              </p>
            </motion.div>

            <div className="relative perspective-1000 min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, rotateY: 30, x: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, rotateY: -30, x: -40, filter: "blur(8px)" }}
                  whileHover={{ rotateY: 8, rotateX: -3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) prevCard();
                    if (info.offset.x < -50) nextCard();
                  }}
                  className="w-full max-w-[320px] md:max-w-lg bg-white/50 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.02)] cursor-grab active:cursor-grabbing"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {clinicCards[currentCard].title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed font-light">
                    {clinicCards[currentCard].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-between px-4">
                <div className="flex gap-2">
                  {clinicCards.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-700 ${i === currentCard ? "w-10 bg-brand-teal" : "w-2 bg-gray-200"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={prevCard}
                    className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-teal hover:border-brand-teal transition-all shadow-sm group"
                  >
                    <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
                  </button>
                  <button 
                    onClick={nextCard}
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


const GymCleaningPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTatameCard, setCurrentTatameCard] = useState(0);
  
  const slides = [
    { url: "/1.mp4", title: "Higienização de Equipamentos", desc: "Aplicação de produtos específicos que preservam o material e eliminam 99.9% dos microrganismos." },
    { url: "/2.mp4", title: "Padrão de Recepção Premium", desc: "Primeira impressão é a que fica. Ambientes impecáveis para receber seus alunos com elegância." },
    { url: "/3.mp4", title: "Vestiários e Áreas Úmidas", desc: "Controle bacteriológico rigoroso e desinfecção profunda em áreas de alto contato." },
    { url: "/4.mp4", title: "Studios de Alta Performance", desc: "Limpeza técnica para salas de aula coletiva, mantendo o ambiente fresco e motivador." },
    { url: "/5.jpeg", title: "Excelência Haja Clean", desc: "O cuidado que sua marca merece em cada detalhe do ambiente de treino." },
    { url: "/6.jpeg", title: "Manutenção de Pisos", desc: "Tratamento especializado para pisos esportivos, garantindo brilho e aderência ideal." },
    { url: "/7.jpeg", title: "Segurança Sanitária", desc: "Protocolos rigorosos de desinfecção para garantir a saúde de alunos e colaboradores." },
    { url: "/8.jpeg", title: "Ambientes Renovados", desc: "Sua academia sempre com aspecto de nova, elevando a percepção de valor dos seus clientes." }
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
            <span translate="no" className="text-[8px] tracking-widest text-[#137067] font-bold notranslate">Facilities Services</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm pointer-events-auto"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">VOLTAR</span>
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

              <motion.ul 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {["Limpeza de equipamentos", "Tatames", "Pisos", "Sanitização"].map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={slideUp}
                    className="flex items-center gap-3 text-gray-700 font-medium text-xs md:text-sm group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-teal group-hover:text-brand-coral transition-colors" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
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
                  {slides[currentSlide].url.endsWith('.mp4') ? (
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover scale-110"
                    >
                      <source src={slides[currentSlide].url} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={slides[currentSlide].url} 
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover scale-110"
                      referrerPolicy="no-referrer"
                    />
                  )}
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
                  whileHover={{ rotateY: 8, rotateX: -3 }}
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
const Header = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <header 
      className={`fixed z-[100] transition-all duration-700 ease-in-out flex items-center ${
        isScrolled 
          ? "top-4 left-4 scale-75 opacity-90 origin-left" 
          : "top-6 left-6 md:left-8 lg:left-12 scale-100 opacity-100"
      }`}
    >
      {/* Card com Efeito Vidro 3D - Fixo no Topo Esquerdo */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-2xl px-2 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 ring-1 ring-brand-teal/5 transition-all duration-700 ${
        isScrolled ? "py-1.5 px-3" : ""
      }`}>
        <motion.div 
          animate={isScrolled ? {} : { 
            boxShadow: ["0 0 0px rgba(19, 112, 103, 0)", "0 0 20px rgba(19, 112, 103, 0.1)", "0 0 0px rgba(19, 112, 103, 0)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`relative flex items-center justify-center transition-all duration-700 ${
          isScrolled ? "w-5 h-5 md:w-8 md:h-8" : "w-7 h-7 md:w-11 md:h-11"
        }`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            <text x="10" y="85" className="fill-brand-teal" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>H</text>
            <text x="45" y="85" className="fill-brand-coral" style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '85px' }}>C</text>
            <motion.line 
              initial={{ x1: 25, x2: 25 }}
              animate={{ x2: 105 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              x1="25" y1="55" x2="105" y2="55" stroke="var(--color-brand-teal)" strokeWidth="3" 
            />
            <path d="M100 48 L115 55 L100 62 Z" fill="var(--color-brand-teal)" />
          </svg>
        </motion.div>
        <div className={`flex flex-col transition-all duration-700 ${isScrolled ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
          <h1 className="text-[12px] md:text-base font-serif font-bold tracking-tight text-brand-coral leading-none">
            Haja Clean
          </h1>
          <span translate="no" className="text-[6px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] text-brand-teal font-bold mt-0.5 md:mt-1 notranslate uppercase">
            Facilities Services
          </span>
        </div>
      </motion.div>
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
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/1.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        
      </div>

      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center text-center">
        {/* Header Institucional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-brand-coral" 
            />
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-brand-coral font-black tracking-[0.4em] uppercase text-[10px] md:text-xs"
            >
              Bem vindo à Haja Clean
            </motion.span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-brand-coral" 
            />
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white tracking-tighter leading-[0.9] flex flex-wrap justify-center gap-x-6">
            {"HAJA CLEAN".split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4 + (i * 0.2), ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-3xl text-white/50 font-light tracking-tight mt-6 max-w-3xl mx-auto"
          >
            Limpeza Especializada para <br />
            <span className="text-gray-400 font-medium relative inline-block">
              Academias e Studios
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute bottom-1 left-0 h-0.5 bg-brand-teal"
              />
            </span>
          </motion.p>
        </motion.div>

        {/* Info Slider Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-2xl relative"
        >
          <motion.div 
            whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl relative group"
          >
            {/* Glossy accent */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 blur-[60px] rounded-full -mr-16 -mt-16" 
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="flex items-center gap-6 mb-8">
                   <motion.div 
                     whileHover={{ rotate: 10, scale: 1.1 }}
                     className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10"
                   >
                    {cards[currentCard].icon}
                   </motion.div>
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
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevCard} 
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white transition-all shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(19, 112, 103, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextCard} 
                  className="p-3 rounded-full bg-brand-teal text-white transition-all shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

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

const MagneticButton: React.FC<{ children: React.ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" }> = ({ children, onClick, className, variant = "primary" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x * 0.1, y: position.y * 0.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.1 }}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span 
        animate={{ x: position.x * 0.1, y: position.y * 0.1 }}
        className="relative z-10 block"
      >
        {children}
      </motion.span>
      {variant === "primary" && (
        <motion.div 
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      )}
    </motion.button>
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
                  initial={{ opacity: 0, rotateY: 45, x: 50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, rotateY: -45, x: -50, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  whileHover={{ 
                    rotateX: 5, 
                    rotateY: -5,
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(19, 112, 103, 0.15)",
                    transition: { duration: 0.3 }
                  }}
                  className="w-full max-w-[280px] sm:max-w-md aspect-video bg-white/30 backdrop-blur-2xl p-3 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center gap-1.5 md:gap-3 relative overflow-hidden group cursor-pointer"
                >
                  {/* Reflexo de Vidro Animado */}
                  <motion.div 
                    animate={{ 
                      x: ["-100%", "200%"],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "linear" 
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" 
                  />
                  
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-2xl md:text-4xl mb-0.5 drop-shadow-lg"
                  >
                    {services[currentIndex].icon}
                  </motion.div>
                  <h3 className="text-sm md:text-xl font-bold text-black uppercase tracking-wider leading-tight group-hover:text-brand-teal transition-colors">
                    {services[currentIndex].title}
                  </h3>
                  <p className="text-premium-dark/80 leading-relaxed text-[10px] md:text-sm max-w-[95%] md:max-w-[90%] font-light">
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

        <MagneticButton
          onClick={() => {}}
          className="mt-10 px-8 py-4 bg-premium-dark text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-brand-teal transition-all relative overflow-hidden group"
        >
          Solicitar Orçamento
        </MagneticButton>
      </div>
    </section>
  );
};

const ProductsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const chemicals = [
    { name: "Álcool Gel 70° INPM", brand: "Clarity Care", img: "/Produtos/0.jpeg", desc: "Sanitizante de alta eficácia para mãos com secagem rápida, essencial para ambientes de alto fluxo como recepções e áreas de treino." },
    { name: "Álcool Etílico 70°", brand: "Clarity Care", img: "/Produtos/1.jpeg", desc: "Desinfetante hospitalar para superfícies fixas e artigos não críticos, garantindo a eliminação de 99.9% dos patógenos." },
    { name: "Sabonete Perolado", brand: "Valência", img: "/Produtos/2.jpeg", desc: "Sabonete líquido premium com fórmula balanceada e fragrância suave, ideal para vestiários e banheiros corporativos." },
    { name: "Cloro Ativo 5L", brand: "Valência", img: "/Produtos/3.jpeg", desc: "Poderoso agente desinfetante e alvejante para limpeza pesada de áreas externas e sanitização profunda de superfícies laváveis." },
    { name: "Desinfetante Floral", brand: "Valência", img: "/Produtos/4.jpeg", desc: "Limpeza técnica com alto poder bactericida e fragrância prolongada, mantendo o ambiente fresco e seguro por mais tempo." },
    { name: "Detergente Limpa Piso", brand: "Valência", img: "/Produtos/5.jpeg", desc: "Fórmula especializada para remoção de sujidades pesadas em pisos esportivos (emborrachados) e cerâmicos sem agredir o material." },
  ];

  const equipments = [
    { name: "Carrinho Funcional", img: "/Produtos/6.jpeg", desc: "Sistema completo para transporte de insumos e coleta de resíduos, otimizando a produtividade da equipe." },
    { name: "Estação de Limpeza", img: "/Produtos/7.jpeg", desc: "Módulo avançado para organização de mop, químicos e acessórios de higienização técnica." },
    { name: "Sinalização de Segurança", img: "/Produtos/8.jpeg", desc: "Placa 'Piso Molhado' de alta visibilidade, essencial para prevenção de acidentes durante a operação." },
    { name: "Aviso de Manutenção", img: "/Produtos/9.jpeg", desc: "Sinalização profissional para áreas em processo de limpeza, garantindo a segurança de todos." },
    { name: "Balde Espremedor", img: "/Produtos/10.jpeg", desc: "Equipamento ergonômico para limpeza de pisos, reduzindo esforço físico e desperdício de água." },
    { name: "Mop Profissional", img: "/Produtos/11.jpeg", desc: "Fibra de alta absorção para limpeza úmida e seca, ideal para grandes áreas e centros esportivos." },
    { name: "Kit de Higienização", img: "/Produtos/12.jpeg", desc: "Conjunto completo de ferramentas para limpeza técnica em consultórios e salas de exames." },
    { name: "Vassoura Profissional", img: "/Produtos/13.jpeg", desc: "Vassoura de alta resistência com cerdas sintéticas, ideal para varrição de grandes áreas secas e úmidas com máxima eficiência." },
    { name: "Rodo Profissional", img: "/Produtos/14.jpeg", desc: "Rodo de alta performance com borracha dupla, garantindo a secagem completa de pisos com o mínimo esforço e máxima aderência." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % chemicals.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + chemicals.length) % chemicals.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#f8f9fa] flex flex-col overflow-y-auto overflow-x-hidden"
    >
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
            <span translate="no" className="text-[8px] tracking-widest text-[#137067] font-bold notranslate">Facilities Services</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm pointer-events-auto"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">VOLTAR</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center py-12 px-4 md:px-12">
        {/* Seção 1: Insumos Químicos */}
        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-brand-teal mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Linha de Insumos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-black">
              Produtos <span className="text-brand-teal">Químicos</span>
            </h2>
          </motion.div>

          <div className="w-full relative flex items-center justify-center gap-1 md:gap-6 perspective-1000">
            <button 
              onClick={prevProduct}
              className="p-2 md:p-4 rounded-full bg-white/60 backdrop-blur-md shadow-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all z-20 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="flex-1 max-w-5xl overflow-hidden py-6 px-2 md:px-4">
              <div className="flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="w-full max-w-[340px] md:max-w-3xl bg-white/40 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_30px_70px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-8 md:gap-16 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                    
                    <div className="w-full md:w-[45%] aspect-square rounded-3xl overflow-hidden bg-white/80 p-6 md:p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] relative group-hover:scale-105 transition-transform duration-700 ease-out">
                      <img 
                        src={chemicals[currentIndex].img} 
                        alt={chemicals[currentIndex].name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="w-full md:w-[55%] flex flex-col text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-px bg-brand-coral" />
                        <span className="text-brand-coral font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em]">
                          {chemicals[currentIndex].brand}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-black mb-4 md:mb-6 leading-tight">
                        {chemicals[currentIndex].name}
                      </h3>
                      <p className="text-premium-dark/70 text-sm md:text-lg leading-relaxed font-light mb-8 md:mb-10">
                        {chemicals[currentIndex].desc}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button className="px-6 md:px-8 py-3.5 md:py-4 bg-brand-teal text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-teal/80 transition-all shadow-xl shadow-brand-teal/20 active:scale-95">
                          Aprovado
                        </button>
                        <div className="flex items-center gap-2 text-brand-teal">
                          <ShieldCheck className="w-5 h-5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Qualidade Garantida</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button 
              onClick={nextProduct}
              className="p-2 md:p-4 rounded-full bg-white/60 backdrop-blur-md shadow-lg text-brand-teal hover:bg-brand-teal hover:text-white transition-all z-20 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex gap-3 mt-12 md:mt-16">
            {chemicals.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-700 ${
                  currentIndex === i ? 'w-12 bg-brand-teal' : 'w-2.5 bg-premium-dark/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Seção 2: Equipamentos e Acessórios */}
        <div className="w-full max-w-7xl px-4 md:px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="flex items-center justify-center gap-2 text-brand-teal mb-4">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">Hardware de Limpeza</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-black">
              Equipamentos <span className="text-brand-teal">Profissionais</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {equipments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                className="group bg-white/40 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex flex-col items-center text-center transition-all duration-500 perspective-1000"
              >
                <div className="w-full aspect-square rounded-2xl bg-white/80 p-6 mb-6 shadow-inner relative overflow-hidden">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 via-white/20 to-transparent pointer-events-none z-10" 
                  />
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-0"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-3 group-hover:text-brand-teal transition-colors">
                  {item.name}
                </h3>
                <p className="text-premium-dark/60 text-sm leading-relaxed mb-6 font-light">
                  {item.desc}
                </p>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mt-auto px-6 py-2.5 bg-brand-teal/5 text-brand-teal rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-brand-teal/10 group-hover:bg-brand-teal group-hover:text-white transition-all cursor-pointer"
                >
                  Qualidade Haja Clean
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        <footer className="w-full py-12 flex flex-col items-center border-t border-gray-100 mt-20">
          <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase text-center px-6">Haja Clean Facilities services 2026 © Todos os direitos Reservados</p>
        </footer>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Parallax sutil para o fundo e textos
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50px"]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col overflow-y-auto overflow-x-hidden selection:bg-brand-teal/30"
    >
      {/* 1. ATMOSFERA: Background com movimentos orgânicos lentos */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-teal/5 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-coral/5 blur-[150px] rounded-full" 
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" 
        />
      </div>

      <header className="sticky top-0 w-full h-20 px-6 md:px-12 flex items-center justify-between bg-black/20 backdrop-blur-md border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center border border-white/10">
            <ShieldCheck className="w-5 h-5 text-brand-teal" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-widest uppercase">Sobre</span>
          </div>
        </div>
        
        <button 
          onClick={onBack}
          className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
        >
          Voltar
        </button>
      </header>

      <div className="relative z-10 w-full">
        {/* 2. HERO: Staggered Reveal Animation */}
        <section className="h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ y: textY }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="inline-block text-brand-teal text-[10px] md:text-xs font-black uppercase tracking-[0.8em] mb-8"
            >
              Haja Clean Facilities
            </motion.span>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="text-5xl md:text-8xl font-display font-bold text-white mb-10 tracking-tight leading-[0.9]"
            >
              EXCELÊNCIA <br />
              <span className="text-xl md:text-3xl block my-4 text-brand-teal/60 tracking-[0.5em] font-light italic">EM</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-white/60">HIGIENIZAÇÃO</span>
            </motion.h1>

            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="h-16 w-px bg-gradient-to-b from-brand-teal to-transparent mx-auto mt-12"
            />
          </motion.div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-6 py-24 space-y-48">
          {/* Seção 1: Identidade e Autoridade */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">Autoridade em <br /><span className="text-brand-teal">Limpeza Técnica</span></h2>
              <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-8 text-justify">
                A <span className="text-white font-bold italic">Haja Clean Facilities Services</span> não é apenas uma empresa de limpeza, mas uma parceira estratégica na preservação do patrimônio e da saúde. Nossa expertise é moldada por processos rigorosos que garantem a descontaminação real de superfícies e a manutenção impecável de infraestruturas complexas.
              </p>
              <div className="p-8 rounded-3xl bg-white/[0.03] border-l-4 border-brand-teal">
                <p className="text-white/80 italic text-sm font-light">"Nossa missão é transformar ambientes através da precisão operacional, permitindo que nossos clientes operem em seu potencial máximo com total segurança sanitária."</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
              <img src="/nossa_identidade.jpg" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Seção 2: Diferenciais (Impacto) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, order: 2 }} whileInView={{ opacity: 1, order: 2 }} viewport={{ once: true }} className="grid grid-cols-2 gap-6 order-2 lg:order-1">
              {[
                { title: "Inovação", desc: "Equipamentos de última geração e químicos sustentáveis." },
                { title: "Rigidez", desc: "Checklists detalhados e supervisão técnica contínua." },
                { title: "Foco", desc: "Especialização em Academias, Clínicas e Ambientes Críticos." },
                { title: "Segurança", desc: "Treinamento intensivo e protocolos de proteção total." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <h4 className="text-brand-teal font-bold mb-2 uppercase text-[10px] tracking-widest">{item.title}</h4>
                  <p className="text-white/40 text-[10px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30, order: 1 }} whileInView={{ opacity: 1, x: 0, order: 1 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">Por que escolher a <br /><span className="text-brand-coral">Haja Clean?</span></h2>
              <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed text-justify">
                Entendemos que cada segmento possui necessidades únicas. Por isso, desenvolvemos protocolos personalizados que vão além do brilho superficial. Nosso foco é a <span className="text-white underline decoration-brand-teal underline-offset-4">higienização profunda</span>, combatendo patógenos e prolongando a vida útil de seus equipamentos de alto custo.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Satisfação Garantida", value: 100, suffix: "%", sub: "Feedback Positivo" },
              { label: "Projetos Ativos", value: 500, suffix: "+", sub: "Clientes Corporativos" },
              { label: "Suporte Técnico", value: 24, suffix: "/7", sub: "Atendimento Full" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -10, borderColor: "rgba(19, 112, 103, 0.4)", backgroundColor: "rgba(255,255,255,0.02)" }} 
                className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group transition-all"
              >
                <div className="flex items-baseline gap-1">
                  <Counter value={item.value} />
                  <span className="text-3xl font-bold text-white group-hover:text-brand-teal transition-colors">{item.suffix}</span>
                </div>
                <span className="block text-[10px] text-white/30 uppercase tracking-[0.3em] mb-1">{item.label}</span>
                <span className="text-[8px] text-brand-teal/50 font-bold uppercase tracking-widest">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="w-full py-32 flex flex-col items-center border-t border-white/5">
          <p className="text-white/10 text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-center px-6">Haja Clean Facilities services 2026 © Todos os direitos Reservados</p>
        </footer>
      </div>
    </motion.div>
  );
};

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col overflow-y-auto"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[50%] h-[50%] bg-brand-coral/5 blur-[150px] rounded-full" />
      </div>

      <header className="sticky top-0 w-full h-20 px-6 md:px-12 flex items-center justify-between bg-black/40 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100 overflow-hidden">
            <img src="/logo.jpeg" alt="Logo Haja Clean" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-bold text-brand-coral leading-none">Haja Clean</span>
            <span translate="no" className="text-[8px] tracking-widest text-brand-teal font-bold notranslate uppercase leading-none mt-1">Contato</span>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-[10px] font-bold uppercase tracking-widest"
        >
          Voltar
        </button>
      </header>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-24">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-display font-bold text-white mb-6">Vamos Iniciar uma <br /><span className="text-brand-teal">Parceria de Sucesso?</span></motion.h1>
          <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-[0.4em] font-light">Canais de atendimento exclusivos para sua empresa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Telefone Fixo */}
          <a href="tel:1143061777" className="block outline-none">
            <motion.div 
              whileHover={{ y: -10, borderColor: "rgba(19, 112, 103, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
              className="p-10 h-full rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-brand-teal" />
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">Telefone Fixo</span>
              <span className="text-2xl font-bold text-white group-hover:text-brand-teal transition-colors">11 4306-1777</span>
            </motion.div>
          </a>

          {/* WhatsApp Comercial */}
          <a href="https://wa.me/5511964768536" target="_blank" rel="noopener noreferrer" className="block outline-none">
            <motion.div 
              whileHover={{ y: -10, borderColor: "rgba(19, 112, 103, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
              className="p-10 h-full rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-brand-teal" />
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">WhatsApp Comercial</span>
              <span className="text-2xl font-bold text-white group-hover:text-brand-teal transition-colors">11 96476-8536</span>
            </motion.div>
          </a>

          {/* Suporte Técnico */}
          <a href="https://wa.me/5511971864714" target="_blank" rel="noopener noreferrer" className="block outline-none">
            <motion.div 
              whileHover={{ y: -10, borderColor: "rgba(19, 112, 103, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
              className="p-10 h-full rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-brand-teal" />
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-bold">Suporte Técnico</span>
              <span className="text-2xl font-bold text-white group-hover:text-brand-teal transition-colors">11 97186-4714</span>
            </motion.div>
          </a>
          {/* E-mail */}
          <a href="mailto:comercial@hajaclean.com.br" className="lg:col-span-3 block outline-none">
            <motion.div 
              whileHover={{ y: -10, borderColor: "rgba(19, 112, 103, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }} 
              className="p-12 h-full rounded-[3rem] bg-gradient-to-br from-brand-teal/10 to-transparent border border-brand-teal/20 backdrop-blur-xl flex flex-col items-center text-center group transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-brand-teal/20 flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                <Mail className="w-10 h-10 text-brand-teal" />
              </div>
              <span className="text-xs text-brand-teal font-black uppercase tracking-[0.5em] mb-4">E-mail Corporativo</span>
              <span className="text-base md:text-4xl font-display font-bold text-white group-hover:text-brand-teal transition-colors whitespace-nowrap overflow-hidden text-ellipsis px-2">
                comercial@hajaclean.com.br
              </span>
            </motion.div>
          </a>
        </div>
      </main>
      <footer className="mt-auto py-12 flex flex-col items-center border-t border-white/5">
        <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase text-center px-6">Haja Clean Facilities services 2026 © Todos os direitos Reservados</p>
      </footer>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("catalog");
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalSections = 3;

  // Monitorar scroll para transformações
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "products", label: "Produtos", icon: Sparkles },
    { id: "gym-cleaning", label: "Academia", icon: Dumbbell },
    { id: "clinic-cleaning", label: "Clínicas", icon: Stethoscope },
    { id: "contact", label: "Contatos", icon: Phone },
    { id: "about", label: "Sobre", icon: Users },
  ];

  const paginate = (newDirection: number) => {
    const nextSection = currentSection + newDirection;
    if (nextSection >= 0 && nextSection < totalSections) {
      setDirection(newDirection);
      setCurrentSection(nextSection);
    }
  };

  const progress = (currentSection / (totalSections - 1)) * 100;


  const variants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : (direction > 0 ? '100%' : '-100%'),
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <div className="relative min-h-screen w-full bg-premium-gray font-sans selection:bg-brand-teal/30 selection:text-premium-dark">
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[140] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Progress Bar Superior */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[150] bg-white/10">
        <motion.div 
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-brand-teal shadow-[0_0_10px_rgba(19,112,103,0.5)]"
        />
      </div>
      {currentPage === "catalog" ? (
        <div key="catalog" className="min-h-screen w-full relative">
          {/* Navegação Lateral (Dots) - Ocultar no scroll para limpar a lateral */}
          {!isScrolled && (
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[110] hidden md:flex flex-col gap-5">
              {[0, 1, 2].map((i) => (
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
          )}

          {/* Botões de Navegação Laterais - Afastar do menu no scroll */}
          <div className={`fixed top-[160px] left-0 right-0 pointer-events-none z-[100] flex items-center justify-between transition-all duration-700 ${
            isScrolled ? "px-12 md:px-24" : "px-6 md:px-12"
          }`}>
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

          {/* NAVEGAÇÃO DESKTOP (HORIZONAL -> HAMBURGUER NO SCROLL) */}
          <motion.div 
            initial={false}
            animate={{ 
              opacity: isScrolled ? 0 : 1,
              y: isScrolled ? -20 : 0,
              pointerEvents: isScrolled ? "none" : "auto"
            }}
            className="fixed top-6 left-0 right-0 z-[120] hidden lg:flex justify-center px-6"
          >
            <motion.nav 
              layout
              className="bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-full p-1.5 flex flex-row gap-1 items-center"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className="flex items-center justify-center rounded-full hover:bg-white/60 transition-all px-4 py-2.5 gap-2 group"
                >
                  <item.icon className="w-4 h-4 text-brand-teal" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-premium-dark">{item.label}</span>
                </button>
              ))}
            </motion.nav>
          </motion.div>

          {/* BOTÃO HAMBÚRGUER (UNIVERSAL NO SCROLL / SEMPRE NO MOBILE) */}
          <div className={`fixed top-6 right-6 z-[120] transition-all duration-500 ${
            isScrolled ? "flex" : "lg:hidden flex"
          }`}>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl flex items-center justify-center text-brand-teal hover:scale-110 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-3xl flex flex-col p-8 lg:hidden"
              >
                <div className="flex justify-between items-center mb-16">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-2xl">
                      <img src="/logo.jpeg" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-black tracking-[0.2em] uppercase text-xs">Haja Clean</span>
                      <span className="text-brand-teal font-bold text-[8px] uppercase tracking-widest">Facilities Services</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setCurrentPage(item.id as Page);
                      }}
                      className="flex items-center justify-between p-8 rounded-[2rem] bg-white/5 border border-white/5 text-white group active:bg-brand-teal/20 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center group-active:scale-90 transition-transform">
                          <item.icon className="w-6 h-6 text-brand-teal" />
                        </div>
                        <span className="text-base font-bold uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-20 group-active:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-auto text-center border-t border-white/5 pt-8">
                  <p className="text-[10px] tracking-[0.8em] uppercase text-white/30">Haja Clean • 2026</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Header isScrolled={isScrolled} />
          
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
              Haja Clean Facilities services 2026 © Todos os direitos Reservados
            </p>
          </div>
        </div>
      ) : currentPage === "gym-cleaning" ? (
        <GymCleaningPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      ) : currentPage === "clinic-cleaning" ? (
        <ClinicCleaningPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      ) : currentPage === "about" ? (
        <AboutPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      ) : currentPage === "contact" ? (
        <ContactPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      ) : (
        <ProductsPage 
          onBack={() => setCurrentPage("catalog")} 
        />
      )}
    </div>
  );
}
