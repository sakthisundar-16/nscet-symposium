import { motion } from 'framer-motion';
import { CheckCircle, Target, Cpu, Users, BookOpen } from 'lucide-react';

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
          The ultimate convergence of technology, innovation, and creativity — a platform for the brightest minds to showcase their skills and push the boundaries of what's possible.
        </motion.p>
      </div>

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

    </div>
  </div>
);

export default About;
