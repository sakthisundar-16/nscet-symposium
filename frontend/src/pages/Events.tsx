import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, MapPin, Code, Bot, Layout, FileText, BrainCircuit, Database,
  Link as LinkIcon, Image, Video, Gamepad2, Smile, ChevronRight,
  Sparkles, User, X, Target, Scale, Trophy, CheckCircle, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────
   Full event details data
───────────────────────────────────────────────────────────────────────── */
const eventDetails: Record<number, {
  objective?: string;
  participation: string;
  platform?: string;
  format?: string[];
  rules: string[];
  judging: string[];
  prize?: string[];
  extra?: { label: string; value: string }[];
}> = {
  1: {
    objective: 'To identify and rectify syntax, logical, and runtime errors in the given program.',
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Programming language will be announced during the event.',
      'Internet access is not permitted.',
      'Participants must correct the program within the allotted time.',
      'Multiple rounds may be conducted based on the number of participants.',
    ],
    judging: ['Accuracy', 'Number of Errors Corrected', 'Time Taken', 'Code Efficiency'],
  },
  2: {
    objective: 'To design the most effective AI prompt for solving the given problem statement.',
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Problem statement will be provided on the spot.',
      'Only approved AI platforms may be used.',
      'Prompt engineering skills will be evaluated.',
      'Internet access will be allowed only if permitted by the organizers.',
    ],
    judging: ['Prompt Quality', 'Creativity', 'Accuracy of AI Response', 'Innovation', 'Efficiency'],
  },
  3: {
    objective: 'To design an attractive, responsive, and functional webpage based on the given theme.',
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Theme will be announced during the event.',
      'Participants may use HTML, CSS, JavaScript, Bootstrap or approved frameworks.',
      'Time limit must be strictly followed.',
    ],
    judging: ['Creativity', 'User Interface Design', 'Responsiveness', 'Functionality', 'Coding Standards'],
  },
  4: {
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Presentation Duration: 8–10 Minutes.',
      'Question & Answer Session: 2–3 Minutes.',
      'PPT must be submitted before the specified deadline.',
      'Plagiarism is strictly prohibited.',
      'Original work will receive preference.',
    ],
    judging: ['Technical Knowledge', 'Innovation', 'Presentation Skills', 'Communication', 'Response to Questions'],
  },
  5: {
    objective: 'To evaluate analytical thinking and problem-solving ability.',
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Questions may include logical reasoning, programming logic, algorithms, and aptitude.',
      'Electronic devices are not permitted.',
      'Time limit will be strictly followed.',
    ],
    judging: ['Accuracy', 'Logical Thinking', 'Speed', 'Problem Solving Ability'],
  },
  6: {
    objective: 'To evaluate participants\' knowledge of SQL by testing their ability to retrieve, manipulate, and analyze data using efficient SQL queries.',
    participation: 'Individual',
    platform: 'MySQL / PostgreSQL / SQLite (as provided by the organizers). Participants will use the system allocated by the organizers.',
    format: [
      'Round 1: Basic SQL Queries (SELECT, WHERE, ORDER BY, GROUP BY)',
      'Round 2: Intermediate SQL Queries (JOINS, Aggregate Functions, Subqueries)',
    ],
    rules: [
      'Individual participation only.',
      'Participants must report 15 minutes before the event begins.',
      'A database schema and sample dataset will be provided before the competition.',
      'Internet access and external reference materials are not permitted.',
      'Participants must write SQL queries to solve the given problem statements within the allotted time.',
      'Queries should produce accurate and optimized results.',
      'Any form of plagiarism, copying, or unfair practices will result in immediate disqualification.',
      'The decision of the judges shall be final.',
    ],
    judging: ['Accuracy of Query Results', 'Query Optimization and Efficiency', 'Completion Time', 'Problem-Solving Skills', 'SQL Syntax and Best Practices'],
    prize: ['Winner – Certificate and Prize', 'Runner-up – Certificate and Prize', 'Participation Certificates will be awarded to all registered participants.'],
  },
  7: {
    objective: 'Identify the correct word, phrase, movie, personality, or concept using a sequence of related images.',
    participation: 'Team of Two Members',
    rules: [
      'Team of Two Members.',
      'Discussion is allowed only between teammates.',
      'No mobile phones or internet access.',
      'Each question carries a fixed time limit.',
    ],
    judging: ['Correct Answers', 'Speed', 'Team Coordination'],
  },
  8: {
    objective: 'Identify logos of companies, brands, applications, sports teams, or organizations.',
    participation: 'Team of Two Members',
    rules: [
      'Team of Two Members.',
      'Logos may be partially hidden or modified.',
      'Internet access is prohibited.',
      'Time limit applies for every question.',
    ],
    judging: ['Correct Answers', 'Speed'],
  },
  9: {
    objective: 'Create an original short film based on the theme provided.',
    participation: 'Team of Two Members',
    rules: [
      'Team of Two Members.',
      'Duration: 3–5 Minutes.',
      'Theme will be announced by the organizers.',
      'Mobile phones or cameras may be used.',
      'Editing is permitted.',
      'Offensive, abusive, or copyrighted content is strictly prohibited.',
    ],
    judging: ['Storytelling', 'Creativity', 'Editing Quality', 'Theme Relevance', 'Overall Presentation'],
  },
  10: {
    objective: 'Compete in an intense battle royale environment by demonstrating teamwork, strategic planning, survival skills, and combat techniques to emerge as the winning team.',
    participation: 'Team Event (2 Members per Team)',
    platform: 'Android / iOS Mobile Devices. Participants must bring their own mobile devices (fully charged). Internet connection (Wi-Fi or Mobile Data) will be provided as instructed.',
    format: [
      'Duo Battle Royale — Custom Room',
      'Knockout Format (or League Format based on registered teams)',
      'Number of matches decided by organizing committee',
    ],
    rules: [
      'Each team must consist of two members.',
      'Teams must report 15 minutes before the scheduled match.',
      'Participants must use their own Free Fire account.',
      'Only the registered team members are allowed to participate.',
      'Team substitutions are not permitted after registration.',
      'Use of hacks, cheats, scripts, emulators, macros, VPNs, or third-party applications is strictly prohibited.',
      'Any player found violating game rules will result in immediate disqualification of the team.',
      'The room ID and password will be shared by the organizers before each match.',
      'Intentional teaming with other squads is strictly prohibited.',
      'In case of network issues or technical failures, the decision of the organizing committee shall be final.',
      'Participants must maintain sportsmanship and avoid abusive language or inappropriate behavior.',
      'The organizing committee reserves the right to modify the match format based on the number of participants.',
    ],
    judging: ['Team Placement (Survival Ranking)', 'Number of Eliminations (Kills)', 'Team Coordination', 'Strategy and Decision Making', 'Fair Play and Sportsmanship'],
    prize: ['Winner – Certificate and Prize', 'Runner-up – Certificate and Prize', 'Participation Certificates will be awarded to all registered participants.'],
  },
  11: {
    objective: 'Create the funniest and most creative tech-related meme on the spot based on the given theme.',
    participation: 'Individual',
    rules: [
      'Individual Participation.',
      'Theme will be announced during the event.',
      'Participants may use approved editing tools.',
      'Offensive or inappropriate content is strictly prohibited.',
      'Time limit must be strictly followed.',
    ],
    judging: ['Creativity', 'Humour', 'Relevance to Theme', 'Overall Impact'],
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   Events config
───────────────────────────────────────────────────────────────────────── */
const mockEvents = {
  'PHASE 1': [
    { id:1, name:'Code Debugging',    description:'Find and fix syntax, logical and runtime errors in provided code snippets within the time limit.',  duration:'60 Mins', venue:'Lab 1', icon:'Code',    coordinator:'Ms. Abirami Gayathiri', tag:'Technical' },
    { id:2, name:'AI Prompt Battle',  description:'Generate the exact target image using AI prompt engineering skills.',          duration:'45 Mins', venue:'Lab 2', icon:'Bot',     coordinator:'Mr. Vinoth Kumar',      tag:'AI' },
    { id:3, name:'Web Design Battle', description:'Design a responsive landing page based on the on-spot theme.',                 duration:'90 Mins', venue:'Lab 3', icon:'Layout', coordinator:'Ms. Bhavani',          tag:'Design' },
  ],
  'PHASE 2': [
    { id:4, name:'Paper Presentation',       description:'Present your research paper on emerging technologies.',          duration:'10 Mins', venue:'Seminar Hall', icon:'FileText',    coordinator:'Mr. Prathap',           tag:'Research' },
    { id:5, name:'Logic Building Challenge', description:'Solve algorithmic puzzles and complex logic problems.',          duration:'60 Mins', venue:'Lab 1',       icon:'BrainCircuit', coordinator:'Ms. Abirami Gayathiri', tag:'Technical' },
    { id:6, name:'SQL Query Challenge',      description:'Write complex SQL queries to solve real-world database tasks.',  duration:'60 Mins', venue:'Lab 2',       icon:'Database',     coordinator:'Ms. Bhavani',          tag:'Technical' },
  ],
  'PHASE 3': [
    { id:7,  name:'Connection',           description:'Connect images to identify the hidden technical term or concept.',                     duration:'45 Mins',  venue:'Auditorium',   icon:'LinkIcon', coordinator:'Mr. Vinoth Kumar',      tag:'Fun' },
    { id:8,  name:'Logo Guessing',        description:'Identify tech company logos from partially revealed or modified images.',              duration:'30 Mins',  venue:'Seminar Hall', icon:'Image',    coordinator:'Mr. Prathap',           tag:'Fun' },
    { id:9,  name:'Short Film',           description:"Showcase a pre-submitted short film on technology's impact on society.",              duration:'5 Mins',   venue:'Auditorium',   icon:'Video',    coordinator:'Ms. Abirami Gayathiri', tag:'Creative' },
    { id:10, name:'Free Fire Tournament', description:'Solo duo e-Sports gaming tournament — best strategy and survival wins.',               duration:'120 Mins', venue:'Lab 3',        icon:'Gamepad2', coordinator:'Mr. Vinoth Kumar',      tag:'E-Sports' },
    { id:11, name:'Meme Challenge',       description:'Create the funniest tech-related memes on the spot within the time limit.',           duration:'30 Mins',  venue:'Lab 2',        icon:'Smile',    coordinator:'Ms. Bhavani',          tag:'Creative' },
  ],
};

const iconMap: Record<string, React.ComponentType<{size?:number}>> = {
  Code, Bot, Layout, FileText, BrainCircuit, Database, LinkIcon, Image, Video, Gamepad2, Smile,
};

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

type EventItem = typeof mockEvents['PHASE 1'][number];

/* ─────────────────────────────────────────────────────────────────────────
   Detail Modal
───────────────────────────────────────────────────────────────────────── */
const EventModal = ({ event, onClose }: { event: EventItem; onClose: () => void }) => {
  const Icon = iconMap[event.icon] || Code;
  const tag  = tagConfig[event.tag] || tagConfig.Technical;
  const det  = eventDetails[event.id];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0F2444]/70 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 28 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2444] via-[#1B3A6B] to-[#0F2444] rounded-3xl" />
        <div className="absolute inset-0 rounded-3xl border border-[#C8845A]/30" />
        {/* Gold accent orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C8845A]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#C8845A]/08 blur-3xl pointer-events-none" />
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8845A] to-transparent rounded-t-3xl" />

        <div className="relative z-10 p-7 md:p-10">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="flex items-start gap-5 mb-7 pr-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-[#C8845A]/25 blur-md" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C8845A] to-[#A0623E] flex items-center justify-center shadow-lg shadow-[#C8845A]/40">
                <Icon size={28} className="text-white" />
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${tag.bg} ${tag.text} ${tag.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} /> {event.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white leading-tight">{event.name}</h2>
              <div className="flex flex-wrap gap-3 mt-2.5">
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-inter">
                  <Clock size={12} className="text-[#C8845A]" /> {event.duration}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-inter">
                  <MapPin size={12} className="text-[#C8845A]" /> {event.venue}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60 font-inter">
                  <Users size={12} className="text-[#C8845A]" /> {det?.participation}
                </span>
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C8845A]/45 to-transparent mb-7" />

          {/* Objective */}
          {det?.objective && (
            <div className="mb-6">
              <SectionHead icon={Target} label="Objective" />
              <p className="text-white/75 text-sm leading-relaxed font-inter mt-2">{det.objective}</p>
            </div>
          )}

          {/* Platform */}
          {det?.platform && (
            <div className="mb-6">
              <SectionHead icon={CheckCircle} label="Platform" />
              <p className="text-white/75 text-sm leading-relaxed font-inter mt-2">{det.platform}</p>
            </div>
          )}

          {/* Format */}
          {det?.format && det.format.length > 0 && (
            <div className="mb-6">
              <SectionHead icon={Scale} label="Event Format" />
              <div className="mt-2 space-y-1.5">
                {det.format.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C8845A] shrink-0" />
                    <p className="text-white/75 text-sm leading-relaxed font-inter">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules */}
          <div className="mb-6">
            <SectionHead icon={Scale} label="Rules" />
            <div className="mt-3 space-y-2">
              {det?.rules.map((rule, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl p-3"
                >
                  <div className="shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#C8845A] to-[#A0623E] flex items-center justify-center">
                    <span className="text-[10px] font-black text-white font-inter">{i + 1}</span>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed font-inter">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Judging Criteria */}
          <div className="mb-6">
            <SectionHead icon={Trophy} label="Judging Criteria" />
            <div className="mt-3 flex flex-wrap gap-2">
              {det?.judging.map((j, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/[0.07] border border-[#C8845A]/25 text-white/80 text-xs font-semibold px-3.5 py-1.5 rounded-full font-inter">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8845A] shrink-0" /> {j}
                </span>
              ))}
            </div>
          </div>

          {/* Prize */}
          {det?.prize && det.prize.length > 0 && (
            <div className="mb-6">
              <SectionHead icon={Trophy} label="Prizes" />
              <div className="mt-3 space-y-2">
                {det.prize.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-[#C8845A]/10 to-transparent border border-[#C8845A]/20 rounded-xl px-4 py-2.5">
                    <span className="text-[#C8845A] text-base">🏆</span>
                    <p className="text-white/80 text-sm font-inter">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gold divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#C8845A]/35 to-transparent mb-6" />

          {/* Coordinator + Register */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#C8845A] flex items-center justify-center text-white font-black text-sm shadow-md">
                {event.coordinator.replace('Ms. ','').replace('Mr. ','').charAt(0)}
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-inter">Coordinator</p>
                <p className="text-sm font-semibold text-white/80 font-inter">{event.coordinator}</p>
              </div>
            </div>
            <Link to="/register" onClick={onClose}
              className="btn-primary inline-flex items-center gap-2 px-7 py-3 text-sm shrink-0">
              Register for this Event <ChevronRight size={15} />
            </Link>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

/* Small helper for section headings inside the modal */
const SectionHead = ({ icon: Icon, label }: { icon: React.ComponentType<{size?:number; className?:string}>; label: string }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-6 h-6 rounded-lg bg-[#C8845A]/20 border border-[#C8845A]/30 flex items-center justify-center">
      <Icon size={13} className="text-[#C8845A]" />
    </div>
    <h3 className="text-sm font-bold text-[#C8845A] uppercase tracking-[0.14em] font-inter">{label}</h3>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────
   Main Events Page
───────────────────────────────────────────────────────────────────────── */
const Events = () => {
  const [activePhase, setActivePhase]       = useState('PHASE 1');
  const [selectedEvent, setSelectedEvent]   = useState<EventItem | null>(null);
  const phases = ['PHASE 1', 'PHASE 2', 'PHASE 3'] as const;

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">

      {/* Ambient blobs */}
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
            Click any event card to view full rules, judging criteria &amp; details.
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
              const tag  = tagConfig[event.tag] || tagConfig.Technical;
              return (
                <motion.div key={event.id} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.08,duration:0.45}}
                  className="glass-card group relative overflow-hidden flex flex-col cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/05 via-transparent to-[#C8845A]/05 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"/>

                  <div className="p-7 relative z-10 flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0EBE0] to-[#E8E0F0] border border-[#C8845A]/22 flex items-center justify-center text-[#A0623E] group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-350">
                        <Icon size={26}/>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tag.bg} ${tag.text} ${tag.border} font-inter`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tag.dot} shrink-0`}/>{event.tag}
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
                    <span className="flex items-center gap-1 text-[#A0623E] text-sm font-bold font-inter group-hover:text-[#1B3A6B] transition-all duration-200">
                      View Details <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;
