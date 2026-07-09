import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'Home',     path: '/#home' },
    { label: 'About',    path: '/#about' },
    { label: 'Events',   path: '/#events' },
    { label: 'Schedule', path: '/#schedule' },
    { label: 'Register', path: '/#register' },
  ];

  const contactItems = [
    { icon: MapPin, text: 'Vadapudupatti, Annanji (PO), Theni – 625 531.' },
    { icon: Phone,  text: '+91 98765 43210' },
    { icon: Mail,   text: 'syntax2k26@gmail.com' },
  ];

  return (
    <footer className="relative overflow-hidden mt-auto">

      {/* SVG wave — navy tinted */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
          <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" fill="#E8EDF5" />
        </svg>
      </div>

      {/* Navy deep footer background */}
      <div className="bg-gradient-to-b from-[#E8EDF5] via-[#D8E2F0] to-[#C8D4E8] pt-12 pb-8 relative">
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-[#C8845A]/12 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B3A6B]/10 blur-[70px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black font-orbitron mb-4 tracking-wide" style={{ color:'#000000' }}>
                SYNTAX <span className="text-gradient-primary">2K26</span>
              </h3>
              <p className="text-sm leading-relaxed text-[#2D4A6A] mb-6 font-inter max-w-xs">
                A premier national-level technical symposium hosted by the Faculty of Computing at NSCET, Theni. A full day of innovation and competition.
              </p>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)] animate-pulse" />
                <span className="text-xs text-[#2D4A6A] font-inter font-semibold">Registration Open · August 7, 2026</span>
              </div>
              <a href="/#register" className="inline-flex items-center gap-2 text-sm font-bold text-[#A0623E] bg-white/80 border border-[#C8845A]/30 px-5 py-2.5 rounded-full hover:bg-[#A0623E] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#C8845A]/30 transition-all duration-300 font-inter">
                Register Now <ArrowRight size={14} />
              </a>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-bold mb-5 font-orbitron text-xs tracking-[0.20em] uppercase" style={{ color:'#000000' }}>Explore</h4>
              <ul className="space-y-3">
                {navLinks.map(({ label, path }) => (
                  <li key={label}>
                    <a href={path} className="text-sm text-[#2D4A6A] hover:text-[#A0623E] transition-colors duration-200 flex items-center gap-2 group font-inter">
                      <span className="w-0 h-px bg-gradient-to-r from-[#A0623E] to-[#C8845A] transition-all duration-300 group-hover:w-4 rounded-full" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-5 font-orbitron text-xs tracking-[0.20em] uppercase" style={{ color:'#000000' }}>Contact Us</h4>
              <ul className="space-y-4">
                {contactItems.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 items-start group">
                    <div className="shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-gradient-to-br from-[#EEF2F8] to-[#E8DDD4] border border-[#C8845A]/25 flex items-center justify-center text-[#A0623E] group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#1B3A6B]/25 transition-all duration-300">
                      <Icon size={14} />
                    </div>
                    <span className="text-sm text-[#2D4A6A] leading-relaxed font-inter pt-1">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C8845A]/40 to-transparent mb-6" />

          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 text-xs text-[#1F2937] font-inter">
            <p>&copy; {year} SYNTAX 2K26 · NSCET Faculty of Computing. All rights reserved.</p>
            <span className="hidden md:inline">·</span>
            <p>Built by <span className="font-semibold text-[#1B3A6B]">iSpin Engineers</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
