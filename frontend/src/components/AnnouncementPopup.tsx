
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────
   Registration deadline — change this if the date moves
───────────────────────────────────────────────────────────────────────── */
const REGISTRATION_DEADLINE = new Date('2026-08-01T23:59:59');

const getTimeLeft = () => {
  const diff = REGISTRATION_DEADLINE.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    expired: diff <= 0,
  };
};

const AnnouncementPopup = () => {
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Lock background scroll while the popup is the first thing shown
  useEffect(() => {
    if (open) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    handleClose();
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!open) return null;

  const popup = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,36,68,0.75)', backdropFilter: 'blur(8px)' }} />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            style={{ position: 'relative', width: '100%', maxWidth: '420px', overflow: 'hidden', borderRadius: '1.5rem', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1B3A6B] to-[#000000] pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl border border-[#C8845A]/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#C8845A]/15 blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8845A] to-transparent pointer-events-none" />

            <div className="relative z-10 p-8 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              >
                <X size={15} />
              </button>

              <div className="mx-auto mb-4 relative w-16 h-16">
                <div className="absolute inset-0 rounded-full bg-[#C8845A]/25 blur-md" />
                <img
                  src="/event-logo.png"
                  alt="SYNTAX 2K26 Logo"
                  className="relative w-16 h-16 object-contain rounded-full ring-2 ring-[#C8845A]/50 bg-[#0F2444] p-1.5 shadow-lg shadow-[#C8845A]/30"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-3 bg-[#F8EDE8] text-[#A0623E] border-[#C8845A]/30 font-inter">
                <Clock size={11} /> Registrations Closing Soon
              </span>

              <h2 className="text-xl md:text-2xl font-black font-orbitron text-white leading-tight mb-2">
                Registrations Close on August 1st!
              </h2>
              <p className="text-white/70 text-sm font-inter leading-relaxed mb-5">
                Don&apos;t miss your spot — secure your seat before slots run out.
              </p>

              {!timeLeft.expired ? (
                <div className="flex items-center justify-center gap-3 mb-6">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hrs', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                  ].map((t) => (
                    <div key={t.label} className="bg-white/[0.07] border border-[#C8845A]/25 rounded-xl px-4 py-2.5 min-w-[64px]">
                      <p className="text-lg font-black text-white font-orbitron leading-none">{t.value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-white/50 font-inter mt-1">{t.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#C8845A] text-sm font-semibold font-inter mb-6">Final hours — register now!</p>
              )}

              <button
                onClick={handleRegister}
                className="btn-primary inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm"
              >
                Register Now <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(popup, document.body);
};

export default AnnouncementPopup;
