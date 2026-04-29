import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

const FEATURED_ENTRY = {
  id: 0,
  date: "April 28, 2026",
  category: "PROCESS",
  title: "The Architecture of Crisp",
  preview: "An exploration into the meticulous thermodynamics and structural integrity required to achieve the perfect golden hue and resonant crunch in our signature fries.",
  content: "The creation of our signature fries is not a culinary endeavor; it is an exercise in structural engineering and thermal dynamics. It begins with the selection of a specific potato varietal, chosen not merely for taste, but for its precise starch-to-moisture ratio. This internal chemistry is the foundation upon which crispness is built.\n\nThe process involves a rigorous multi-stage preparation. First, a meticulous cut ensures uniform surface area exposed to heat. This is followed by a prolonged soaking period in a precisely calibrated brine—water, salt, and time acting in concert to extract excess surface starch, a critical step to prevent premature browning and ensure a clean, golden hue.\n\nThe cooking itself is a two-phased approach. An initial lower-temperature blanching partially cooks the interior, creating a fluffy matrix. The potatoes are then dramatically cooled, halting the cooking process and gelatinizing the starches. This structural transformation prepares the exterior for the final act.\n\nThe second fry is the crucible. Plunged into oil at a specific, higher temperature, the exterior rapidly dehydrates. The residual moisture within forcefully seeks escape, pushing against the newly formed, hardened outer layer. It is this violent, microscopic battle between escaping steam and hardening starch that creates the resonant, glass-like crunch that defines our fries.",
  img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=60&w=600&auto=format&fit=crop"
};

const JOURNAL_ENTRIES = [
  {
    id: 1,
    date: "April 20, 2026",
    category: "CRAFT",
    title: "Sourcing the Obsession",
    preview: "It began with a fourteen-hour drive into the heartland. We were searching for a specific varietal of potato, one that balances starch and moisture perfectly.",
    content: "Our journey for the perfect ingredient took us far from the neon glow of the city, deep into the agricultural heartland. We weren't looking for just any potato; we were hunting for a specific chromosomal configuration, a varietal that possessed the exact ratio of starch to moisture required by our exacting standards.\n\nFourteen hours on unnamed county roads led us to a modest farm with soil that felt different—richer, more unyielding. Here, the earth itself seemed to understand our obsession. We inspected the crop, feeling the density, noting the subtle variations in the skin. We were looking for the raw material that could survive our brutal thermal processes and emerge transformed.\n\nThis isn't merely sourcing; it is an alliance with the earth. Every batch we receive is a continuation of that fourteen-hour drive, a testament to the belief that true quality cannot be ordered from a catalog; it must be hunted, verified, and understood at its very source.",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    date: "April 15, 2026",
    category: "CULTURE",
    title: "Midnight Synchronicity",
    preview: "The kitchen at 2 AM operates on a different frequency. A chaotic ballet of steel, heat, and precision where every second dictates the final outcome.",
    content: "When the city sleeps, our kitchen breathes. At 2 AM, the ambient noise of the dining room fades, replaced by the rhythmic hum of ventilation and the sharp hiss of hitting the grill. This is when the real work happens.\n\nIt's a chaotic ballet of steel, heat, and precision. Every movement is calculated; every second dictates the final outcome. The crew communicates in a shorthand of nods, sharp commands, and the clattering of pans. There is a synchronicity that only emerges in the profound quiet of the early hours, a collective focus that binds the team together.\n\nIn these moments, we are not just preparing food; we are rehearsing a performance. The midnight shift is the crucible where our standards are forged, ensuring that when the doors open, the execution is flawless, uncompromising, and perfect.",
    img: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "April 02, 2026",
    category: "DESIGN",
    title: "Brutalism in the Dining Space",
    preview: "Why concrete and untreated steel? We believe the environment should strip away distraction, leaving only the essential relationship between you and the meal.",
    content: "Our aesthetic philosophy is rooted in brutalism. We eschew the superfluous, the decorative, and the comfortable in favor of raw, unyielding materials: concrete, untreated steel, obsidian glass. These are not merely design choices; they are a manifesto.\n\nWe believe the environment should challenge, not coddle. By stripping away distraction, we force a confrontation with the essential. The starkness of the space directs the focus entirely upon the plate. The dining experience becomes a focal point, unadulterated by ambient noise or visual clutter.\n\nThis is an architecture of intent. Every structural element, every shadow cast by the harsh, controlled lighting, is designed to elevate the act of consuming our carefully engineered modules. It is an environment that demands your attention, mirroring the absolute focus we pour into our craft.",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    date: "March 28, 2026",
    category: "PROCESS",
    title: "The Science of Brining",
    preview: "Water, salt, time. The elemental forces that transform a humble ingredient into a vessel of concentrated flavor before it even touches the fire.",
    content: "Before heat is ever introduced, a silent, powerful transformation occurs. It relies on three elemental forces: water, salt, and time. This is the science of brining, a foundational tenet of our methodology.\n\nThe process is an exercise in osmotic manipulation. By submerging our ingredients in a precisely calibrated saline solution, we initiate a fundamental cellular change. The salt penetrates the cellular structure, denaturing proteins and allowing the meat to retain significantly more moisture during the brutal searing process.\n\nBut it is more than just moisture retention; it is flavor impregnation. The brine carries subtle aromatics deep into the tissue, ensuring that every layer is seasoned, not just the surface. This invisible alchemy, occurring in the cold stillness of our preparation area, is the unseen architecture of the final, resonant flavor profile.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    date: "March 15, 2026",
    category: "CRAFT",
    title: "The Perfect Sear",
    preview: "Achieving the Maillard reaction is not a suggestion; it's a requirement. We explore the thermodynamics of creating our signature crust.",
    content: "The Maillard reaction is the cornerstone of our culinary ideology. It is the complex chemical process where amino acids and reducing sugars transform under intense heat, creating the deeply savory, complex flavors and the dark, caramelized crust that defines our signature modules.\n\nAchieving this is not a matter of suggestion; it is a rigid requirement. We employ heavy-gauge steel surfaces maintained at precisely calibrated, punishing temperatures. When the protein meets the steel, the reaction must be instantaneous and violent. There is no room for hesitation; there is only the immediate transfer of thermal energy.\n\nWe monitor the sound, the aroma, the subtle shifting of color. The perfect sear is a tightly controlled burn, pulling back only milliseconds before destruction. It is this razor-thin margin between perfection and ruin that we navigate with every order, demanding total focus and unwavering precision.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    date: "March 02, 2026",
    category: "CULTURE",
    title: "The Anatomy of a Service",
    preview: "Breaking down a three-hour service into its microscopic components. How we maintain absolute precision under immense pressure.",
    content: "A standard three-hour service is not a continuous block of time; it is thousands of microscopic, critical decisions executed under immense pressure. It is an anatomy of controlled chaos, structured by rigorous protocols and an unspoken hierarchy based entirely on competence.\n\nWe break down the service into pulses. Each order is a sequence that must be initiated, monitored, and concluded with absolute precision. The communication is staccato, stripped of pleasantries, focused entirely on the immediate requirement. ‘Fire module three.’ ‘Seared.’ ‘Plating.’\n\nMaintaining this level of intensity requires a specific psychological makeup. We do not hire for experience; we hire for resilience and the capacity to operate within a rigid framework while under fire. The service is the ultimate test of our preparation, a daily crucible where our theories are proven or exposed on the line.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=60&w=500&auto=format&fit=crop"
  }
];

export default function Journal() {
  const [selectedEntry, setSelectedEntry] = useState<typeof FEATURED_ENTRY | null>(null);

  return (
    <div className="min-h-screen bg-black text-pearl pt-32 pb-24">
      <div className="max-w-[90%] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 space-y-6 relative"
        >
          {/* subtle orange glow behind title */}
          <div className="absolute top-0 -left-12 w-64 h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent text-[10px] tracking-[0.5em] font-black uppercase">
              The Archive
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter">
            Our Journal.
          </h1>
          <p className="text-pearl/60 text-lg md:text-xl max-w-2xl font-serif italic border-l border-accent/40 pl-6">
            Chronicles of our obsession. The process, the people, and the philosophy behind everything we create.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          onClick={() => setSelectedEntry(FEATURED_ENTRY)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative group cursor-pointer mb-24 overflow-hidden border border-pearl/10 aspect-[16/9] md:aspect-[21/9]"
        >
          <img 
            src={FEATURED_ENTRY.img} 
            alt={FEATURED_ENTRY.title}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:brightness-75 group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
            <div className="flex gap-4 items-center mb-6">
              <span className="text-accent text-[10px] tracking-[0.4em] font-black px-4 py-2 border border-accent/20 rounded-full bg-black/60 backdrop-blur-sm">
                {FEATURED_ENTRY.category}
              </span>
              <span className="text-pearl/50 text-xs tracking-widest uppercase">{FEATURED_ENTRY.date}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tighter mb-6 group-hover:text-accent transition-colors duration-500 max-w-4xl leading-none">
              {FEATURED_ENTRY.title}
            </h2>
            <p className="text-pearl/80 text-lg md:text-2xl font-serif max-w-3xl line-clamp-2 md:line-clamp-none">
              {FEATURED_ENTRY.preview}
            </p>
          </div>
        </motion.div>
        
        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-pearl/10">
                <img 
                  src={entry.img} 
                  alt={entry.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 group-hover:brightness-90 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent text-[10px] tracking-[0.4em] font-black uppercase">
                    {entry.category}
                  </span>
                  <span className="text-pearl/40 text-xs tracking-widest uppercase">
                    {entry.date}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl text-white tracking-tighter mb-4 group-hover:text-accent transition-colors duration-300">
                  {entry.title}
                </h3>
                
                <p className="text-pearl/60 text-base md:text-lg font-serif mb-8 line-clamp-3">
                  {entry.preview}
                </p>

                <div className="mt-auto flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-pearl/50 group-hover:text-pearl transition-colors">
                  READ ENTRY
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedEntry(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-obsidian border border-pearl/10 flex flex-col max-h-full overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedEntry(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md text-white hover:text-accent hover:bg-black/80 transition-all rounded-full border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto w-full h-full scrollbar-none">
                <div className="relative w-full aspect-video sm:aspect-[21/9]">
                  <img 
                    src={selectedEntry.img} 
                    alt={selectedEntry.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/40 to-transparent" />
                </div>
                
                <div className="px-8 sm:px-16 pt-8 pb-24">
                  <div className="flex gap-4 items-center mb-8">
                    <span className="text-accent text-[10px] tracking-[0.4em] font-black px-4 py-2 border border-accent/20 rounded-full bg-black/40">
                      {selectedEntry.category}
                    </span>
                    <span className="text-pearl/40 text-xs tracking-widest uppercase">{selectedEntry.date}</span>
                  </div>
                  
                  <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tighter mb-12 leading-none">
                    {selectedEntry.title}
                  </h2>
                  
                  <div className="flex flex-col space-y-6 text-pearl/70 font-serif text-lg sm:text-xl leading-relaxed">
                    {selectedEntry.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
