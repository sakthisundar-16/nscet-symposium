import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Upload, QrCode, ArrowLeft, ArrowRight,
  User, Calendar, CreditCard, Mail, Phone, MapPin,
  Building2, GraduationCap, MessageCircle,
} from 'lucide-react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const schema = z.object({
  full_name:     z.string().min(3, 'Name is required'),
  gender:        z.enum(['Male','Female','Other']),
  dob:           z.string().min(1, 'Date of Birth is required'),
  phone:         z.string().min(10, 'Valid phone required'),
  email:         z.string().email('Valid email required'),
  whatsapp:      z.string().min(10, 'Valid WhatsApp required'),
  college:       z.string().min(3, 'College name required'),
  department:    z.string().min(2, 'Department required'),
  year_of_study: z.string().min(1, 'Year required'),
  city:          z.string().min(2, 'City required'),
  state:         z.string().min(2, 'State required'),
});

const Field = ({label, error, icon: Icon, children}: {
  label:string; error?:string;
  icon?:React.ComponentType<{size?:number; className?:string}>; children:React.ReactNode;
}) => (
  <div>
    <label className="form-label">{label}</label>
    {Icon ? (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon size={15} className="text-[#A0623E]"/>
        </div>
        <div className="[&>input]:pl-10 [&>select]:pl-10">{children}</div>
      </div>
    ) : children}
    {error && <p className="text-red-500 text-xs mt-1.5 font-inter flex items-center gap-1"><span>⚠</span>{error}</p>}
  </div>
);

const Registration = () => {
  const [step, setStep]                     = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<Record<string,string|null>>({'PHASE 1':null,'PHASE 2':null,'PHASE 3':null});
  const [paymentFile, setPaymentFile]       = useState<File|null>(null);
  const [transactionId, setTransactionId]   = useState('');
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [submitError, setSubmitError]       = useState('');
  const [successData, setSuccessData]       = useState<any>(null);

  const {register, formState:{errors}, trigger, getValues} = useForm({resolver:zodResolver(schema)});

  const nextStep = async () => {
    if (step===1) { if (await trigger()) setStep(2); }
    else if (step===2) {
      if (Object.values(selectedEvents).some(v=>v!==null)) setStep(3);
      else alert('Please select at least one event.');
    }
  };
  const prevStep = () => setStep(s=>s-1);

  const onSubmit = async () => {
    setSubmitError('');
    if (!paymentFile||!transactionId) {setSubmitError('Please upload payment screenshot and enter Transaction ID.');return;}
    setIsSubmitting(true);
    try {
      const fd=new FormData();
      Object.entries(getValues()).forEach(([k,v])=>fd.append(k,v as string));
      const events=(['PHASE 1','PHASE 2','PHASE 3'] as const)
        .filter(p=>selectedEvents[p]).map(p=>({id:selectedEvents[p],phase:p}));
      fd.append('events',JSON.stringify(events));
      fd.append('transaction_id',transactionId);
      fd.append('team_size','1');
      fd.append('payment_screenshot',paymentFile);
      const res=await axios.post('/api/register.php',fd);
      if (res.data.success){setSuccessData(res.data);setStep(4);}
    } catch(e:any){
      setSubmitError(e.response?.data?.message||e.response?.data?.error||'Registration failed. Please try again.');
    } finally{setIsSubmitting(false);}
  };

  const stepMeta=[
    {label:'Personal Info',icon:User},
    {label:'Events',icon:Calendar},
    {label:'Payment',icon:CreditCard},
  ];

  const StepIndicator=()=>(
    <div className="flex justify-center items-center mb-12">
      {stepMeta.map(({label,icon:Icon},i)=>{
        const n=i+1,done=step>n,active=step===n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div animate={{scale:active?1.1:1}}
                className={`step-circle ${done?'step-circle-completed':active?'step-circle-active':'step-circle-inactive'}`}>
                {done?<CheckCircle size={18}/>:<Icon size={16}/>}
              </motion.div>
              <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider font-inter ${active?'text-[#A0623E]':done?'text-green-500':'text-[#1F2937]'}`}>
                {label}
              </span>
            </div>
            {n!==3&&<div className={`w-16 md:w-28 mx-3 mb-5 transition-all duration-700 ${step>n?'step-line-active':'step-line-inactive'}`}/>}
          </div>
        );
      })}
    </div>
  );

  /* ── Success ── */
  if (step===4&&successData) return (
    <div className="min-h-screen pt-28 pb-24 bg-background flex items-center justify-center px-4">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#C8845A]/10 blur-[130px] pointer-events-none"/>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#1B3A6B]/08 blur-[120px] pointer-events-none"/>
      <motion.div initial={{opacity:0,scale:0.88,y:24}} animate={{opacity:1,scale:1,y:0}}
        transition={{type:'spring',stiffness:300,damping:28}}
        className="glass-card-static p-12 max-w-lg w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <span className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse-glow"/>
          <div className="relative w-24 h-24 bg-green-50 border-2 border-green-300 text-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-100">
            <CheckCircle size={46}/>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 font-orbitron" style={{color:'#000000'}}>You're In! 🎉</h2>
        <p className="text-[#1F2937] mb-6 font-inter">Registration successful. Your ID:</p>
        <div className="text-4xl font-mono font-black text-[#A0623E] mb-5 bg-gradient-to-r from-[#F5EDE5] to-[#EEF2F8] border border-[#C8845A]/30 py-5 rounded-2xl tracking-widest shadow-inner">
          {successData.registration_number}
        </div>
        <p className="text-xs text-[#1F2937] mb-8 font-inter leading-relaxed">
          Save this ID for future reference. A confirmation email with your PDF receipt will be sent shortly.
        </p>
        <button onClick={()=>window.print()} className="btn-primary w-full flex items-center justify-center gap-2 py-4">
          Download PDF Receipt
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[550px] h-72 bg-[#1B3A6B]/07 blur-[120px] rounded-full pointer-events-none"/>
      <div className="fixed top-0 right-0 w-80 h-80 bg-[#C8845A]/09 blur-[110px] rounded-full pointer-events-none"/>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.span initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="section-label inline-flex mb-4">
            Individual Registration
          </motion.span>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="text-3xl md:text-4xl font-black mb-3 tracking-tight" style={{color:'#000000'}}>
            Register for <span className="text-gradient-primary">SYNTAX 2K26</span>
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.16}} className="text-[#1F2937] font-inter mb-4">
            National Level Technical Symposium — August 7, 2026
          </motion.p>
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.22}}
            className="inline-flex items-center gap-2 bg-[#F5EDE5] border border-[#C8845A]/30 text-[#A0623E] text-xs font-bold px-5 py-2.5 rounded-full font-inter uppercase tracking-widest">
            <User size={13}/> Individual Participation Only
          </motion.div>
        </div>

        <StepIndicator/>

        <div className="glass-card-static p-8 md:p-10 rounded-3xl border border-[#C8845A]/15">
          <AnimatePresence mode="wait">

            {/* ── STEP 1 ── */}
            {step===1&&(
              <motion.div key="s1" initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-28}} transition={{duration:0.28}}>
                <h2 className="text-xl font-bold mb-1 font-orbitron" style={{color:'#000000'}}>Personal Information</h2>
                <p className="text-[#1F2937] text-sm mb-6 font-inter">Fill in your details to proceed.</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8845A]/30 to-transparent mb-7"/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full Name" icon={User} error={errors.full_name?.message?.toString()}>
                    <input {...register('full_name')} className="form-input" placeholder="John Doe"/>
                  </Field>
                  <Field label="Gender" error={errors.gender?.message?.toString()}>
                    <select {...register('gender')} className="form-select">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Email Address" icon={Mail} error={errors.email?.message?.toString()}>
                    <input type="email" {...register('email')} className="form-input" placeholder="john@example.com"/>
                  </Field>
                  <Field label="Phone Number" icon={Phone} error={errors.phone?.message?.toString()}>
                    <input type="text" {...register('phone')} className="form-input" placeholder="+91 98765 43210"/>
                  </Field>
                  <Field label="WhatsApp Number" icon={MessageCircle} error={errors.whatsapp?.message?.toString()}>
                    <input type="text" {...register('whatsapp')} className="form-input" placeholder="+91 98765 43210"/>
                  </Field>
                  <Field label="Date of Birth" error={errors.dob?.message?.toString()}>
                    <input type="date" {...register('dob')} className="form-input"/>
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="College Name" icon={Building2} error={errors.college?.message?.toString()}>
                      <input type="text" {...register('college')} className="form-input" placeholder="Your college name"/>
                    </Field>
                  </div>
                  <Field label="Department" icon={GraduationCap} error={errors.department?.message?.toString()}>
                    <input type="text" {...register('department')} className="form-input" placeholder="e.g. CSE, IT, AIDS"/>
                  </Field>
                  <Field label="Year of Study" error={errors.year_of_study?.message?.toString()}>
                    <select {...register('year_of_study')} className="form-select">
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </Field>
                  <Field label="City" icon={MapPin} error={errors.city?.message?.toString()}>
                    <input type="text" {...register('city')} className="form-input" placeholder="Your city"/>
                  </Field>
                  <Field label="State" error={errors.state?.message?.toString()}>
                    <input type="text" {...register('state')} className="form-input" placeholder="Your state"/>
                  </Field>
                </div>

                <div className="mt-9 flex justify-end">
                  <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                    Next Step <ArrowRight size={16}/>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2 ── */}
            {step===2&&(
              <motion.div key="s2" initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-28}} transition={{duration:0.28}}>
                <h2 className="text-xl font-bold mb-1 font-orbitron" style={{color:'#000000'}}>Event Selection</h2>
                <p className="text-[#1F2937] text-sm mb-6 font-inter">Pick one event per phase — max 3 events total.</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8845A]/30 to-transparent mb-7"/>

                <div className="bg-[#F5EDE5] border border-[#C8845A]/25 rounded-2xl p-4 mb-7 flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">ℹ️</span>
                  <p className="text-sm text-[#7A4A2A] font-inter leading-relaxed">
                    Select <strong>one event per phase</strong>. Skipping a phase is allowed. All events are for <strong>individual participants only.</strong>
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    {phase:'PHASE 1', color:'border-l-[#1B3A6B]',   opts:[{v:'1',l:'Code Debugging'},{v:'2',l:'AI Prompt Battle'},{v:'3',l:'Web Design Battle'}]},
                    {phase:'PHASE 2', color:'border-l-[#2D5BA3]',   opts:[{v:'4',l:'Paper Presentation'},{v:'5',l:'Logic Building Challenge'},{v:'6',l:'SQL Query Challenge'}]},
                    {phase:'PHASE 3', color:'border-l-[#C8845A]',   opts:[{v:'7',l:'Connection'},{v:'8',l:'Logo Guessing'},{v:'9',l:'Short Film Challenge'},{v:'10',l:'Free Fire Tournament'},{v:'11',l:'Meme Challenge'}]},
                  ].map(({phase,color,opts})=>(
                    <div key={phase} className={`border-l-4 ${color} pl-4`}>
                      <label className="form-label font-bold" style={{color:'#000000'}}>{phase}</label>
                      <select className="form-select" onChange={e=>setSelectedEvents(s=>({...s,[phase]:e.target.value||null}))}>
                        <option value="">— Skip this phase —</option>
                        {opts.map(({v,l})=><option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex justify-between gap-3">
                  <button onClick={prevStep} className="btn-outline flex items-center gap-2"><ArrowLeft size={16}/> Back</button>
                  <button onClick={nextStep} className="btn-primary flex items-center gap-2">Proceed to Payment <ArrowRight size={16}/></button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3 ── */}
            {step===3&&(
              <motion.div key="s3" initial={{opacity:0,x:28}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-28}} transition={{duration:0.28}}>
                <h2 className="text-xl font-bold mb-1 font-orbitron" style={{color:'#000000'}}>Payment Details</h2>
                <p className="text-[#1F2937] text-sm mb-6 font-inter">Scan the QR code, pay ₹350, and upload your receipt.</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8845A]/30 to-transparent mb-7"/>

                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                  {/* QR Card */}
                  <div className="shrink-0 mx-auto md:mx-0">
                    <div className="relative bg-white rounded-3xl p-5 shadow-[0_0_40px_rgba(200,132,90,0.22)] border-2 border-[#C8845A]/35">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F5EDE5]/60 to-[#EEF2F8]/60 opacity-70"/>
                      <div className="relative w-44 h-44 bg-white rounded-2xl flex items-center justify-center border border-[#C8845A]/20 shadow-inner p-3">
                        <QRCode
                          value="upi://pay?pa=nadarsaraswathicollege@tmb&pn=Nadar%20Saraswathi%20College"
                          size={150}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-3xl font-black text-gradient-primary font-orbitron mb-1">₹350</p>
                      <p className="text-xs font-bold text-[#1B3A6B] font-inter">nadarsaraswathicollege@tmb</p>
                      <p className="text-[10px] text-[#1F2937] font-inter mt-0.5">Scan to pay via any UPI app</p>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-5">
                    <div>
                      <label className="form-label">Transaction / UTR ID <span className="text-red-500">*</span></label>
                      <input type="text" value={transactionId} onChange={e=>setTransactionId(e.target.value)}
                        className="form-input" placeholder="Enter UPI Transaction ID"/>
                    </div>

                    <div>
                      <label className="form-label">Upload Payment Screenshot <span className="text-red-500">*</span></label>
                      <div className="relative border-2 border-dashed border-[#C8845A]/30 rounded-2xl p-8 text-center bg-white/70 hover:border-[#C8845A]/60 hover:bg-[#F5EDE5]/20 transition-all duration-300 cursor-pointer group">
                        <input type="file" accept="image/*,.pdf"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={e=>setPaymentFile(e.target.files?.[0]||null)}/>
                        <div className="pointer-events-none">
                          {paymentFile?(
                            <>
                              <CheckCircle size={30} className="text-green-500 mx-auto mb-2"/>
                              <p className="text-green-600 font-bold text-sm font-inter">{paymentFile.name}</p>
                              <p className="text-[#1F2937] text-xs mt-1">Click to change file</p>
                            </>
                          ):(
                            <>
                              <Upload size={30} className="text-[#C8845A]/50 mx-auto mb-2 group-hover:text-[#A0623E] transition-colors"/>
                              <p className="text-[#1F2937] text-sm font-inter font-semibold">Click or drag to upload</p>
                              <p className="text-[#1F2937]/60 text-xs mt-1">Any Image format or PDF · Max 10MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {submitError && (
                    <div className="text-red-500 text-sm font-inter text-center mb-2 font-medium">
                      ⚠ {submitError}
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <button onClick={prevStep} className="btn-outline flex items-center gap-2"><ArrowLeft size={16}/> Back</button>
                    <button onClick={onSubmit} disabled={isSubmitting}
                      className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100">
                      {isSubmitting?(
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Submitting...</>
                      ):(
                        <>Complete Registration <CheckCircle size={16}/></>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Registration;
