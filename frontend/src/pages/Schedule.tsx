import { motion } from 'framer-motion';
import { Clock, Coffee, Award, Utensils, Sparkles } from 'lucide-react';

const scheduleData = [
  { time: '09:30 AM', event: 'Inauguration',        description: 'Welcome address and keynote by the Principal and Department Heads.', type: 'ceremony' },
  { time: '11:00 AM', event: 'Phase 1 Events',       description: 'Code Debugging, AI Prompt Battle, Web Design Battle.',               type: 'event' },
  { time: '12:15 PM', event: 'Tea Break',            description: 'Refreshments for all participants.',                                  type: 'break' },
  { time: '12:30 PM', event: 'Phase 2 Events',       description: 'Paper Presentation, Logic Building Challenge, SQL Query Challenge.', type: 'event' },
  { time: '01:30 PM', event: 'Lunch',                description: 'Networking lunch — connect with peers from across Tamil Nadu.',      type: 'break' },
  { time: '02:15 PM', event: 'Phase 3 Events',       description: 'Connection, Logo Guessing, Short Film, Free Fire, Meme Challenge.',  type: 'event' },
  { time: '03:45 PM', event: 'Tea Break',            description: 'Short refreshment break before results are announced.',              type: 'break' },
  { time: '04:00 PM', event: 'Judging & Evaluation', description: 'Finalizing winners across all phases by the jury.',                  type: 'ceremony' },
  { time: '04:30 PM', event: 'Prize Distribution',   description: 'Valedictory, certificates, and cash awards ceremony.',              type: 'award' },
];

const typeConfig = {
  ceremony: {
    icon: Sparkles,
    color: 'text-blue-600',
    borderColor: 'border-l-blue-500',
    dotGradient: 'from-blue-500 to-blue-400',
    dotGlow: 'shadow-blue-400/50',
    badgeBg: 'bg-blue-50', badgeText: 'text-blue-600', badgeBorder: 'border-blue-200',
  },
  event: {
    icon: Clock,
    color: 'text-sky-600',
    borderColor: 'border-l-sky-500',
    dotGradient: 'from-sky-500 to-cyan-400',
    dotGlow: 'shadow-sky-400/50',
    badgeBg: 'bg-sky-50', badgeText: 'text-sky-600', badgeBorder: 'border-sky-200',
  },
  break: {
    icon: Coffee,
    color: 'text-teal-600',
    borderColor: 'border-l-teal-400',
    dotGradient: 'from-teal-500 to-green-400',
    dotGlow: 'shadow-teal-400/50',
    badgeBg: 'bg-teal-50', badgeText: 'text-teal-600', badgeBorder: 'border-teal-200',
  },
  award: {
    icon: Award,
    color: 'text-indigo-600',
    borderColor: 'border-l-indigo-500',
    dotGradient: 'from-indigo-500 to-purple-400',
    dotGlow: 'shadow-indigo-400/50',
    badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-600', badgeBorder: 'border-indigo-200',
  },
};

const getIcon = (item: typeof scheduleData[0]) =>
  item.event === 'Lunch' ? Utensils : typeConfig[item.type as keyof typeof typeConfig]?.icon || Clock;

const Schedule = () => (
  <div className="min-h-screen bg-background pt-28 pb-24 relative">

    {/* Ambient blobs */}
    <div className="fixed top-1/4 right-0 w-80 h-80 bg-blue-200/18 blur-[110px] rounded-full pointer-events-none" />
    <div className="fixed bottom-1/4 left-0 w-72 h-72 bg-sky-200/18 blur-[100px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-4 max-w-4xl relative z-10">

      {/* Header */}
      <div className="text-center mb-20">
        <motion.span initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="section-label inline-flex mb-5">
          <Clock size={12} /> August 7, 2026
        </motion.span>
        <motion.h1
          initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
          className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{ color:'#1E3A5F' }}
        >
          Event Schedule
        </motion.h1>
        <motion.div
          initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.2, duration:0.6 }}
          className="divider-glow w-24 mx-auto mb-5"
        />
        <motion.p
          initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }}
          className="text-lg text-slate-500 font-inter"
        >
          Plan your day. Make every minute count.
        </motion.p>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.32 }}
        className="flex flex-wrap justify-center gap-2.5 mb-16"
      >
        {Object.entries(typeConfig).map(([type, cfg]) => (
          <span key={type} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border capitalize font-inter ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
            <cfg.icon size={11} /> {type}
          </span>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Gradient vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #3B82F6 8%, #0ea5e9 50%, #6366F1 92%, transparent)' }}
        />

        <div className="space-y-8 md:space-y-10">
          {scheduleData.map((item, index) => {
            const cfg = typeConfig[item.type as keyof typeof typeConfig] || typeConfig.event;
            const IconComp = getIcon(item);
            const isRight = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity:0, y:22 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-70px' }}
                transition={{ duration:0.52, delay: index * 0.06 }}
                className={`relative flex items-center w-full ${isRight ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${cfg.dotGradient} border-[3px] border-background md:-translate-x-1/2 z-10 shadow-lg ${cfg.dotGlow}`} />

                {/* Card */}
                <div className={`ml-16 md:ml-0 w-full md:w-[46%] ${isRight ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                  <motion.div
                    whileHover={{ y:-5, scale:1.01 }}
                    transition={{ type:'spring', stiffness:400, damping:28 }}
                    className={`glass-card p-6 group cursor-default border-l-4 ${cfg.borderColor} !rounded-l-sm`}
                  >
                    {/* Time row */}
                    <div className={`flex items-center gap-2.5 mb-3 ${!isRight ? 'md:justify-end' : ''}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                        <IconComp size={15} />
                      </div>
                      <span className={`font-black text-base font-orbitron ${cfg.color}`}>{item.time}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize font-inter ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                        {item.type}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold mb-1.5 font-orbitron group-hover:${cfg.color.replace('text-', 'text-')} transition-colors duration-300`} style={{ color:'#1E3A5F' }}>
                      {item.event}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-inter">{item.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  </div>
);

export default Schedule;
