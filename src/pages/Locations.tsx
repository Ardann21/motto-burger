import { motion } from "motion/react";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const LOCATIONS = [
  {
    id: "London - Mayfair",
    city: "LONDON",
    zone: "MAYFAIR",
    address: "14-16 Bruton Street, Berkeley Square, London W1J 6QA",
    hours: "Tues - Sat: 17:00 - 00:00\nSun - Mon: Closed",
    phone: "+44 20 7123 4567",
    desc: "A subterranean sanctuary within the capital's heart. Bare concrete and brass mirror the intensity of the kitchen. The origin of the Motto philosophy.",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: "New York - Tribeca",
    city: "NEW YORK",
    zone: "TRIBECA",
    address: "185 Franklin Street, New York, NY 10013",
    hours: "Mon - Sun: 17:00 - 01:00",
    phone: "+1 212 555 0198",
    desc: "Industrial mastery meets high-concept dining. Housed in a former printing press, this space amplifies the acoustic drama of our kitchen.",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: "Tokyo - Ginza",
    city: "TOKYO",
    zone: "GINZA",
    address: "6-chōme-9-5 Ginza, Chuo City, Tokyo 104-0061",
    hours: "Mon - Sun: 18:00 - 23:30",
    phone: "+81 3 1234 5678",
    desc: "Minimalist purity where flavor finds its quietest peak. An exercise in restraint, focusing entirely on the precision of the assembly.",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=60&w=500&auto=format&fit=crop"
  },
  {
    id: "Paris - Le Marais",
    city: "PARIS",
    zone: "LE MARAIS",
    address: "24 Rue Vieille du Temple, 75004 Paris",
    hours: "Wed - Sun: 19:00 - 00:00",
    phone: "+33 1 23 45 67 89",
    desc: "A brutalist intervention in a historic space. Our deepest exploration of temperature control and starch maturation.",
    img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=60&w=500&auto=format&fit=crop"
  }
];

export default function Locations() {
  return (
    <div className="min-h-screen bg-black text-pearl pt-32 pb-24">
      <div className="max-w-[90%] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 space-y-6 relative"
        >
          {/* subtle orange glow behind title */}
          <div className="absolute top-0 -left-12 w-64 h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent text-[10px] tracking-[0.5em] font-black uppercase">
              Our Sanctuaries
            </span>
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter leading-none">
            Global <br />
            <span className="italic text-accent">Presence.</span>
          </h1>
          <p className="text-pearl/60 text-lg md:text-xl max-w-2xl font-serif italic mt-8 border-l border-accent/40 pl-6">
            Seated in the world's most visceral cities, Motto is an anchor for those who seek the exceptional. Each space is a brutalist temple dedicated to the architecture of crisp.
          </p>
        </motion.div>

        {/* Locations List */}
        <div className="space-y-32">
          {LOCATIONS.map((loc, i) => (
            <motion.div 
              key={loc.city}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              <div className={`relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img 
                  src={loc.img} 
                  alt={`${loc.city} location`}
                  className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-90 transition-all duration-1000 scale-105 hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                  <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
                    {loc.city}
                  </h2>
                </div>
              </div>

              <div className={`flex flex-col space-y-12 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-accent text-[10px] md:text-[12px] tracking-[0.5em] font-black uppercase border border-accent/30 px-4 py-2 rounded-full inline-block mb-8">
                    {loc.zone}
                  </span>
                  
                  <p className="text-pearl/80 text-xl md:text-2xl font-serif italic leading-relaxed max-w-lg">
                    "{loc.desc}"
                  </p>
                </div>

                <div className="space-y-8 border-l border-white/10 pl-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="text-[10px] tracking-[0.3em] font-black text-pearl/40 uppercase mb-2">Address</h4>
                      <p className="text-white font-serif text-lg">{loc.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="text-[10px] tracking-[0.3em] font-black text-pearl/40 uppercase mb-2">Hours</h4>
                      <p className="text-white font-serif text-lg whitespace-pre-line">{loc.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <h4 className="text-[10px] tracking-[0.3em] font-black text-pearl/40 uppercase mb-2">Contact</h4>
                      <p className="text-white font-serif text-lg">{loc.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8">
                  <Link to={`/reserve?location=${encodeURIComponent(loc.id)}`} className="group flex items-center gap-4 text-[10px] tracking-[0.4em] font-black uppercase text-white hover:text-accent transition-colors">
                    <span>Reserve an Assembly</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
