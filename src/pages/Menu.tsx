import { motion, useInView } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { TextEffect } from "../components/ui/text-effect";

const MENU_DATA = [
  {
    id: "signatures",
    label: "VOL. 01: SIGNATURES",
    title: "Signatures",
    items: [
      { name: "THE FOUNDATION", price: "24", note: "Signature Wagyu Blend, Bone Marrow, Truffle Aioli" },
      { name: "BLACK TRUFFLE", price: "32", note: "Winter Truffle, Aged Comté, Brioche Crumble" },
      { name: "UMAMI CRISP", price: "26", note: "Shiitake Reduction, House Relish, Pickled Shallot" },
      { name: "SMOKED RESERVE", price: "28", note: "Oak-Smoked Bacon, Maple Emulsion, Jalapeño Jam" },
      { name: "VINE & GARDEN", price: "22", note: "Heirloom Tomato, Basil Infusion, Pine Nut Cream" },
      { name: "THE GRAND MOTTO", price: "45", note: "Double Wagyu, Gold Leaf Finish, 36-Month Cheddar" }
    ]
  },
  {
    id: "seasonal",
    label: "VOL. 02: SEASONAL",
    title: "Seasonal",
    items: [
      { name: "WINTER ASPEN", price: "29", note: "Snow-Aged Beef, Pine-Smoked Jus, Forest Fungi" },
      { name: "MIDNIGHT MARROW", price: "34", note: "Roasted Bone Marrow, Cocoa-Spiced Rub, Sourdough" },
      { name: "GLACIER ONION", price: "21", note: "Ice-Caramelized Shallots, 48-Month Gruyère, Thyme" },
      { name: "ARCTIC PEPPER", price: "27", note: "Fermented Black Pepper, Pickled Berries, Bone Fat" }
    ]
  },
  {
    id: "reserves",
    label: "VOL. 03: RESERVES",
    title: "Reserves",
    items: [
      { name: "A5 PRESTIGE", price: "85", note: "Hokkaido A5 Wagyu, Osetra Caviar, 24k Gold" },
      { name: "THE DRY AGE", price: "52", note: "90-Day Dry Aged Ribeye Module, Blue Cheese Emulsion" },
      { name: "TRUFFLE KING", price: "68", note: "Whole Sliced Alba Truffle, Black Garlic, Shaved Foie" }
    ]
  }
];

const SectionWithObserver = ({ category, setActiveCategory, children }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      setActiveCategory(category.id);
    }
  }, [isInView, category.id, setActiveCategory]);

  return (
    <section ref={ref} id={category.id} className="scroll-mt-12">
      {children}
    </section>
  );
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("signatures");
  
  return (
    <div className="min-h-screen bg-obsidian text-pearl font-sans selection:bg-accent/20">
      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Header */}
        <header className="mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[10px] tracking-[0.6em] font-black uppercase mb-4 block"
          >
            Curated Selection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-6xl md:text-8xl text-white tracking-tighter"
          >
            The Archive.
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
                  <nav className="lg:col-span-3 sticky top-20 lg:top-40 z-50 h-fit bg-obsidian/95 backdrop-blur-md py-6 -mx-6 px-6 lg:bg-transparent lg:py-0 lg:mx-0 lg:px-0 border-y border-orange-500/30 lg:border-none">
            <div className="space-y-4">
              {MENU_DATA.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-4 text-left w-full transition-all duration-300 ${
                    activeCategory === category.id ? "text-accent drop-shadow-[0_0_10px_rgba(200,180,100,0.6)]" : "text-pearl/40 hover:text-pearl/80"
                  }`}
                >
                  <span className={`h-px transition-all ${activeCategory === category.id ? "w-12 bg-accent" : "w-6 bg-white/20"}`} />
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* Menu Sections */}
          <div className="lg:col-span-9 space-y-32">
            {MENU_DATA.map((category) => (
              <SectionWithObserver key={category.id} category={category} setActiveCategory={setActiveCategory}>
                <h2 className="text-white/20 font-serif text-4xl italic mb-16">{category.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {category.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group"
                    >
                      <div className="flex justify-between items-baseline mb-3">
                        <h4 className="font-serif text-xl text-white group-hover:text-accent transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-mono text-accent/80 text-sm">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-pearl/40 uppercase tracking-[0.2em] font-bold">
                        {item.note}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </SectionWithObserver>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
