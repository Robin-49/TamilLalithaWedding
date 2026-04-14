import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./LanguageContext";
import templeImage from "@/assets/temple-silhouette.jpg";

const WeddingSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img src={templeImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/75" />
      </motion.div>

      <motion.div className="relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ scale }}>
        <motion.p className="text-xs tracking-[0.4em] uppercase text-terracotta font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("sacredUnion")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("muhurtam")}
        </motion.h2>
        <motion.div className="w-16 h-px bg-sage/40 mx-auto mb-12"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} />

        <motion.div className="bg-card/40 backdrop-blur-sm border border-sage/20 rounded-xl p-10 md:p-14"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-sage font-body mb-2">{t("date")}</p>
              <p className="font-heading text-3xl text-foreground">June 4, 2026</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{t("sunday")}</p>
            </div>
            <div className="w-12 h-px bg-terracotta/30 mx-auto" />
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-sage font-body mb-2">{t("muhurtamTime")}</p>
              <p className="font-heading text-3xl text-foreground">9:15 AM — 10:30 AM</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{t("shubhMuhurat")}</p>
            </div>
            <div className="w-12 h-px bg-terracotta/30 mx-auto" />
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-sage font-body mb-2">{t("venue")}</p>
              <p className="font-heading text-3xl text-foreground">{t("weddingVenue")}</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{t("weddingAddress")}</p>
            </div>
          </div>
        </motion.div>

        <motion.p className="mt-12 text-muted-foreground font-body font-light text-sm leading-relaxed max-w-md mx-auto italic"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
          {t("weddingQuote")}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default WeddingSection;
