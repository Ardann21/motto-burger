import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const NAV_ITEMS = [
  { label: "THE MENU", path: "/menu" },
  { label: "OUR ORIGIN", path: "/origin" },
  { label: "JOURNAL", path: "/journal" },
  { label: "LOCATIONS", path: "/locations" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 md:h-24 flex items-center justify-between px-6 md:px-16">
        <div className="flex-1 pointer-events-auto">
          <Link to="/" className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-pearl uppercase hover:text-accent transition-colors">
            MOTTO
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex pointer-events-auto items-center bg-obsidian/40 backdrop-blur-2xl border border-pearl/10 rounded-full px-12 py-4 space-x-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path.startsWith('/#') && location.hash === item.path.replace('/', ''));
            const isHash = item.path.startsWith('/#');
            if (isHash) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  className={`text-[11px] tracking-[0.3em] font-bold transition-all hover:scale-110 active:scale-95 ${isActive ? 'text-accent' : 'text-pearl/60 hover:text-pearl'}`}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`text-[11px] tracking-[0.3em] font-bold transition-all hover:scale-110 active:scale-95 ${isActive ? 'text-accent' : 'text-pearl/60 hover:text-pearl'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex-1 flex justify-end items-center space-x-4 pointer-events-auto">
          <Link to="/reserve" className="hidden sm:block px-8 py-3 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold bg-accent text-pearl hover:scale-105 transition-all shadow-sm">
            RESERVE
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 bg-obsidian/40 backdrop-blur-2xl border border-pearl/10 rounded-full text-pearl hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-obsidian flex flex-col items-center justify-center lg:hidden transition-all duration-300 ease-out will-change-[opacity,visibility] ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center space-y-10">
          {NAV_ITEMS.map((item, i) => {
            const isHash = item.path.startsWith('/#');
            const style = {
              transitionDelay: isMenuOpen ? `${i * 60}ms` : '0ms',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: isMenuOpen ? 1 : 0,
            };
            if (isHash) {
              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif text-white hover:text-accent italic transition-all duration-300"
                  style={style}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-serif text-white hover:text-accent italic block transition-all duration-300"
                style={style}
              >
                {item.label}
              </Link>
            );
          })}
          <Link 
            to="/reserve"
            onClick={() => setIsMenuOpen(false)}
            className="mt-10 px-12 py-4 rounded-full text-[12px] tracking-[0.4em] uppercase font-black bg-accent text-pearl block transition-all duration-300"
            style={{
              transitionDelay: isMenuOpen ? `${NAV_ITEMS.length * 60}ms` : '0ms',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: isMenuOpen ? 1 : 0,
            }}
          >
            RESERVE
          </Link>
        </div>
      </div>
    </>
  );
}
