import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./LanguageContext";
import bananaLeaf from "@/assets/banana-leaf.jpg";

const ReceptionSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={bananaLeaf} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p className="text-xs tracking-[0.4em] uppercase text-terracotta font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("celebration")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("reception")}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: t("date"), value: "June 3, 2026", sub: t("saturday") },
            { label: t("time"), value: "6:00 PM", sub: t("onwards") },
            { label: t("venue"), value: t("receptionVenue"), sub: t("receptionAddress") },
          ].map((item, i) => (
            <motion.div key={item.label}
              className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-8"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}>
              <p className="text-xs tracking-[0.3em] uppercase text-sage font-body mb-3">{item.label}</p>
              <p className="font-heading text-2xl text-foreground mb-1">{item.value}</p>
              <p className="text-sm text-muted-foreground font-body">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.p className="mt-16 text-muted-foreground font-body font-light text-sm leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
          {t("receptionInvite")}
        </motion.p>
      </div>
    </section>
  );
};

export default ReceptionSection;
