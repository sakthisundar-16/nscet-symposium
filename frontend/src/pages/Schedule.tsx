import { motion } from 'framer-motion';
import { Clock, Coffee, Award, Utensils, Flag } from 'lucide-react';

const scheduleData = [
  { time:'09:30 AM', event:'Inauguration',        description:'Welcome address and keynote by the Principal and Department Heads.', type:'ceremony' },
  { time:'11:00 AM', event:'Phase 1 Events',       description:'Code Debugging, AI Prompt Battle, Web Design Battle.',               type:'event' },
  { time:'12:15 PM', event:'Tea Break',            description:'Refreshments for all participants.',                                  type:'break' },
  { time:'12:30 PM', event:'Phase 2 Events',       description:'Paper Presentation, Logic Building Challenge, SQL Query Challenge.', type:'event' },
  { time:'01:30 PM', event:'Lunch',                description:'Networking lunch — connect with peers from across Tamil Nadu.',      type:'break' },
  { time:'02:15 PM', event:'Phase 3 Events',       description:'Connection, Logo Guessing, Short Film, Free Fire, Meme Challenge.',  type:'event' },
  { time:'03:45 PM', event:'Tea Break',            description:'Short refreshment break before results are announced.',              type:'break' },
  { time:'04:00 PM', event:'Judging & Evaluation', description:'Finalizing winners across all phases by the jury.',                  type:'ceremony' },
  { time:'04:30 PM', event:'Prize Distribution',   description:'Valedictory, certificates, and cash awards ceremony.',              type:'award' },
];

/* Navy + gold / warm palette matching event logo */
const typeConfig = {
  ceremony: {
    icon: Flag,
    color: 'text-[#A0623E]',
    borderColor: 'border-l-[#C8845A]',
    dotFrom: 'from-[#A0623E]', dotTo: 'to-[#C8845A]',
    dotGlow: 'shadow-[#C8845A]/45',
    badgeBg: 'bg-[#F5EDE5]', badgeText: 'text-[#A0623E]', badgeBorder: 'border-[#C8845A]/30',
  },
  event: {
    icon: Clock,
    color: 'text-[#1B3A6B]',
    borderColor: 'border-l-[#1B3A6B]',
    dotFrom: 'from-[#1B3A6B]', dotTo: 'to-[#2D5BA3]',
    dotGlow: 'shadow-[#1B3A6B]/45',
    badgeBg: 'bg-[#EEF2F8]', badgeText: 'text-[#1B3A6B]', badgeBorder: 'border-[#1B3A6B]/25',
  },
  break: {
    icon: Coffee,
    color: 'text-[#2D6B4A]',
    borderColor: 'border-l-[#4A8A60]',
    dotFrom: 'from-[#2D8A60]', dotTo: 'to-[#4AAA80]',
    dotGlow: 'shadow-[#2D8A60]/40',
    badgeBg: 'bg-[#E8F4EF]', badgeText: 'text-[#1B6B4A]', badgeBorder: 'border-[#2D8A60]/25',
  },
  award: {
    icon: Award,
    color: 'text-[#6B3A1B]',
    borderColor: 'border-l-[#8A5A2D]',
    dotFrom: 'from-[#C8845A]', dotTo: 'to-[#A0623E]',
    dotGlow: 'shadow-[#A0623E]/50',
    badgeBg: 'bg-[#FDF3E3]', badgeText: 'text-[#8A5A1B]', badgeBorder: 'border-[#C8845A]/30',
  },
};

const getIcon = (item: typeof scheduleData[0]) =>
  item.event === 'Lunch' ? Utensils : typeConfig[item.type as keyof typeof typeConfig]?.icon || Clock;

const Schedule = () => (
  <div className="min-h-screen bg-background pt-28 pb-24 relative">

    <div className="fixed top-1/4 right-0 w-80 h-80 bg-[#C8845A]/10 blur-[110px] rounded-full pointer-events-none"/>
    <div className="fixed bottom-1/4 left-0 w-72 h-72 bg-[#1B3A6B]/08 blur-[100px] rounded-full pointer-events-none"/>

    <div className="container mx-auto px-4 max-w-4xl relative z-10">

      {/* Header */}
      <div className="text-center mb-20">
        <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="section-label inline-flex mb-5">
          <Clock size={12}/> August 7, 2026
        </motion.span>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{color:'#0F2444'}}>
          Event Schedule
        </motion.h1>
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.2,duration:0.6}}
          className="divider-glow w-24 mx-auto mb-5"/>
        <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
          className="text-lg text-[#4A6080] font-inter">
          Plan your day. Make every minute count.
        </motion.p>
      </div>

      {/* Legend */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.32}}
        className="flex flex-wrap justify-center gap-2.5 mb-16">
        {Object.entries(typeConfig).map(([type, cfg]) => (
          <span key={type} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border capitalize font-inter ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
            <cfg.icon size={11}/> {type}
          </span>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Gradient vertical line — navy to gold */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 pointer-events-none"
          style={{background:'linear-gradient(to bottom, transparent, #1B3A6B 8%, #C8845A 50%, #A0623E 92%, transparent)'}}/>

        <div className="space-y-8 md:space-y-10">
          {scheduleData.map((item, index) => {
            const cfg = typeConfig[item.type as keyof typeof typeConfig] || typeConfig.event;
            const IconComp = getIcon(item);
            const isRight = index % 2 === 0;

            return (
              <motion.div key={index} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}}
                viewport={{once:true,margin:'-70px'}} transition={{duration:0.52,delay:index*0.06}}
                className={`relative flex items-center w-full ${isRight ? 'md:flex-row-reverse' : ''}`}>

                {/* Dot */}
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${cfg.dotFrom} ${cfg.dotTo} border-[3px] border-background md:-translate-x-1/2 z-10 shadow-lg ${cfg.dotGlow}`}/>

                {/* Card */}
                <div className={`ml-16 md:ml-0 w-full md:w-[46%] ${isRight ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                  <motion.div whileHover={{y:-5,scale:1.01}} transition={{type:'spring',stiffness:400,damping:28}}
                    className={`glass-card p-6 group cursor-default border-l-4 ${cfg.borderColor} !rounded-l-sm`}>

                    <div className={`flex items-center gap-2.5 mb-3 ${!isRight ? 'md:justify-end' : ''}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                        <IconComp size={15}/>
                      </div>
                      <span className={`font-black text-base font-orbitron ${cfg.color}`}>{item.time}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize font-inter ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}>
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-1.5 font-orbitron transition-colors duration-300" style={{color:'#0F2444'}}>
                      {item.event}
                    </h3>
                    <p className="text-[#4A6080] text-sm leading-relaxed font-inter">{item.description}</p>
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
