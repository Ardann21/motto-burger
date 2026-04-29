import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { TextEffect } from "../components/ui/text-effect";

export default function Origin() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-pearl relative selection:bg-accent/40">
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden px-6 lg:px-24 pb-24">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity }}
          className="absolute inset-0 z-0 origin-bottom"
        >
          <img 
            src="https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?q=60&w=600&auto=format&fit=crop" 
            alt="The Forge"
            className="w-full h-full object-cover brightness-[0.25] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-start">
          <div className="inline-flex items-center space-x-4 mb-8 overflow-hidden">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent text-[10px] sm:text-[11px] tracking-[0.6em] font-black uppercase">Established 2012</span>
          </div>
          <h1 className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-tighter text-white mb-6">
            <div className="overflow-hidden">
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                The <span className="italic font-light text-pearl/80">Blueprint.</span>
              </motion.div>
            </div>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-pearl/40 text-lg sm:text-xl max-w-2xl italic leading-relaxed"
          >
            "A burger is not merely assembled; it is engineered. We treat ingredients not as components, but as structural necessities."
          </motion.p>
        </div>
      </section>

      {/* Chapter 01: The Philosophy */}
      <section className="relative z-10 bg-black pt-32 pb-48 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-32">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
            <div className="md:col-span-5 relative order-2 md:order-1 pt-12 md:pt-0">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.2, ease: "easeOut" }}
                 className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/5 relative"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1544025162-d76694265947?q=60&w=600&auto=format&fit=crop" 
                   alt="Culinary Science"
                   className="w-full h-full object-cover grayscale brightness-75 mix-blend-screen"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-black/20" />
               </motion.div>
               <div className="absolute top-0 right-0 md:-right-12 bg-black border border-white/10 p-6 sm:p-8 rounded-[1.5rem] max-w-[240px] shadow-2xl">
                 <p className="text-[10px] tracking-[0.4em] font-black text-accent uppercase mb-3">Core Tenet</p>
                 <p className="font-serif italic text-white text-lg">Never compromise the foundation.</p>
               </div>
            </div>

            <div className="md:col-span-7 order-1 md:order-2">
              <div className="space-y-8">
                <TextEffect as="h2" preset="fade" className="font-serif text-5xl md:text-7xl text-white tracking-tighter">
                  Against the Fast.
                </TextEffect>
                <div className="space-y-6 text-pearl/50 font-medium leading-relaxed max-w-2xl text-lg">
                  <p>
                    Motto was born in the shadows of a fast-casual paradox. We witnessed the commoditization of the classic burger and chose resistance. In 2012, in a subterranean kitchen in Mayfair, we began deconstructing the archetype.
                  </p>
                  <p>
                    It took 400 iterations to perfect our Wagyu Heritage Blend. We discarded convention, treating beef maturation like fine wine and bun fermentation like artisanal sourdough. The result is not fast food—it is culinary architecture.
                  </p>
                </div>
                <div className="pt-8 flex items-center gap-6">
                   <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                     <span className="font-serif text-2xl italic text-white">M.</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-white font-bold tracking-widest text-[11px] uppercase">Elias Thorne</span>
                     <span className="text-accent font-black tracking-[0.3em] text-[9px] uppercase">Founding Architect</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Large Image Break */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.2 }}
             className="relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/5"
          >
             <img 
               src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=60&w=600&auto=format&fit=crop" 
               alt="The Kitchen"
               className="w-full h-full object-cover grayscale brightness-50"
             />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <h3 className="text-white font-serif text-3xl sm:text-5xl italic px-4 text-center">"Precision in motion."</h3>
             </div>
          </motion.div>

          {/* The System Grid */}
          <div>
            <div className="mb-16">
              <h3 className="font-serif text-4xl sm:text-5xl text-white tracking-tight mb-4">The Triad System</h3>
              <p className="text-pearl/40 max-w-xl text-lg">Three pillars support every sequence of our culinary assembly line.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: "01", title: "MATURATION", desc: "Our cuts are dry-aged for a strict 28-day cycle, creating an umami debt that demands collection upon searing." },
                { num: "02", title: "HYDRATION", desc: "A proprietary water-to-flour ratio paired with a 48-hour cold ferment yields a bun capable of structural integrity and cloud-like compression." },
                { num: "03", title: "EMULSION", desc: "Sauces are reduction-focused, bypassing synthetic thickeners in favor of slow-whipped, high-fat emulsions." }
              ].map((item) => (
                <div key={item.num} className="p-10 rounded-[2rem] bg-stone-900/30 border border-white/5 hover:bg-stone-900/50 transition-colors">
                  <span className="text-accent text-5xl font-serif italic mb-6 block">{item.num}.</span>
                  <h4 className="text-white font-bold tracking-widest text-[13px] uppercase mb-4">{item.title}</h4>
                  <p className="text-pearl/40 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 bg-accent border-t border-white/10 text-center flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=600&auto=format&fit=crop')] opacity-10 mix-blend-multiply bg-cover bg-center" />
        <div className="relative z-10 space-y-10">
          <h2 className="font-serif text-5xl sm:text-7xl text-black tracking-tighter leading-tight">Taste the <br/><span className="italic font-light">Architecture.</span></h2>
          <button className="flex items-center space-x-4 px-10 py-5 bg-black rounded-full text-[11px] tracking-[0.5em] text-white uppercase hover:bg-white hover:text-black transition-all duration-300 font-black shadow-2xl">
            <span>Reserve A Concept</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

    </div>
  );
}
