"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.08], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.08], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.08], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.08], [-400, 0]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[110vh] md:h-[300vh] py-4 md:py-40 -mt-44 md:mt-0 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Background Section Imagery */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none -z-10">
         <img 
           src="https://images.unsplash.com/photo-1541544741938-0af808b7143b?q=40&w=400&auto=format&fit=crop" 
           className="w-full h-full object-cover opacity-[0.02] grayscale"
           alt="Background texture"
           referrerPolicy="no-referrer"
           loading="lazy"
           decoding="async"
         />
      </div>
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-10 md:space-x-20 mb-4 sm:mb-10 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-4 sm:mb-10 md:mb-20 space-x-4 sm:space-x-10 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-10 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-4 md:py-24 px-4 w-full left-0 top-0">
      <div className="inline-flex items-center space-x-6 mb-12">
         <div className="w-12 h-[1px] bg-accent" />
         <span className="text-accent text-[11px] tracking-[0.6em] font-black uppercase">Technical Mastery</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tighter leading-[0.85] mb-12">
        The <span className="italic text-accent">Anatomy</span> <br /> of our modules.
      </h1>
      <p className="max-w-2xl text-base md:text-xl text-pearl/40 italic leading-relaxed">
        "Every assembly we create is a dialogue between tradition and precision, where raw elements find their highest form."
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  key?: string;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-48 sm:h-64 md:h-96 w-[15rem] sm:w-[20rem] md:w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl h-full w-full rounded-2xl overflow-hidden border border-white/5"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 grayscale group-hover/product:grayscale-0 transition-all duration-1000 group-hover/product:scale-110"
          alt={product.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-black pointer-events-none transition-opacity"></div>
      <h2 className="absolute bottom-6 left-6 opacity-0 group-hover/product:opacity-100 text-white font-serif text-2xl italic transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};
