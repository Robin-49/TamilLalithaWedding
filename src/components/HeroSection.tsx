import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./LanguageContext";
import heroImage from "@/assets/hero-murugan.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-blush/40 to-background/90 backdrop-blur-[1px]" />
      </motion.div>

      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <motion.svg viewBox="0 0 400 400" className="w-[500px] h-[500px] opacity-[0.06] text-blush"
          initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.ellipse key={angle} cx="200" cy="200" rx="150" ry="40" fill="none" stroke="currentColor" strokeWidth="0.5"
              transform={`rotate(${angle} 200 200)`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: angle / 180, ease: "easeInOut" }} />
          ))}
        </motion.svg>
      </div>

      <motion.div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center" style={{ y: textY, opacity }}>
        <motion.p className="text-sm tracking-[0.3em] uppercase text-foreground font-light mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          {t("togetherWithFamilies")}
        </motion.p>
        <motion.h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-foreground leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6 }}>
          {t("groomName")}
        </motion.h1>
        <motion.div className="my-4 text-primary text-3xl font-heading italic"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1 }}>
          &
        </motion.div>
        <motion.h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-foreground leading-none tracking-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.9 }}>
          {t("brideName")}
        </motion.h1>
        <motion.p className="mt-8 text-base tracking-[0.2em] text-foreground font-body font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}>
          {t("heroDate")}
        </motion.p>

        <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          <motion.div className="w-px h-16 bg-blush/30 mx-auto"
            animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          <p className="text-xs tracking-[0.2em] text-foreground/80 mt-2 uppercase">{t("scroll")}</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
