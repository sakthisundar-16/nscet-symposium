import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, ArrowRight, Code2, Palette, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const useCounter = (target: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return { count, ref };
};

const StatCard = ({ label, value, suffix, icon: Icon, delay }: {
  label: string; value: number; suffix: string;
  icon: React.ComponentType<{ size?: number }>; delay: number;
}) => {
  const { count, ref } = useCounter(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="glass-card p-6 md:p-8 text-center group cursor-default"
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EEF2F8] to-[#E8DDD4] border border-[#C8845A]/25 flex items-center justify-center mx-auto mb-4 text-[#A0623E] group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-400">
        <Icon size={22} />
      </div>
      <p className="text-4xl md:text-5xl font-black font-orbitron mb-1 text-gradient-primary tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs uppercase tracking-[0.22em] text-[#1F2937] font-inter font-semibold">{label}</p>
    </motion.div>
  );
};

const features = [
  {
    title: 'Live Coding Battles',
    description: 'Compete in fast-paced debugging, logic, and AI prompt challenges designed for aspiring engineers.',
    icon: Code2,
  },
  {
    title: 'Design Innovation',
    description: 'Showcase UI creativity, logo recognition, and web design skills in competitive rounds.',
    icon: Palette,
  },
  {
    title: 'Networking Zone',
    description: "Connect with peers, faculty, and industry mentors across Tamil Nadu's top colleges.",
    icon: Users,
  },
];

const Home = () => {
  const calculateTimeLeft = () => {
    const diff = new Date('2026-08-07T09:30:00').getTime() - Date.now();
    if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    return {
      days:    String(Math.floor(diff / 86400000)).padStart(2, '0'),
      hours:   String(Math.floor((diff / 3600000) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((diff / 60000) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
    };
  };
  const [countdown, setCountdown] = useState(calculateTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setCountdown(calculateTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-16">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img 
            src={`${import.meta.env.BASE_URL}college-building.jpg`} 
            alt="NSCET College Building" 
            className="w-full h-full object-cover opacity-[0.35]" 
          />
        </div>

        {/* Background — warm light with subtle navy/gold tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2F8]/80 via-[#F5F7FA]/70 to-[#F0EBE5]/80 pointer-events-none z-0" />

        {/* Animated floating orbs — navy + gold */}
        <div className="absolute top-[-100px] left-[-80px] w-[520px] h-[520px] rounded-full bg-[#1B3A6B]/12 blur-[130px] pointer-events-none animate-orb-1" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[450px] h-[450px] rounded-full bg-[#C8845A]/14 blur-[110px] pointer-events-none animate-orb-2" />
        <div className="absolute top-[30%] right-[15%] w-[280px] h-[280px] rounded-full bg-[#1B3A6B]/08 blur-[90px] pointer-events-none animate-orb-3" />
        <div className="absolute bottom-[20%] left-[10%] w-[200px] h-[200px] rounded-full bg-[#C8845A]/10 blur-[70px] pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #1B3A6B 1px, transparent 1px)', backgroundSize: '38px 38px' }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}>

              <motion.span initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }} className="section-label mb-6 inline-flex">
                National Level Technical Symposium
              </motion.span>

              <motion.h1
                initial={{ opacity:0,y:28 }} animate={{ opacity:1,y:0 }}
                transition={{ delay:0.32, duration:0.8, ease:[0.16,1,0.3,1] }}
                className="text-7xl lg:text-8xl xl:text-9xl font-bubbly tracking-wide mb-5 leading-[0.95]"
                style={{ color: '#000000' }}
              >
                SYNTAX
                <br />
                <span className="text-gradient-primary">2K26</span>
              </motion.h1>

              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.48 }} className="flex items-center gap-3 mb-6">
                <div className="divider-glow w-10 h-px" />
                <span className="text-[#A0623E] text-sm tracking-[0.22em] uppercase font-bold font-inter">August 7, 2026 · Friday</span>
                <div className="divider-glow w-10 h-px" />
              </motion.div>

              <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.54 }} className="text-lg leading-relaxed mb-10 max-w-lg font-inter text-[#1F2937]">
                A full-day immersive festival of technology, innovation, and competition hosted by the Faculty of Computing at <strong className="text-[#1B3A6B]">NSCET, Theni.</strong>
              </motion.p>

              <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.62 }} className="flex flex-col sm:flex-row gap-4 mb-9">
                <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
                  Register Now <ArrowRight size={18} />
                </Link>
                <Link to="/events" className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-base">
                  Explore Events
                </Link>
              </motion.div>

              <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.76 }} className="flex flex-wrap gap-2.5">
                {[
                  { icon: Calendar, text: 'August 7, 2026' },
                  { icon: MapPin,   text: 'NSCET, Theni' },
                  { icon: Users,    text: 'Individual Only' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-2 text-sm font-semibold text-[#1B3A6B] bg-white/80 border border-[#C8845A]/25 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm font-inter">
                    <Icon size={13} className="text-[#A0623E] shrink-0" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Countdown */}
            <motion.div initial={{ opacity:0,x:44 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.9, delay:0.15, ease:[0.16,1,0.3,1] }}>
              <div className="glass-panel p-8 md:p-10">
                <div className="mb-8 text-center">
                  <p className="section-label mx-auto mb-3 inline-flex">Event Countdown</p>
                  <h2 className="text-2xl font-bold font-orbitron" style={{ color:'#000000' }}>Ready to Compete?</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {Object.entries(countdown).map(([unit, value]) => (
                    <div key={unit} className="group">
                      <div className="relative rounded-2xl bg-white/85 border border-[#C8845A]/20 p-4 text-center overflow-hidden transition-all duration-300 group-hover:border-[#C8845A]/50 group-hover:shadow-lg group-hover:shadow-[#C8845A]/15">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer rounded-2xl" />
                        <p className="text-4xl font-black font-orbitron mb-1 relative z-10 text-gradient-primary tabular-nums">{value}</p>
                        <span className="text-[10px] uppercase tracking-[0.28em] text-[#1F2937] font-inter relative z-10 font-semibold">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: 'Date',  val: 'August 7, 2026' },
                    { icon: MapPin,   label: 'Venue', val: 'NSCET, Theni' },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="bg-white/70 border border-[#C8845A]/18 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EEF2F8] to-[#F0E8DF] border border-[#C8845A]/25 flex items-center justify-center text-[#A0623E] shrink-0">
                        <Icon size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#1F2937] uppercase tracking-widest font-inter font-semibold">{label}</p>
                        <p className="text-xs font-bold font-inter" style={{ color:'#000000' }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link to="/register" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm">
                    Secure Your Spot <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#A0623E]">
          <span className="text-[10px] uppercase tracking-[0.25em] font-inter font-semibold">Scroll</span>
          <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#F0EBE5]/40 to-background pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <StatCard label="Attendees"  value={500} suffix="+" icon={Users}    delay={0} />
            <StatCard label="Colleges"   value={50}  suffix="+" icon={MapPin}   delay={0.1} />
            <StatCard label="Events"     value={11}  suffix=""  icon={Calendar} delay={0.2} />
            <StatCard label="Awards"     value={30}  suffix="+" icon={Trophy}   delay={0.3} />
          </div>
        </div>
      </section>

      {/* ══ WHY ATTEND ════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span initial={{ opacity:0,y:10 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="section-label inline-flex mb-5">
              Why Attend
            </motion.span>
            <motion.h2 initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color:'#000000' }}>
              A compelling experience for every tech student
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.14 }} className="glass-card p-8 group relative overflow-hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1B3A6B]/05 to-[#C8845A]/05 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#A0623E] border border-[#C8845A]/25 bg-gradient-to-br from-[#F5F0EB] to-[#EEE8E0] group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-350">
                  <f.icon size={24} />
                </div>
                <h3 className="relative text-xl font-bold mb-3 font-orbitron group-hover:text-[#A0623E] transition-colors duration-300" style={{ color:'#000000' }}>
                  {f.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-[#1F2937] font-inter">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity:0,y:28 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A6B]/12 via-[#C8845A]/10 to-[#1B3A6B]/12" />
            <div className="absolute inset-0 bg-white/65 backdrop-blur-3xl" />
            <div className="absolute inset-0 border border-[#C8845A]/30 rounded-3xl" />
            <div className="absolute top-[-40px] left-[15%] w-72 h-72 rounded-full bg-[#C8845A]/14 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-30px] right-[15%] w-64 h-64 rounded-full bg-[#1B3A6B]/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 px-8 py-16 md:py-20 text-center">
              <p className="section-label inline-flex mx-auto mb-5">Seats are filling fast</p>
              <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight" style={{ color:'#000000' }}>
                Don't miss your chance to{' '}
                <span className="text-gradient-primary">compete &amp; shine</span>
              </h2>
              <p className="text-[#1F2937] text-lg mb-10 max-w-xl mx-auto font-inter">
                Register as an individual and secure your spot at Tamil Nadu's premier student tech symposium.
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-base">
                Secure Your Spot <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
