import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import kolamImage from "@/assets/kolam-pattern.jpg";

const MapSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={kolamImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.p className="text-xs tracking-[0.4em] uppercase text-plum font-body mb-4 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("findUs")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-16 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("venueMap")}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="p-8 text-center border-b border-border/50">
              <p className="font-heading text-2xl text-foreground mb-1">{t("weddingVenue")}</p>
              <p className="text-sm text-muted-foreground font-body">{t("weddingAddress")}</p>
              <a 
                href="https://maps.app.goo.gl/DEPyvmmqpm2FdqoY7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs tracking-[0.2em] font-body text-plum hover:text-plum/80 uppercase transition-colors"
              >
                {t("findUs")} →
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.358245842!2d79.702!3d12.818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c3858c7e0001%3A0xe56b9c9f6a7d519b!2sUma%20Murugan%20Thirumana%20Maaligai!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
              className="w-full h-[450px] border-0"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Venue location" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
