import { motion } from 'framer-motion';
import { CheckCircle, Target, Cpu, Users, BookOpen } from 'lucide-react';

const values = [
  { icon: BookOpen, label: 'Academic Excellence',   desc: 'Rigorous curriculum blended with real-world problem solving and research.' },
  { icon: Cpu,      label: 'Innovation First',       desc: 'Hands-on labs, research groups, and startup incubation programs.' },
  { icon: Users,    label: 'Community & Culture',    desc: 'A diverse, inclusive environment that celebrates every talent and idea.' },
];

const About = () => (
  <div className="min-h-screen bg-background pt-28 pb-24 relative">

    {/* Ambient blobs */}
    <div className="fixed top-0 right-0 w-96 h-96 rounded-full bg-blue-200/22 blur-[130px] pointer-events-none" />
    <div className="fixed bottom-0 left-0 w-80 h-80 rounded-full bg-sky-200/18 blur-[110px] pointer-events-none" />
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-100/12 blur-[150px] pointer-events-none" />

    <div className="container mx-auto px-4 max-w-6xl relative z-10">

      {/* ── Header ── */}
      <div className="text-center mb-20">
        <motion.span initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="section-label inline-flex mb-5">
          About the Symposium
        </motion.span>
        <motion.h1
          initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight" style={{ color:'#1E3A5F' }}
        >
          About <span className="text-gradient-primary">SYNTAX 2K26</span>
        </motion.h1>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.2, duration:0.6 }} className="divider-glow w-24 mx-auto mb-6" />
        <motion.p
          initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }}
          className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-inter"
        >
          The ultimate convergence of technology, innovation, and creativity — a platform for the brightest minds to showcase their skills and push the boundaries of what's possible.
        </motion.p>
      </div>

      {/* ── College + Department ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          {
            icon: Users,
            iconGrad: 'from-blue-50 to-sky-50',
            iconHover: 'group-hover:from-blue-500 group-hover:to-sky-400',
            title: 'The College',
            body: 'Nadar Saraswathi College of Engineering & Technology, situated in the picturesque surroundings of Theni, is a premier institution dedicated to imparting quality technical education. With state-of-the-art infrastructure and a visionary approach, NSCET has been a beacon of excellence in shaping the engineers of tomorrow.',
          },
          {
            icon: Cpu,
            iconGrad: 'from-indigo-50 to-blue-50',
            iconHover: 'group-hover:from-indigo-500 group-hover:to-blue-500',
            title: 'Faculty of Computing',
            body: 'The Faculty of Computing encompasses the Departments of Computer Science & Engineering, Information Technology, and Artificial Intelligence & Data Science. We foster a culture of research, innovation, and practical learning, ensuring our students are industry-ready and equipped to tackle real-world challenges.',
          },
        ].map(({ icon: Icon, iconGrad, iconHover, title, body }) => (
          <motion.div
            key={title}
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-60px' }}
            transition={{ duration:0.6 }}
            className="glass-card p-8 group"
          >
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${iconGrad} border border-blue-200 text-blue-500 rounded-2xl flex items-center justify-center mr-4 ${iconHover} group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-200/60 transition-all duration-350`}>
                <Icon size={22} />
              </div>
              <h2 className="text-2xl font-bold font-orbitron" style={{ color:'#1E3A5F' }}>{title}</h2>
            </div>
            <p className="text-slate-500 leading-relaxed font-inter text-[15px]">{body}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Values ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {values.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ delay: i * 0.12 }}
            className="glass-card p-6 text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 text-indigo-500 flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-500 group-hover:to-blue-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-indigo-200/50 transition-all duration-350">
              <v.icon size={22} />
            </div>
            <h3 className="text-base font-bold mb-2 font-orbitron" style={{ color:'#1E3A5F' }}>{v.label}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-inter">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Vision & Mission ── */}
      <motion.div
        initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/55 via-white/85 to-sky-100/55" />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl" />
        <div className="absolute inset-0 border border-blue-200/60 rounded-3xl" />
        <div className="absolute top-[-30px] left-[20%] w-72 h-72 bg-blue-200/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20px] right-[20%] w-64 h-64 bg-sky-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 p-10 md:p-14">
          <div className="text-center mb-12">
            <span className="section-label inline-flex mb-4">Vision &amp; Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron" style={{ color:'#1E3A5F' }}>
              Our Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 text-blue-500 flex items-center justify-center mr-3 shadow-sm">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-bold font-orbitron" style={{ color:'#1E3A5F' }}>Vision</h3>
              </div>
              <p className="text-slate-500 leading-relaxed font-inter text-[15px]">
                To emerge as a center of excellence in computing education and research, producing globally competent professionals with strong ethical values who contribute to the socio-economic development of the nation.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 text-indigo-500 flex items-center justify-center mr-3 shadow-sm">
                  <CheckCircle size={20} />
                </div>
                <h3 className="text-xl font-bold font-orbitron" style={{ color:'#1E3A5F' }}>Mission</h3>
              </div>
              <ul className="space-y-3 text-slate-500 font-inter text-[15px]">
                {[
                  'Provide strong foundational knowledge and advanced skills.',
                  'Promote an environment of continuous learning and innovation.',
                  'Foster industry-academia collaboration for practical exposure.',
                  'Inculcate leadership qualities and professional ethics.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-sky-400 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </div>
);

export default About;
