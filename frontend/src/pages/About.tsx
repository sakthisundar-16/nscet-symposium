import { motion } from 'framer-motion';
import { CheckCircle, Target, Cpu, Users, BookOpen, ShieldCheck } from 'lucide-react';

const values = [
  { icon: BookOpen, label:'Academic Excellence',  desc:'Rigorous curriculum blended with real-world problem solving and research.' },
  { icon: Cpu,      label:'Innovation First',      desc:'Hands-on labs, research groups, and startup incubation programs.' },
  { icon: Users,    label:'Community & Culture',   desc:'A diverse, inclusive environment that celebrates every talent and idea.' },
];

const About = () => (
  <div className="min-h-screen bg-background pt-28 pb-24 relative">

    {/* Ambient blobs — navy + gold */}
    <div className="fixed top-0 right-0 w-96 h-96 rounded-full bg-[#C8845A]/10 blur-[130px] pointer-events-none"/>
    <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full bg-[#1B3A6B]/08 blur-[110px] pointer-events-none"/>
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#C8845A]/05 blur-[150px] pointer-events-none"/>

    <div className="container mx-auto px-4 max-w-6xl relative z-10">

      {/* Header */}
      <div className="text-center mb-20">
        <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="section-label inline-flex mb-5">
          About the Symposium
        </motion.span>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight" style={{color:'#0F2444'}}>
          About <span className="text-gradient-primary">SYNTAX 2K26</span>
        </motion.h1>
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:0.2,duration:0.6}}
          className="divider-glow w-24 mx-auto mb-6"/>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25}}
          className="text-lg md:text-xl text-[#4A6080] max-w-3xl mx-auto leading-relaxed font-inter">
          The flagship National Level Technical Symposium by the Faculty of Computing at NSCET, Theni — where technology meets creativity and competition.
        </motion.p>
      </div>

      {/* ── SYNTAX 2K26 Description ── */}
      <motion.div
        initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.7}}
        className="relative rounded-3xl overflow-hidden mb-16"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/06 via-white/90 to-[#C8845A]/06"/>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl"/>
        <div className="absolute inset-0 border border-[#C8845A]/22 rounded-3xl"/>
        {/* Decorative orbs */}
        <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-[#1B3A6B]/08 blur-3xl pointer-events-none"/>
        <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-[#C8845A]/10 blur-3xl pointer-events-none"/>

        <div className="relative z-10 px-8 md:px-14 py-12 md:py-14">
          {/* Gold accent bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#1B3A6B] to-[#C8845A]"/>
            <div>
              <span className="section-label inline-flex mb-1">National Level Technical Symposium</span>
              <h2 className="text-2xl md:text-3xl font-black font-orbitron" style={{color:'#0F2444'}}>
                About <span className="text-gradient-primary">SYNTAX 2K26</span>
              </h2>
            </div>
          </div>

          <div className="space-y-5 max-w-4xl">
            <p className="text-[15px] md:text-base leading-[1.85] text-[#2D4A6A] font-inter">
              <span className="font-bold text-[#0F2444]">SYNTAX 2K26</span> is the flagship National Level Technical Symposium organized by the{' '}
              <span className="font-semibold text-[#A0623E]">Faculty of Computing (CSE, IT &amp; AIDS Department)</span> at{' '}
              <span className="font-semibold text-[#1B3A6B]">Nadar Saraswathi College of Engineering and Technology, Theni.</span>
            </p>

            <p className="text-[15px] md:text-base leading-[1.85] text-[#2D4A6A] font-inter">
              The symposium serves as a platform for students to demonstrate their technical knowledge, creativity, analytical thinking, communication skills, teamwork, and innovative ideas through a series of challenging <span className="font-semibold text-[#1B3A6B]">technical and non-technical competitions.</span>
            </p>

            <p className="text-[15px] md:text-base leading-[1.85] text-[#2D4A6A] font-inter">
              SYNTAX 2K26 aims to <span className="font-semibold text-[#A0623E]">bridge the gap between academic learning and industry expectations</span> by encouraging students to explore emerging technologies, develop practical skills, and collaborate with peers from various institutions.
            </p>
          </div>

          {/* Quick-stat badges */}
          <div className="flex flex-wrap gap-3 mt-9">
            {[
              { label:'Organized by', value:'Faculty of Computing' },
              { label:'Department',   value:'CSE · IT · AIDS' },
              { label:'Level',        value:'National Level' },
              { label:'Date',         value:'August 7, 2026' },
            ].map(({label,value})=>(
              <div key={label} className="bg-white/80 border border-[#C8845A]/22 rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-[10px] text-[#4A6080] uppercase tracking-[0.18em] font-inter font-semibold mb-0.5">{label}</p>
                <p className="text-sm font-bold font-inter" style={{color:'#0F2444'}}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* College + Department cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          {
            icon: Users,
            title: 'The College',
            body: 'Nadar Saraswathi College of Engineering & Technology, situated in the picturesque surroundings of Theni, is a premier institution dedicated to imparting quality technical education. With state-of-the-art infrastructure and a visionary approach, NSCET has been a beacon of excellence in shaping the engineers of tomorrow.',
          },
          {
            icon: Cpu,
            title: 'Faculty of Computing',
            body: 'The Faculty of Computing encompasses the Departments of Computer Science & Engineering, Information Technology, and Artificial Intelligence & Data Science. We foster a culture of research, innovation, and practical learning, ensuring our students are industry-ready and equipped to tackle real-world challenges.',
          },
        ].map(({icon:Icon,title,body})=>(
          <motion.div key={title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}}
            transition={{duration:0.6}} className="glass-card p-8 group">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F0EBE0] to-[#EEF2F8] border border-[#C8845A]/25 text-[#A0623E] rounded-2xl flex items-center justify-center mr-4 group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-350">
                <Icon size={22}/>
              </div>
              <h2 className="text-2xl font-bold font-orbitron" style={{color:'#0F2444'}}>{title}</h2>
            </div>
            <p className="text-[#4A6080] leading-relaxed font-inter text-[15px]">{body}</p>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {values.map((v,i)=>(
          <motion.div key={v.label} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{delay:i*0.12}} className="glass-card p-6 text-center group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EEF2F8] to-[#F0EBE0] border border-[#C8845A]/22 text-[#A0623E] flex items-center justify-center mx-auto mb-4 group-hover:from-[#1B3A6B] group-hover:to-[#2D5BA3] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[#1B3A6B]/25 transition-all duration-350">
              <v.icon size={22}/>
            </div>
            <h3 className="text-base font-bold mb-2 font-orbitron" style={{color:'#0F2444'}}>{v.label}</h3>
            <p className="text-[#4A6080] text-sm leading-relaxed font-inter">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Vision & Mission */}
      <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
        className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B]/08 via-white/85 to-[#C8845A]/08"/>
        <div className="absolute inset-0 bg-white/55 backdrop-blur-3xl"/>
        <div className="absolute inset-0 border border-[#C8845A]/25 rounded-3xl"/>
        <div className="absolute top-[-30px] left-[20%] w-72 h-72 bg-[#C8845A]/12 blur-3xl rounded-full pointer-events-none"/>
        <div className="absolute bottom-[-20px] right-[20%] w-64 h-64 bg-[#1B3A6B]/08 blur-3xl rounded-full pointer-events-none"/>

        <div className="relative z-10 p-10 md:p-14">
          <div className="text-center mb-12">
            <span className="section-label inline-flex mb-4">Vision &amp; Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron" style={{color:'#0F2444'}}>Our Guiding Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5EDE5] to-[#EEF2F8] border border-[#C8845A]/25 text-[#A0623E] flex items-center justify-center mr-3 shadow-sm">
                  <Target size={20}/>
                </div>
                <h3 className="text-xl font-bold font-orbitron" style={{color:'#0F2444'}}>Vision</h3>
              </div>
              <p className="text-[#4A6080] leading-relaxed font-inter text-[15px]">
                To emerge as a center of excellence in computing education and research, producing globally competent professionals with strong ethical values who contribute to the socio-economic development of the nation.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EEF2F8] to-[#F5EDE5] border border-[#1B3A6B]/18 text-[#1B3A6B] flex items-center justify-center mr-3 shadow-sm">
                  <CheckCircle size={20}/>
                </div>
                <h3 className="text-xl font-bold font-orbitron" style={{color:'#0F2444'}}>Mission</h3>
              </div>
              <ul className="space-y-3 text-[#4A6080] font-inter text-[15px]">
                {[
                  'Provide strong foundational knowledge and advanced skills.',
                  'Promote an environment of continuous learning and innovation.',
                  'Foster industry-academia collaboration for practical exposure.',
                  'Inculcate leadership qualities and professional ethics.',
                ].map((item,idx)=>(
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#1B3A6B] to-[#C8845A] shrink-0"/>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Rules & Regulations ── */}
      <motion.div
        initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.7 }}
        className="relative mt-8"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[#1B3A6B] via-[#C8845A] to-[#1B3A6B] opacity-40 blur-sm pointer-events-none"/>
        {/* Pulsing glow behind card */}
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#1B3A6B]/15 via-[#C8845A]/12 to-[#1B3A6B]/15 blur-xl pointer-events-none animate-pulse"/>

        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#C8845A]/35 shadow-[0_0_60px_rgba(27,58,107,0.18),0_0_30px_rgba(200,132,90,0.14)]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2444] via-[#1B3A6B] to-[#0F2444]"/>
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"/>
          {/* Corner accent orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C8845A]/12 blur-3xl pointer-events-none"/>
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#C8845A]/08 blur-3xl pointer-events-none"/>
          {/* Top gold border line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8845A] to-transparent"/>

          <div className="relative z-10 px-8 md:px-14 py-12 md:py-14">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-[#C8845A]/30 blur-md"/>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8845A] to-[#A0623E] flex items-center justify-center shadow-lg shadow-[#C8845A]/40">
                  <ShieldCheck size={26} className="text-white"/>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8845A] mb-1 font-inter">For All Participants</span>
                <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white">General Rules &amp; Regulations</h2>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#C8845A]/50 to-transparent mb-10"/>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'The symposium is open to students from all recognized colleges and universities.',
                'Participants must maintain proper discipline and decorum throughout the event.',
                'Every participant must wear their College Identity Card during the symposium.',
                'The decision of the Judges and Organizing Committee shall be final and binding.',
                'Any act of malpractice, misconduct, plagiarism, or violation of rules will result in immediate disqualification.',
                'Participants are responsible for their personal belongings.',
                'Event schedules must be strictly followed. Late entries may not be entertained.',
                'Mobile phones, smart watches, and electronic gadgets are prohibited during technical events unless specifically permitted.',
                'Certificates will be issued only to registered participants.',
                'Winners and Runners-up will receive Certificates and Prizes.',
                'The Organizing Committee reserves the right to modify event schedules or rules if necessary.',
              ].map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, x:-14 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.055, duration: 0.4 }}
                  className="flex items-start gap-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#C8845A]/35 rounded-2xl p-4 transition-all duration-300 group cursor-default"
                >
                  {/* Number badge */}
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#C8845A] to-[#A0623E] flex items-center justify-center shadow-md shadow-[#C8845A]/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-[11px] font-black text-white font-inter">{i + 1}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-white/80 font-inter group-hover:text-white/95 transition-colors duration-300 pt-0.5">
                    {rule}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-10 flex items-center gap-3 border-t border-white/[0.08] pt-7">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8845A] shadow-[0_0_8px_rgba(200,132,90,0.8)] animate-pulse shrink-0"/>
              <p className="text-xs text-white/50 font-inter italic">
                These rules are subject to change at the discretion of the Organizing Committee. Participants are advised to check for updates before the event.
              </p>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  </div>
);

export default About;
