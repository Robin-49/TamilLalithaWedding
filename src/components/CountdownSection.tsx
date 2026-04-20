import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import templeImage from "@/assets/temple-silhouette.jpg";

const WEDDING_DATE = new Date("2026-06-04T09:15:00+05:30").getTime();

const CountdownSection = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: timeLeft.days, label: t("days") },
    { value: timeLeft.hours, label: t("hours") },
    { value: timeLeft.minutes, label: t("minutes") },
    { value: timeLeft.seconds, label: t("seconds") },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={templeImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-100" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p className="text-xs tracking-[0.4em] uppercase text-plum font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("countdown")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("theWedding")}
        </motion.h2>

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {units.map((unit, i) => (
            <motion.div key={unit.label}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}>
              <p className="font-heading text-3xl sm:text-5xl md:text-6xl text-foreground">{String(unit.value).padStart(2, "0")}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mt-2">{unit.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
