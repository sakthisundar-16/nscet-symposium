import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, MapPin, Code, Bot, Layout, FileText, BrainCircuit, Database,
  Link as LinkIcon, Image, Video, Gamepad2, Smile, ChevronRight, Sparkles, User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockEvents = {
  'PHASE 1': [
    { id: 1, name: 'Code Debugging',    description: 'Find and fix the bugs in the provided code snippets within the time limit.',  duration: '60 Mins', venue: 'Lab 1', icon: 'Code',    coordinator: 'Ms. Abirami Gayathiri', tag: 'Technical' },
    { id: 2, name: 'AI Prompt Battle',  description: 'Generate the exact target image using AI prompt engineering skills.',          duration: '45 Mins', venue: 'Lab 2', icon: 'Bot',     coordinator: 'Mr. Vinoth Kumar',      tag: 'AI' },
    { id: 3, name: 'Web Design Battle', description: 'Design a responsive landing page based on the on-spot theme.',                 duration: '90 Mins', venue: 'Lab 3', icon: 'Layout', coordinator: 'Ms. Bhavani',          tag: 'Design' },
  ],
  'PHASE 2': [
    { id: 4, name: 'Paper Presentation',       description: 'Present your research paper on emerging technologies.',          duration: '10 Mins', venue: 'Seminar Hall', icon: 'FileText',    coordinator: 'Mr. Prathap',           tag: 'Research' },
    { id: 5, name: 'Logic Building Challenge', description: 'Solve algorithmic puzzles and complex logic problems.',          duration: '60 Mins', venue: 'Lab 1',       icon: 'BrainCircuit', coordinator: 'Ms. Abirami Gayathiri', tag: 'Technical' },
    { id: 6, name: 'SQL Query Challenge',      description: 'Write complex SQL queries to solve real-world database tasks.',  duration: '60 Mins', venue: 'Lab 2',       icon: 'Database',     coordinator: 'Ms. Bhavani',          tag: 'Technical' },
  ],
  'PHASE 3': [
    { id: 7,  name: 'Connection',          description: 'Connect the images to identify the hidden technical term.',                   duration: '45 Mins',  venue: 'Auditorium',   icon: 'LinkIcon', coordinator: 'Mr. Vinoth Kumar',      tag: 'Fun' },
    { id: 8,  name: 'Logo Guessing',       description: 'Identify tech company logos from partially revealed images.',                duration: '30 Mins',  venue: 'Seminar Hall', icon: 'Image',    coordinator: 'Mr. Prathap',           tag: 'Fun' },
    { id: 9,  name: 'Short Film',          description: 'Showcase a pre-submitted short film on technology\'s impact on society.',    duration: '5 Mins',   venue: 'Auditorium',   icon: 'Video',    coordinator: 'Ms. Abirami Gayathiri', tag: 'Creative' },
    { id: 10, name: 'Free Fire Tournament', description: 'Solo e-Sports gaming tournament — best reaction wins.',                     duration: '120 Mins', venue: 'Lab 3',        icon: 'Gamepad2', coordinator: 'Mr. Vinoth Kumar',      tag: 'E-Sports' },
    { id: 11, name: 'Meme Challenge',      description: 'Create the funniest tech-related memes on the spot.',                        duration: '30 Mins',  venue: 'Lab 2',        icon: 'Smile',    coordinator: 'Ms. Bhavani',          tag: 'Creative' },
  ],
};

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code, Bot, Layout, FileText, BrainCircuit, Database, LinkIcon, Image, Video, Gamepad2, Smile,
};

const tagConfig: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Technical: { bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-200',   dot: 'bg-blue-500' },
  AI:        { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  Design:    { bg: 'bg-pink-50',   text: 'text-pink-600',   border: 'border-pink-200',   dot: 'bg-pink-500' },
  Research:  { bg: 'bg-teal-50',   text: 'text-teal-600',   border: 'border-teal-200',   dot: 'bg-teal-500' },
  Fun:       { bg: 'bg-amber-50',  text: 'text-amber-600',  border: 'border-amber-200',  dot: 'bg-amber-500' },
  Creative:  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', dot: 'bg-orange-500' },
  'E-Sports':{ bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-200',  dot: 'bg-green-500' },
};

const phaseDesc: Record<string, string> = {
  'PHASE 1': 'Technical battles — code, AI prompts & web design.',
  'PHASE 2': 'Deep dives — research, logic & databases.',
  'PHASE 3': 'Creative & fun — connections, gaming & memes.',
};

const Events = () => {
  const [activePhase, setActivePhase] = useState('PHASE 1');
  const phases = ['PHASE 1', 'PHASE 2', 'PHASE 3'] as const;

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">

      {/* Ambient blobs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-200/18 blur-[130px] pointer-events-none rounded-full" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-sky-200/18 blur-[110px] pointer-events-none rounded-full" />
      <div className="fixed bottom-1/4 left-0 w-72 h-72 bg-indigo-200/14 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8">
          <motion.span initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="section-label inline-flex mb-5">
            <Sparkles size={12} /> 11 Events · 3 Phases
          </motion.span>
          <motion.h1
            initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{ color:'#1E3A5F' }}
          >
            Explore Events
          </motion.h1>
          <motion.p
            initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }}
            className="text-lg text-slate-500 font-inter"
          >
            Choose your battleground. Participate in a maximum of{' '}
            <span className="text-blue-600 font-bold">3 events</span> — one from each phase.
          </motion.p>

          {/* Individual badge */}
          <motion.div
            initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.24 }}
            className="mt-4 inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-600 text-xs font-bold px-4 py-2 rounded-full font-inter uppercase tracking-widest"
          >
            <User size={12} /> Individual Participation Only
          </motion.div>
        </div>

        {/* Phase Selector */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex bg-white/82 backdrop-blur border border-blue-100 p-1.5 rounded-full gap-1 shadow-[0_4px_24px_rgba(59,130,246,0.10)]">
            {phases.map(phase => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`phase-pill relative z-10 ${activePhase === phase ? 'phase-pill-active' : 'phase-pill-inactive'}`}
              >
                {activePhase === phase && (
                  <motion.span
                    layoutId="phase-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 -z-10"
                    transition={{ type:'spring', stiffness:420, damping:36 }}
                  />
                )}
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Phase description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activePhase + '-d'}
            initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:6 }}
            className="text-center text-slate-400 text-sm mb-12 font-inter"
          >
            {phaseDesc[activePhase]}
          </motion.p>
        </AnimatePresence>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-18 }}
            transition={{ duration:0.38 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mockEvents[activePhase as keyof typeof mockEvents].map((event, i) => {
              const Icon = iconMap[event.icon] || Code;
              const tag = tagConfig[event.tag] || tagConfig.Technical;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: i*0.08, duration:0.45 }}
                  className="glass-card group relative overflow-hidden flex flex-col"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/8 via-transparent to-sky-300/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                  <div className="p-7 relative z-10 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200/80 flex items-center justify-center text-blue-500 group-hover:from-blue-500 group-hover:to-sky-400 group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-200/60 transition-all duration-350">
                        <Icon size={26} />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tag.bg} ${tag.text} ${tag.border} font-inter`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tag.dot} shrink-0`} />
                        {event.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 font-orbitron group-hover:text-blue-600 transition-colors duration-300" style={{ color:'#1E3A5F' }}>
                      {event.name}
                    </h3>
                    <p className="text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed font-inter">{event.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-slate-500 font-inter bg-blue-50/60 rounded-xl px-3.5 py-2.5 border border-blue-100/80">
                        <Clock size={13} className="mr-2.5 text-blue-400 shrink-0" /> {event.duration}
                      </div>
                      <div className="flex items-center text-sm text-slate-500 font-inter bg-sky-50/60 rounded-xl px-3.5 py-2.5 border border-sky-100/80">
                        <MapPin size={13} className="mr-2.5 text-sky-400 shrink-0" /> {event.venue}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-blue-100/70 px-7 py-4 bg-gradient-to-r from-blue-50/40 to-sky-50/30 flex justify-between items-center group-hover:from-blue-50/70 group-hover:to-sky-50/50 transition-colors duration-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {event.coordinator.replace('Ms. ', '').replace('Mr. ', '').charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-slate-400 font-inter">{event.coordinator}</span>
                    </div>
                    <Link
                      to="/register"
                      className="group/btn flex items-center gap-1 text-blue-500 text-sm font-bold hover:text-sky-500 transition-all duration-200 font-inter"
                    >
                      Register <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
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
