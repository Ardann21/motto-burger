export default function Footer() {
  return (
    <footer className="relative z-10 bg-black pt-24 md:pt-40 pb-16 md:pb-24 px-6 md:px-8 border-t border-white/5 overflow-hidden">
      {/* Subtle radial glow background to match hero/craft feel */}
      <div className="absolute inset-x-0 bottom-0 aspect-square bg-[radial-gradient(circle_at_50%_100%,rgba(212,163,115,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-12 lg:gap-20 mb-24 md:mb-40">
          {/* Brand Identity Section */}
          <div className="lg:col-span-5 space-y-10 text-center md:text-left">
            <div>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-white leading-none tracking-tighter mb-6">
                MOTTO<span className="text-accent italic font-normal ml-1">.</span>
              </h2>
              <div className="w-12 h-[1px] bg-accent/40 mx-auto md:mx-0" />
            </div>
            <p className="text-[14px] md:text-[15px] font-medium text-pearl/40 leading-relaxed max-w-[320px] tracking-wide italic mx-auto md:mx-0">
              Crafting culinary experiences that transcend the ordinary through the architecture of assembly.
            </p>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-3 space-y-12 text-center md:text-left">
            <h5 className="text-[10px] tracking-[0.5em] font-black text-accent uppercase opacity-70">RESOURCES</h5>
            <ul className="text-[11px] md:text-[12px] tracking-[0.2em] space-y-6 text-pearl/30 font-bold uppercase transition-all">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-center md:justify-start group">
                <span className="hidden md:block w-0 group-hover:w-4 h-[1px] bg-accent/60 mr-0 group-hover:mr-4 transition-all duration-500" />
                THE ASSEMBLY
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-center md:justify-start group">
                <span className="hidden md:block w-0 group-hover:w-4 h-[1px] bg-accent/60 mr-0 group-hover:mr-4 transition-all duration-500" />
                MENU ARCHIVE
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center justify-center md:justify-start group">
                <span className="hidden md:block w-0 group-hover:w-4 h-[1px] bg-accent/60 mr-0 group-hover:mr-4 transition-all duration-500" />
                LOCATIONS
              </li>
            </ul>
          </div>

          {/* Engagement Section */}
          <div className="lg:col-span-4 space-y-12 text-center lg:text-right">
            <h5 className="text-[10px] tracking-[0.5em] font-black text-accent uppercase opacity-70">JOURNAL</h5>
            <div className="space-y-8">
              <p className="text-[11px] md:text-[12px] text-pearl/40 font-bold tracking-[0.2em] uppercase leading-relaxed max-w-[280px] mx-auto lg:ml-auto italic">
                 Stay attuned to our latest culinary developments.
              </p>
              <div className="flex gap-8 justify-center lg:justify-end">
                 <span className="text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-accent transition-colors cursor-pointer border-b border-white/5 pb-2">INSTAGRAM</span>
                 <span className="text-[10px] font-black tracking-[0.4em] text-white/40 hover:text-accent transition-colors cursor-pointer border-b border-white/5 pb-2">TWITTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Lineage */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-4">
            <p className="text-[9px] tracking-[0.4em] uppercase text-pearl/20 font-black leading-loose">
              © 2026 MOTTO HOSPITALITY GROUP. <br className="md:hidden" /> ALL RIGHTS RESERVED.
            </p>
            <div className="flex justify-center md:justify-start gap-8 text-[9px] tracking-[0.3em] font-black text-pearl/10">
              <span className="hover:text-accent transition-colors cursor-pointer">PRIVACY POLICY</span>
              <span className="hover:text-accent transition-colors cursor-pointer">TERMS OF SERVICE</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(4rem,15vw,12rem)] font-bold tracking-tighter text-white/[0.02] uppercase select-none leading-none absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 pointer-events-none whitespace-nowrap">
            MOTTO CRAFT
          </h1>

          <div className="text-[10px] tracking-[0.4em] font-black text-accent/40 italic">
            ASSEMBLED BY HAND
          </div>
        </div>
      </div>
    </footer>
  );
}
