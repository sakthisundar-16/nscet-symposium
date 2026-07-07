import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, MapPin, Code, Bot, Layout, FileText, BrainCircuit, Database,
  Link as LinkIcon, Image, Video, Gamepad2, Smile, ChevronRight, Sparkles, User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockEvents = {
  'PHASE 1': [
    { id:1, name:'Code Debugging',    description:'Find and fix the bugs in the provided code snippets within the time limit.',  duration:'60 Mins', venue:'Lab 1', icon:'Code',    coordinator:'Ms. Abirami Gayathiri', tag:'Technical' },
    { id:2, name:'AI Prompt Battle',  description:'Generate the exact target image using AI prompt engineering skills.',          duration:'45 Mins', venue:'Lab 2', icon:'Bot',     coordinator:'Mr. Vinoth Kumar',      tag:'AI' },
    { id:3, name:'Web Design Battle', description:'Design a responsive landing page based on the on-spot theme.',                 duration:'90 Mins', venue:'Lab 3', icon:'Layout', coordinator:'Ms. Bhavani',          tag:'Design' },
  ],
  'PHASE 2': [
    { id:4, name:'Paper Presentation',       description:'Present your research paper on emerging technologies.',          duration:'10 Mins', venue:'Seminar Hall', icon:'FileText',    coordinator:'Mr. Prathap',           tag:'Research' },
    { id:5, name:'Logic Building Challenge', description:'Solve algorithmic puzzles and complex logic problems.',          duration:'60 Mins', venue:'Lab 1',       icon:'BrainCircuit', coordinator:'Ms. Abirami Gayathiri', tag:'Technical' },
    { id:6, name:'SQL Query Challenge',      description:'Write complex SQL queries to solve real-world database tasks.',  duration:'60 Mins', venue:'Lab 2',       icon:'Database',     coordinator:'Ms. Bhavani',          tag:'Technical' },
  ],
  'PHASE 3': [
    { id:7,  name:'Connection',          description:'Connect the images to identify the hidden technical term.',                   duration:'45 Mins',  venue:'Auditorium',   icon:'LinkIcon', coordinator:'Mr. Vinoth Kumar',      tag:'Fun' },
    { id:8,  name:'Logo Guessing',       description:'Identify tech company logos from partially revealed images.',                duration:'30 Mins',  venue:'Seminar Hall', icon:'Image',    coordinator:'Mr. Prathap',           tag:'Fun' },
    { id:9,  name:'Short Film',          description:"Showcase a pre-submitted short film on technology's impact on society.",      duration:'5 Mins',   venue:'Auditorium',   icon:'Video',    coordinator:'Ms. Abirami Gayathiri', tag:'Creative' },
    { id:10, name:'Free Fire Tournament', description:'Solo e-Sports gaming tournament — best reaction wins.',                      duration:'120 Mins', venue:'Lab 3',        icon:'Gamepad2', coordinator:'Mr. Vinoth Kumar',      tag:'E-Sports' },
    { id:11, name:'Meme Challenge',      description:'Create the funniest tech-related memes on the spot.',                        duration:'30 Mins',  venue:'Lab 2',        icon:'Smile',    coordinator:'Ms. Bhavani',          tag:'Creative' },
  ],
};

const iconMap: Record<string, React.ComponentType<{size?:number}>> = {
  Code, Bot, Layout, FileText, BrainCircuit, Database, LinkIcon, Image, Video, Gamepad2, Smile,
};

/* Tag colors — warm palette matching navy/gold */
const tagConfig: Record<string, {bg:string; text:string; border:string; dot:string}> = {
  Technical: { bg:'bg-[#EEF2F8]', text:'text-[#1B3A6B]', border:'border-[#1B3A6B]/25', dot:'bg-[#1B3A6B]' },
  AI:        { bg:'bg-[#F0EBF8]', text:'text-[#4B2D8A]', border:'border-[#6B3AAA]/25', dot:'bg-[#6B3AAA]' },
  Design:    { bg:'bg-[#F8EDE8]', text:'text-[#A0623E]', border:'border-[#C8845A]/30', dot:'bg-[#C8845A]' },
  Research:  { bg:'bg-[#E8F4EF]', text:'text-[#1B6B4A]', border:'border-[#2D8A60]/25', dot:'bg-[#2D8A60]' },
  Fun:       { bg:'bg-[#FDF3E3]', text:'text-[#8A5A1B]', border:'border-[#C8845A]/30', dot:'bg-[#C8845A]' },
  Creative:  { bg:'bg-[#F8EDE8]', text:'text-[#8A3A2D]', border:'border-[#C85A4A]/30', dot:'bg-[#C85A4A]' },
  'E-Sports':{ bg:'bg-[#E8F0E8]', text:'text-[#2D6B2D]', border:'border-[#4A8A4A]/25', dot:'bg-[#4A8A4A]' },
};

const phaseDesc: Record<string,string> = {
  'PHASE 1': 'Technical battles — code, AI prompts & web design.',
  'PHASE 2': 'Deep dives — research, logic & databases.',
  'PHASE 3': 'Creative & fun — connections, gaming & memes.',
};

const Events = () => {
  const [activePhase, setActivePhase] = useState('PHASE 1');
  const phases = ['PHASE 1','PHASE 2','PHASE 3'] as const;

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">

      {/* Ambient blobs — navy + gold */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#1B3A6B]/08 blur-[130px] pointer-events-none rounded-full" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-[#C8845A]/10 blur-[110px] pointer-events-none rounded-full" />
      <div className="fixed bottom-1/4 left-0 w-72 h-72 bg-[#1B3A6B]/06 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="section-label inline-flex mb-5">
            <Sparkles size={12}/> 11 Events · 3 Phases
          </motion.span>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{color:'#0F2444'}}>
            Explore Events
          </motion.h1>
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.16}}
            className="text-lg text-[#4A6080] font-inter">
            Choose your battleground. Maximum of{' '}
            <span className="text-[#A0623E] font-bold">3 events</span> — one from each phase.
          </motion.p>
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.24}}
            className="mt-4 inline-flex items-center gap-2 bg-[#F5EDE5] border border-[#C8845A]/30 text-[#A0623E] text-xs font-bold px-4 py-2 rounded-full font-inter uppercase tracking-widest">
            <User size={12}/> Individual Participation Only
          </motion.div>
        </div>

        {/* Phase Selector */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex bg-white/85 backdrop-blur border border-[#C8845A]/20 p-1.5 rounded-full gap-1 shadow-[0_4px_24px_rgba(27,58,107,0.10)]">
            {phases.map(phase => (
              <button key={phase} onClick={() => setActivePhase(phase)}
                className={`phase-pill relative z-10 ${activePhase===phase ? 'phase-pill-active' : 'phase-pill-inactive'}`}>
                {activePhase===phase && (
                  <motion.span layoutId="phase-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1B3A6B] to-[#2D5BA3] -z-10"
                    transition={{type:'spring',stiffness:420,damping:36}}/>
                )}
                {phase}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={activePhase+'-d'} initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}
            className="text-center text-[#4A6080] text-sm mb-12 font-inter">
            {phaseDesc[activePhase]}
          </motion.p>
        </AnimatePresence>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activePhase} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}}
            transition={{duration:0.38}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents[activePhase as keyof typeof mockEvents].map((event, i) => {
              const Icon = iconMap[event.icon] || Code;
              const tag = tagConfig[event.tag] || tagConfig.Technical;
              return (
                <motion.div key={event.id} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.08,duration:0.45}}
                  className="glass-card group relative overflow-hidden flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/05 via-transparent to-[#C8845A]/05 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"/>

                  <div className="p-7 relative z-10 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0EBE0] to-[#E8E0F0] border border-[#C8845A]/22 flex items-center justify-center text-[#A0623E] group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-350">
                        <Icon size={26}/>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tag.bg} ${tag.text} ${tag.border} font-inter`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tag.dot} shrink-0`}/>
                        {event.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 font-orbitron group-hover:text-[#A0623E] transition-colors duration-300" style={{color:'#0F2444'}}>
                      {event.name}
                    </h3>
                    <p className="text-[#4A6080] mb-6 line-clamp-2 text-sm leading-relaxed font-inter">{event.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-[#4A6080] font-inter bg-[#EEF2F8]/80 rounded-xl px-3.5 py-2.5 border border-[#1B3A6B]/10">
                        <Clock size={13} className="mr-2.5 text-[#1B3A6B] shrink-0"/> {event.duration}
                      </div>
                      <div className="flex items-center text-sm text-[#4A6080] font-inter bg-[#F5EDE5]/80 rounded-xl px-3.5 py-2.5 border border-[#C8845A]/15">
                        <MapPin size={13} className="mr-2.5 text-[#A0623E] shrink-0"/> {event.venue}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-[#C8845A]/15 px-7 py-4 bg-gradient-to-r from-[#F5EDE5]/40 to-[#EEF2F8]/30 flex justify-between items-center group-hover:from-[#F5EDE5]/70 group-hover:to-[#EEF2F8]/50 transition-colors duration-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#C8845A] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {event.coordinator.replace('Ms. ','').replace('Mr. ','').charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-[#4A6080] font-inter">{event.coordinator}</span>
                    </div>
                    <Link to="/register" className="group/btn flex items-center gap-1 text-[#A0623E] text-sm font-bold hover:text-[#1B3A6B] transition-all duration-200 font-inter">
                      Register <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform"/>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
