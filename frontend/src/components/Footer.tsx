import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Home',     path: '/' },
    { label: 'About',    path: '/about' },
    { label: 'Events',   path: '/events' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Register', path: '/register' },
  ];

  const contactItems = [
    { icon: MapPin, text: 'Faculty of Computing, NSCET, Theni — 625 531' },
    { icon: Phone,  text: '+91 98765 43210' },
    { icon: Mail,   text: 'syntax@nscet.ac.in' },
  ];

  return (
    <footer className="relative overflow-hidden mt-auto">

      {/* SVG Wave divider at top */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
          <path
            d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z"
            fill="#EBF5FF"
          />
        </svg>
      </div>

      <div className="bg-gradient-to-b from-[#EBF5FF] via-[#E0EFFE] to-[#D4E9FF] pt-12 pb-8 relative">

        {/* Ambient blobs */}
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-blue-300/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/20 blur-[70px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black font-orbitron mb-4 tracking-wide" style={{ color:'#1E3A5F' }}>
                SYNTAX <span className="text-gradient-primary">2K26</span>
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 mb-6 font-inter max-w-xs">
                A premier national-level technical symposium hosted by the Faculty of Computing at NSCET, Theni. A full day of innovation and competition.
              </p>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                <span className="text-xs text-slate-500 font-inter font-semibold">Registration Open · July 31, 2026</span>
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 bg-white/80 border border-blue-200 px-5 py-2.5 rounded-full hover:bg-blue-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blue-200/60 transition-all duration-300 font-inter"
              >
                Register Now <ArrowRight size={14} />
              </Link>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-bold mb-5 font-orbitron text-xs tracking-[0.20em] uppercase" style={{ color:'#1E3A5F' }}>Explore</h4>
              <ul className="space-y-3">
                {navLinks.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group font-inter"
                    >
                      <span className="w-0 h-px bg-gradient-to-r from-blue-400 to-sky-400 transition-all duration-300 group-hover:w-4 rounded-full" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-5 font-orbitron text-xs tracking-[0.20em] uppercase" style={{ color:'#1E3A5F' }}>Contact Us</h4>
              <ul className="space-y-4">
                {contactItems.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 items-start group">
                    <div className="shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 flex items-center justify-center text-blue-500 group-hover:from-blue-500 group-hover:to-sky-400 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-blue-200/50 transition-all duration-300">
                      <Icon size={14} />
                    </div>
                    <span className="text-sm text-slate-500 leading-relaxed font-inter pt-1">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent mb-6" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400 font-inter">
            <p>&copy; {year} SYNTAX 2K26 · NSCET Faculty of Computing. All rights reserved.</p>
            <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-default">
              <ExternalLink size={11} />
              <span>Production-ready · cPanel Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
