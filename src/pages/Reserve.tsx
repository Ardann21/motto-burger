import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, MapPin, Users, Clock, User, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";

const LOCATIONS = ["London - Mayfair", "New York - Tribeca", "Tokyo - Ginza", "Paris - Le Marais"];

export default function Reserve() {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get("location");
  
  const [selectedLocation, setSelectedLocation] = useState(
    locationParam && LOCATIONS.includes(locationParam) ? locationParam : LOCATIONS[0]
  );
  
  // Update if location changes in URL while already on the page
  useEffect(() => {
    if (locationParam && LOCATIONS.includes(locationParam)) {
      setSelectedLocation(locationParam);
    }
  }, [locationParam]);

  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && date && time) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-pearl pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
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
              Secure Your Place
            </span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter">
            Reserve an <br />
            <span className="italic text-accent">Assembly.</span>
          </h1>
          <p className="text-pearl/60 text-lg md:text-xl font-serif italic border-l border-accent/40 pl-6 max-w-2xl mt-8">
            Availability is strictly limited to ensure the precise execution of each module. We accept requests up to 30 days in advance.
          </p>
        </motion.div>

        {/* Reservation Form */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-obsidian border border-accent/30 p-8 md:p-16 rounded-[2rem] flex flex-col items-center text-center space-y-8 shadow-[0_0_50px_rgba(200,180,100,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-accent/20 blur-[80px] pointer-events-none" />
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, delay: 0.2 }}
                className="w-24 h-24 rounded-full border border-accent/50 flex items-center justify-center bg-accent/10 mb-4"
              >
                <CheckCircle2 className="w-12 h-12 text-accent" />
              </motion.div>
              
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tighter">Allocation Requested.</h2>
              
              <div className="space-y-4 text-pearl/60 text-lg font-serif italic max-w-xl">
                <p>
                  Thank you, {firstName}. Your request for a party of {partySize} at our {selectedLocation.split(' - ')[0]} sanctuary has been received.
                </p>
                <p>
                  We are currently reviewing our assembly schedule for {date} at {time}. An architect of our hospitality team will contact you shortly to confirm your allocation.
                </p>
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 px-8 py-4 border border-white/10 rounded-full text-[10px] tracking-[0.4em] uppercase font-black text-pearl/50 hover:text-white hover:border-white hover:bg-white/5 transition-all"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-obsidian border border-white/5 p-8 md:p-16 rounded-[2rem] space-y-12 relative overflow-hidden"
            >
              {/* Location */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40 mb-6">
                  <MapPin className="w-4 h-4 text-accent" />
                  Select Sanctuary
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LOCATIONS.map(loc => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-6 border text-left transition-all duration-500 ${
                        selectedLocation === loc 
                          ? "border-accent bg-accent/5 text-white shadow-[0_0_15px_rgba(200,180,100,0.15)]" 
                          : "border-white/5 text-pearl/40 hover:border-white/20 hover:text-white bg-black/20"
                      }`}
                    >
                      <span className="font-serif text-xl sm:text-2xl">{loc.split(' - ')[0]}</span>
                      <span className="block mt-2 text-[9px] tracking-[0.2em] uppercase text-accent/80">{loc.split(' - ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-white/5">
                {/* First Name */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40">
                    <User className="w-4 h-4 text-accent" />
                    First Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors appearance-none mt-2 placeholder:text-pearl/20"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40">
                    <User className="w-4 h-4 text-accent invisible md:visible" />
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors appearance-none mt-2 placeholder:text-pearl/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8 border-t border-white/5">
                {/* Party Size */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40">
                    <Users className="w-4 h-4 text-accent" />
                    Party Size
                  </label>
                  <div className="flex items-center gap-6 pt-2">
                    <button 
                      type="button"
                      onClick={() => setPartySize(Math.max(1, partySize - 1))}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
                    >-</button>
                    <span className="font-serif text-4xl text-white min-w-[2rem] text-center">{partySize}</span>
                    <button 
                      type="button"
                      onClick={() => setPartySize(Math.min(8, partySize + 1))}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
                    >+</button>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40">
                    <Calendar className="w-4 h-4 text-accent" />
                    Date
                  </label>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors appearance-none mt-2"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>

                {/* Time */}
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-black uppercase text-pearl/40">
                    <Clock className="w-4 h-4 text-accent" />
                    Time
                  </label>
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-serif text-2xl focus:outline-none focus:border-accent transition-colors appearance-none mt-2"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex justify-end">
                <button 
                  type="submit"
                  disabled={!firstName || !lastName || !date || !time}
                  className="group flex flex-1 sm:flex-none items-center justify-center gap-6 px-12 py-6 bg-accent text-black font-black uppercase text-[11px] tracking-[0.5em] hover:bg-white hover:shadow-[0_0_30px_rgba(200,180,100,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 rounded-full"
                >
                  Request Allocation
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
