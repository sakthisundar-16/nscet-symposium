import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'Home',     path: '/#home' },
    { name: 'About',    path: '/#about' },
    { name: 'Events',   path: '/#events' },
    { name: 'Schedule', path: '/#schedule' },
  ];

  const isActive = (path: string) => {
    if (location.pathname !== '/') return false;
    const hash = location.hash || '/#home';
    return path === hash || (path === '/#home' && !location.hash);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'py-2 bg-white/88 backdrop-blur-2xl border-b border-[#C8845A]/20 shadow-[0_4px_24px_rgba(27,58,107,0.10)]'
        : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/college-logo.png" alt="College Logo"
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <img src="/event-logo.png" alt="SYNTAX 2K26"
            className="h-10 w-auto object-contain rounded-full ring-2 ring-[#C8845A]/40 shadow-sm transition-all duration-300 group-hover:ring-[#C8845A]/80 group-hover:shadow-[#C8845A]/30 group-hover:shadow-md"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="hidden sm:block">
            <p className="text-sm font-black font-orbitron tracking-wider leading-tight" style={{ color:'#000000' }}>
              SYNTAX <span className="text-gradient-primary">2K26</span>
            </p>
            <p className="text-[9px] text-[#1F2937] tracking-[0.18em] uppercase font-inter font-semibold mt-0.5">
              NSCET · Faculty of Computing
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center gap-0.5 px-2 py-1.5 rounded-full transition-all duration-500 ${
          scrolled ? 'bg-transparent' : 'bg-white/60 backdrop-blur-md border border-[#C8845A]/18 shadow-sm'
        }`}>
          {navLinks.map(link => (
            <a key={link.name} href={link.path}
              className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 font-inter ${
                isActive(link.path) ? 'text-[#A0623E]' : 'text-[#2D4A6A] hover:text-[#A0623E]'
              }`}
            >
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[#F5EDE5] border border-[#C8845A]/35"
                  transition={{ type:'spring', stiffness:500, damping:38 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Register CTA */}
        <div className="hidden lg:block relative">
          <span className="absolute -inset-1 rounded-full bg-[#C8845A]/18 animate-pulse-glow pointer-events-none" />
          <a href="#register" className="relative btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm">
            <span className="shrink-0 font-orbitron font-bold">Register Now</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#F5EDE5] border border-[#C8845A]/30 text-[#A0623E] hover:bg-[#EDD8C8]/60 transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={isOpen ? 'x' : 'menu'} initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.15 }}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:'auto' }} exit={{ opacity:0,height:0 }}
            transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
            className="lg:hidden overflow-hidden bg-white/96 backdrop-blur-2xl border-t border-[#C8845A]/20 shadow-xl shadow-[#1B3A6B]/10"
          >
            <div className="flex flex-col px-6 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity:0,x:-18 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.06 }}>
                  <a href={link.path} className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 font-inter ${
                    isActive(link.path)
                      ? 'bg-[#F5EDE5] text-[#A0623E] border border-[#C8845A]/30'
                      : 'text-[#2D4A6A] hover:text-[#A0623E] hover:bg-[#F5EDE5]/60'
                  }`}>
                    {link.name}
                    {isActive(link.path) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#C8845A]" />}
                  </a>
                </motion.div>
              ))}
              <motion.div initial={{ opacity:0,x:-18 }} animate={{ opacity:1,x:0 }} transition={{ delay:navLinks.length*0.06 }} className="pt-2">
                <a href="#register" className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 text-sm" onClick={() => setIsOpen(false)}>
                  Register Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
