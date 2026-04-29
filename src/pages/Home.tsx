/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValue, animate, useInView, useMotionValueEvent } from "motion/react";
import { Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroParallaxDemo from "../components/hero-parallax-demo";
import { TextEffect } from "../components/ui/text-effect";
const FRAME_COUNT = 121;
const FRIES_FRAME_COUNT = 192;

const SCROLL_STAGES = [
  {
    range: [0, 0.20],
    title: "THE GENESIS OF",
    subtitle: "CULINARY ART",
    description: "The slow-cooked, artisanal bun. Crafted daily.",
    button: null
  },
  {
    range: [0.24, 0.44],
    title: "WAGYU",
    subtitle: "HERITAGE BLEND",
    description: "Hand-selected wagyu beef. Dry-aged for 28 days.",
    button: "DISCOVER THE SOURCE"
  },
  {
    range: [0.48, 0.68],
    title: "SIGNATURE",
    subtitle: "BRIOCHE MASTERY",
    description: "Signature cold-fermented brioche. Laminated with grass-fed butter.",
    button: "EXPLORE THE BAKE"
  },
  {
    range: [0.72, 0.88],
    title: "INFUSED",
    subtitle: "UMAMI LAYERS",
    description: "Truffle-infused reductions and aged cheddar layers.",
    button: null
  },
  {
    range: [0.92, 1.0],
    title: "THE FINAL",
    subtitle: "ASSEMBLY",
    description: "A vertical journey of flavor. Built to be remembered.",
    button: "RESERVE YOUR SEAT"
  }
];

const FRIES_SCROLL_STAGES = [
  {
    range: [0, 0.25],
    title: "THE GOLDEN",
    subtitle: "RHYTHM",
    description: "Triple-cooked in wagyu fat for a crust that echoes. The perfect crunch.",
    button: null
  },
  {
    range: [0.30, 0.55],
    title: "SMOKED",
    subtitle: "MALDON SALT",
    description: "Finished with hand-harvested sea salt, cold-smoked over cherry wood.",
    button: null
  },
  {
    range: [0.60, 0.85],
    title: "THE ART OF",
    subtitle: "THE FRY",
    description: "Individually selected potatoes. Hand-cut to exacting architectural proportions.",
    button: null
  },
  {
    range: [0.90, 1.0],
    title: "VINTAGE",
    subtitle: "SIDES",
    description: "The definitive companion. More than a side—a statement of our culinary standard.",
    button: "EXPLORE RESERVES"
  }
];

const MENU_DATA = {
  signatures: [
    { name: "THE FOUNDATION", price: "24", note: "Signature Wagyu Blend, Bone Marrow, Truffle Aioli" },
    { name: "BLACK TRUFFLE", price: "32", note: "Winter Truffle, Aged Comté, Brioche Crumble" },
    { name: "UMAMI CRISP", price: "26", note: "Shiitake Reduction, House Relish, Pickled Shallot" },
    { name: "SMOKED RESERVE", price: "28", note: "Oak-Smoked Bacon, Maple Emulsion, Jalapeño Jam" },
    { name: "VINE & GARDEN", price: "22", note: "Heirloom Tomato, Basil Infusion, Pine Nut Cream" },
    { name: "THE GRAND MOTTO", price: "45", note: "Double Wagyu, Gold Leaf Finish, 36-Month Cheddar" }
  ],
  seasonal: [
    { name: "WINTER ASPEN", price: "29", note: "Snow-Aged Beef, Pine-Smoked Jus, Forest Fungi" },
    { name: "MIDNIGHT MARROW", price: "34", note: "Roasted Bone Marrow, Cocoa-Spiced Rub, Sourdough" },
    { name: "GLACIER ONION", price: "21", note: "Ice-Caramelized Shallots, 48-Month Gruyère, Thyme" },
    { name: "ARCTIC PEPPER", price: "27", note: "Fermented Black Pepper, Pickled Berries, Bone Fat" }
  ],
  reserves: [
    { name: "A5 PRESTIGE", price: "85", note: "Hokkaido A5 Wagyu, Osetra Caviar, 24k Gold" },
    { name: "THE DRY AGE", price: "52", note: "90-Day Dry Aged Ribeye Module, Blue Cheese Emulsion" },
    { name: "TRUFFLE KING", price: "68", note: "Whole Sliced Alba Truffle, Black Garlic, Shaved Foie" }
  ]
};

function Counter({ value, duration = 2, delay = 0, suffix = "" }: { value: number, duration?: number, delay?: number, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return value % 1 === 0 ? Math.round(latest) : latest.toFixed(1);
  });
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplay(latest.toString());
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
        delay
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, delay, count]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const friesCanvasRef = useRef<HTMLCanvasElement>(null);
  const friesImagesRef = useRef<HTMLImageElement[]>([]);
  const friesContainerRef = useRef<HTMLDivElement>(null);
  const [friesLoaded, setFriesLoaded] = useState(false);

  // Scroll tracking for frame animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: friesProgress } = useScroll({
    target: friesContainerRef,
    offset: ["start 80%", "end end"]
  });
  // Preload images — all frames load concurrently, browser manages connections
  useEffect(() => {
    // Load hamburger frames — all at once for fastest possible loading
    const hamburgerImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let hamburgerLoadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = (i + 1).toString().padStart(5, '0');
      img.src = `/hamburger/${frameNumber}.jpg`;
      img.onload = () => {
        hamburgerImages[i] = img;
        hamburgerLoadedCount++;
        // Show first frame immediately
        if (i === 0) {
          imagesRef.current = hamburgerImages;
          renderFrame(0);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        hamburgerLoadedCount++;
      };
    }

    imagesRef.current = hamburgerImages;

    // Load fries frames — all at once
    const friesImages: HTMLImageElement[] = new Array(FRIES_FRAME_COUNT);

    for (let i = 0; i < FRIES_FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = (i + 1).toString().padStart(5, '0');
      img.src = `/fries/${frameNumber}.jpg`;
      img.onload = () => {
        friesImages[i] = img;
        if (i === 0) {
          friesImagesRef.current = friesImages;
          setFriesLoaded(true);
        }
      };
    }

    friesImagesRef.current = friesImages;
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (canvas && ctx && img) {
      const cropAmount = 0.02;
      const targetWidth = img.width;
      const targetHeight = img.height * (1 - cropAmount);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height * (1 - cropAmount),
        0, 0, canvas.width, canvas.height
      );
    }
  };

  const renderFriesFrame = (index: number) => {
    const canvas = friesCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = friesImagesRef.current[index];

    if (canvas && ctx && img) {
      const targetWidth = img.width;
      const targetHeight = img.height;

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  };

  // Update canvas on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (imagesLoaded) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(Math.min(latest * 1.5, 1) * FRAME_COUNT)
        );
        // If target frame isn't loaded yet, find nearest loaded frame
        if (imagesRef.current[frameIndex]) {
          renderFrame(frameIndex);
        } else {
          // Search backwards for nearest loaded frame
          for (let j = frameIndex - 1; j >= 0; j--) {
            if (imagesRef.current[j]) {
              renderFrame(j);
              break;
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [imagesLoaded, scrollYProgress]);

  useEffect(() => {
    const unsubscribe = friesProgress.on("change", (latest) => {
      if (friesLoaded) {
        const frameIndex = Math.min(
          FRIES_FRAME_COUNT - 1,
          Math.floor(latest * FRIES_FRAME_COUNT)
        );
        if (friesImagesRef.current[frameIndex]) {
          renderFriesFrame(frameIndex);
        } else {
          for (let j = frameIndex - 1; j >= 0; j--) {
            if (friesImagesRef.current[j]) {
              renderFriesFrame(j);
              break;
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, [friesLoaded, friesProgress]);

  // Handle load initialization
  useEffect(() => {
    if (imagesLoaded && imagesRef.current[0]) {
      renderFrame(0);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (friesLoaded && friesImagesRef.current[0]) {
      renderFriesFrame(0);
    }
  }, [friesLoaded]);

  return (
    <div className="relative min-h-screen">
      {/* Main Assembly Zone */}
      <div ref={containerRef} className="action-zone">
        <div className="canvas-container -top-32 md:top-0">
          {/* Headline Overlays - Dynamic Stages */}
          <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none z-10">
            {SCROLL_STAGES.map((stage, index) => {
              const startFadeIn = stage.range[0];
              const endFadeOut = stage.range[1];
              const duration = endFadeOut - startFadeIn;

              const buffer = Math.min(0.04, duration * 0.4);
              const peakStart = startFadeIn + buffer;
              const peakEnd = endFadeOut - buffer;

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [startFadeIn, peakStart, peakEnd, endFadeOut],
                      [0, 1, 1, 0]
                    ),
                    y: useTransform(
                      scrollYProgress,
                      [startFadeIn, endFadeOut],
                      [60, -60]
                    ),
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center max-w-5xl px-6 md:px-8 text-center"
                >
                  <h2 className="font-serif text-[clamp(2.2rem,10vw,5rem)] text-white mb-6 tracking-tight leading-[0.95] md:leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center">
                    {stage.title} <br className="hidden md:block" />
                    <span className="italic font-normal text-pearl">{stage.subtitle}</span>
                  </h2>
                  <div className="w-12 h-[1px] bg-accent/80 mb-6" />
                  <p className="text-[11px] md:text-[15px] tracking-[0.35em] md:tracking-[0.45em] uppercase font-bold text-white mb-12 max-w-2xl leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] text-center">
                    {stage.description}
                  </p>

                  {stage.button && (
                    <motion.button
                      className="pointer-events-auto flex items-center space-x-4 md:space-x-6 px-10 md:px-14 py-4 md:py-5 border border-pearl/30 rounded-full text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase hover:bg-accent hover:border-accent hover:text-pearl transition-all duration-700 font-black bg-obsidian/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    >
                      <span className="drop-shadow-md">{stage.button}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-obsidian">
              <div className="w-12 h-12 border-t-2 border-pearl/20 rounded-full animate-spin" />
            </div>
          )}

          <div className="relative w-full md:max-w-[85%] h-screen flex items-center justify-center overflow-hidden -translate-y-[10%] md:translate-y-0">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain scale-[2.0] translate-x-[10%] md:translate-x-0 md:scale-100 object-center origin-center"
              style={{ filter: "brightness(0.9) contrast(1.1)" }}
            />
            {/* Seamless edge mask */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_85%,rgba(0,0,0,1)_100%)] md:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,1)_100%)]" />
              <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-96 bg-linear-to-t from-black/70 via-black/40 md:from-black/80 md:via-black/60 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black via-black/40 to-transparent" />
            </div>
          </div>

          {/* Scroll assemble call to action */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
            className="absolute bottom-[38%] md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          >
            <span className="text-[9px] tracking-[0.8em] uppercase font-black text-pearl/80 drop-shadow-2xl text-center ml-[0.8em]">
              SCROLL TO ASSEMBLE
            </span>
          </motion.div>
        </div>
      </div>

      {/* Hero Parallax Section replacing The Craft */}
      <section id="the-craft" className="relative z-10 bg-black">
        <HeroParallaxDemo />
      </section>

      {/* The Collective: Values & Heritage Bento Grid */}
      <section className="relative z-10 bg-black py-16 md:py-48 px-6 overflow-hidden mt-4 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-24">
            <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tighter mb-8 max-w-3xl">
              The Collective <br />
              <span className="italic text-accent">Expressed through Action.</span>
            </h2>
            <div className="w-24 h-[1px] bg-accent/40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-2 p-12 rounded-[2.5rem] bg-stone-900/40 border border-white/5 flex flex-col justify-between min-h-[450px] relative overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1541544741938-0af808b7143b?q=60&w=600&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale group-hover:opacity-10 transition-opacity duration-1000 -z-10"
                alt="Architecture detail"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="max-w-md">
                <span className="text-accent text-[10px] tracking-[0.5em] font-black uppercase mb-6 block">01 / TEMPO</span>
                <h3 className="text-3xl font-serif text-white mb-6">Slow Evolution, Rapid Precision.</h3>
                <p className="text-pearl/40 leading-relaxed tracking-wide">
                  Our kitchen operates on two timelines. The 48-hour fermentation of our grains against the 90-second sear of our wagyu modules. Precision is the bridge between these speeds.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-12">
                {["FERMENTATION", "MATURATION", "ASSEMBLY"].map(tag => (
                  <span key={tag} className="px-4 md:px-5 py-2 rounded-full border border-white/10 text-[9px] font-black tracking-[0.2em] text-pearl/30">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-1 p-12 rounded-[2.5rem] bg-accent/5 border border-accent/20 flex flex-col items-center justify-center text-center min-h-[450px]"
            >
              <div className="w-20 h-20 rounded-full border border-accent flex items-center justify-center mb-8">
                <div className="w-10 h-10 bg-accent rounded-full animate-pulse" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 italic">The Secret Module</h3>
              <p className="text-[10px] tracking-[0.4em] font-black text-accent uppercase mb-8">Proprietary Reductions</p>
              <p className="text-pearl/40 text-[13px] leading-relaxed italic">
                "Some things are not meant to be spoken, only tasted. Our signature reduction is a proprietary architectural bond."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-1 h-[400px] rounded-[2.5rem] overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=60&w=500&auto=format&fit=crop"
                alt="Precision Preparation"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-2 p-12 rounded-[2.5rem] bg-linear-to-br from-white/[0.03] to-transparent border border-white/5 flex flex-col justify-center"
            >
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-accent font-serif text-3xl mb-2">
                    <Counter value={98} suffix="%" />
                  </h4>
                  <p className="text-[9px] tracking-[0.4em] font-black text-pearl/30 uppercase">Repeat Assembly Rate</p>
                </div>
                <div>
                  <h4 className="text-accent font-serif text-3xl mb-2">
                    <Counter value={121} />
                  </h4>
                  <p className="text-[9px] tracking-[0.4em] font-black text-pearl/30 uppercase">Visual Frames Per Creation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* The Global Lineage: Locations */}
      <section id="locations" className="relative z-10 bg-black py-16 md:py-48 px-6 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-baseline mb-32 gap-12">
            <h2 className="font-serif text-6xl md:text-8xl text-white tracking-tighter leading-none">
              Global <br /> <span className="italic text-accent">Presence.</span>
            </h2>
            <p className="text-pearl/40 text-lg max-w-sm italic">
              Seated in the world's most visceral cities, Motto is an anchor for those who seek the exceptional.
            </p>
          </div>

          <div className="space-y-12">
            {[
              { id: "London - Mayfair", city: "LONDON", zone: "MAYFAIR", desc: "A subterranean sanctuary within the capital's heart.", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=400&auto=format&fit=crop" },
              { id: "New York - Tribeca", city: "NEW YORK", zone: "TRIBECA", desc: "Industrial mastery meets high-concept dining.", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=60&w=400&auto=format&fit=crop" },
              { id: "Tokyo - Ginza", city: "TOKYO", zone: "GINZA", desc: "Minimalist purity where flavor finds its quietest peak.", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=60&w=400&auto=format&fit=crop" }
            ].map((loc, i) => (
              <motion.div
                key={loc.city}
                onClick={() => navigate(`/reserve?location=${encodeURIComponent(loc.id)}`)}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative h-48 md:h-64 flex items-center border-b border-white/5 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-700 -z-10" />
                <div className="w-[120px] md:w-[200px] h-full relative overflow-hidden hidden sm:block">
                  <img src={loc.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-20 group-hover:opacity-100" alt={loc.city} referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 flex justify-between items-center px-0 sm:px-12">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                      <TextEffect per="char" preset="fade">{loc.city}</TextEffect>
                    </h3>
                    <p className="text-accent text-[10px] md:text-[11px] tracking-[0.5em] font-black uppercase">{loc.zone}</p>
                  </div>
                  <p className="hidden md:block text-pearl/40 text-sm max-w-[240px] italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {loc.desc}
                  </p>
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Origin: Editorial Redesign */}
      <section id="our-origin" className="relative z-10 bg-black py-16 md:py-72 px-6 overflow-hidden">
        {/* Massive background phantom year */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] font-serif text-[40vw] font-bold leading-none select-none pointer-events-none">
          2012
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            {/* Image Cluster: Editorial style */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="relative group"
              >
                {/* Main image with depth shadow */}
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=60&w=600&auto=format&fit=crop"
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-[3s]"
                    alt="Origins"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Detail Module */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="absolute -bottom-10 -right-6 md:-right-20 w-48 md:w-72 aspect-square rounded-[2.5rem] overflow-hidden border border-accent/20 shadow-2xl p-px bg-accent/20"
                >
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=60&w=400&auto=format&fit=crop"
                      className="w-full h-full object-cover grayscale brightness-50"
                      alt="Texture detail"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-accent/5 backdrop-blur-md">
                      <span className="text-accent text-[9px] tracking-[0.5em] font-black uppercase mb-4">Focus 01</span>
                      <p className="text-white font-serif text-lg italic leading-tight">"The Architecture of Crisp."</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Textual Narrative */}
            <div className="lg:col-span-6 space-y-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-6 mb-12">
                  <div className="w-12 h-[1px] bg-accent" />
                  <span className="text-accent text-[11px] tracking-[0.6em] font-black uppercase">Technical Heritage</span>
                </div>

                <h2 className="font-serif text-6xl md:text-8xl text-white tracking-tighter leading-[0.85] mb-12">
                  Born in the <br /> <span className="italic">Shadows of Mayfair.</span>
                </h2>

                <div className="space-y-8 max-w-xl">
                  <p className="text-pearl/50 text-lg md:text-xl font-medium leading-relaxed italic">
                    "Motto was never intended for the many—it was built for those who understand the architectural value of patience."
                  </p>
                  <p className="text-pearl/30 text-sm leading-relaxed tracking-wide">
                    What began as a subterranean assembly for culinary architects grew into a global statement. Every module we create today is rooted in the precision of our original 2012 workshop.
                  </p>
                </div>
              </motion.div>

              {/* Stats with Bento vibe */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-16">
                <div className="space-y-4">
                  <h4 className="text-white font-serif text-4xl">
                    <Counter value={14} />
                  </h4>
                  <p className="text-[10px] tracking-widest text-pearl/30 font-black uppercase leading-loose">
                    CORE ELEMENTS <br /> IN EVERY ASSEMBLY
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-serif text-4xl">
                    <Counter value={4.2} suffix="K" />
                  </h4>
                  <p className="text-[10px] tracking-widest text-pearl/30 font-black uppercase leading-loose">
                    TECHNICAL REFINEMENTS <br /> PER CREATION
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal: Technical Grid */}
      <section id="journal" className="relative z-10 bg-black py-16 md:py-48 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tighter mb-4">Latest <span className="italic text-accent">Entries.</span></h2>
              <p className="text-[10px] tracking-[0.5em] font-black text-pearl/20 uppercase">ARCHIVE 2026.04</p>
            </div>
            <button className="text-[10px] tracking-[0.4em] font-black text-white hover:text-accent transition-colors hidden md:block">
              EXPLORE ALL MODULES —
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { category: "INSIGHT", title: "The Geometry of Flavor: Vertical vs Horizontal Palates", date: "APR 24", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=60&w=400&auto=format&fit=crop" },
              { category: "CRAFT", title: "Sourcing the Unattainable: Our 2026 Wagyu Reserve", date: "APR 20", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=60&w=400&auto=format&fit=crop" },
              { category: "BEYOND", title: "Motto Audio: The Slow-Cook Sonic Landscape", date: "APR 15", img: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?q=60&w=400&auto=format&fit=crop" }
            ].map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2rem] bg-stone-900/40 border border-white/5 h-[450px] hover:border-accent/30 transition-all duration-500"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-accent text-[9px] tracking-[0.4em] font-black px-4 py-2 border border-accent/20 rounded-full bg-black/60 backdrop-blur-sm">{post.category}</span>
                      <span className="text-pearl/20 text-[9px] font-black font-mono">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-[10px] tracking-[0.4em] font-black text-pearl/40 group-hover:text-white transition-colors">
                    READ MODULE
                    <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Section: The Architecture of Crisp (Fries Scroll Animation) */}
      <div id="the-fries" ref={friesContainerRef} className="action-zone !h-[250vh] -mt-20 md:mt-0">
        <div className="canvas-container">
          <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none z-10">
            {FRIES_SCROLL_STAGES.map((stage, index) => {
              const startFadeIn = stage.range[0];
              const endFadeOut = stage.range[1];
              const duration = endFadeOut - startFadeIn;
              const buffer = Math.min(0.04, duration * 0.4);
              const peakStart = startFadeIn + buffer;
              const peakEnd = endFadeOut - buffer;

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity: useTransform(
                      friesProgress,
                      index === FRIES_SCROLL_STAGES.length - 1
                        ? [startFadeIn, peakStart, 1]
                        : [startFadeIn, peakStart, peakEnd, endFadeOut],
                      index === FRIES_SCROLL_STAGES.length - 1
                        ? [0, 1, 1]
                        : [0, 1, 1, 0]
                    ),
                    y: useTransform(
                      friesProgress,
                      index === FRIES_SCROLL_STAGES.length - 1
                        ? [startFadeIn, peakStart]
                        : [startFadeIn, endFadeOut],
                      index === FRIES_SCROLL_STAGES.length - 1
                        ? [60, 0]
                        : [60, -60]
                    ),
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center max-w-5xl px-6 md:px-8 text-center"
                >
                  <h2 className="font-serif text-[clamp(2.2rem,10vw,5rem)] text-white mb-6 tracking-tight leading-[0.95] md:leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-center">
                    {stage.title} <br className="hidden md:block" />
                    <span className="italic font-normal text-pearl">{stage.subtitle}</span>
                  </h2>
                  <div className="w-12 h-[1px] bg-accent/80 mb-6" />
                  <p className="text-[11px] md:text-[15px] tracking-[0.35em] md:tracking-[0.45em] uppercase font-bold text-white mb-12 max-w-2xl leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] text-center">
                    {stage.description}
                  </p>

                  {stage.button && (
                    <motion.button
                      onClick={() => navigate('/reserve')}
                      className="pointer-events-auto flex items-center space-x-4 md:space-x-6 px-10 md:px-14 py-4 md:py-5 border border-pearl/30 rounded-full text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase hover:bg-accent hover:border-accent hover:text-pearl transition-all duration-700 font-black bg-obsidian/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    >
                      <span className="drop-shadow-md">{stage.button}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {!friesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-obsidian">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin" />
                <span className="text-[10px] tracking-[0.4em] text-pearl/40 font-bold uppercase">Calibrating Crisp</span>
              </div>
            </div>
          )}

          <div className="relative mt-8 md:mt-20 w-full md:max-w-[85%] h-screen md:h-[90vh] flex items-center justify-center overflow-hidden">
            <canvas
              ref={friesCanvasRef}
              className="w-full h-full object-contain scale-[2.0] translate-x-[15%] md:translate-x-0 md:scale-100 origin-center"
              style={{ filter: "brightness(0.9) contrast(1.05)" }}
            />
            {/* Seamless edge mask */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_85%,rgba(0,0,0,1)_100%)] md:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,1)_100%)]" />
              <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-96 bg-linear-to-t from-black/70 via-black/40 md:from-black/80 md:via-black/60 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black via-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
