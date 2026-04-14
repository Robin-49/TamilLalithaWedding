import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import jasmineImage from "@/assets/jasmine-floral.jpg";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={jasmineImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <motion.div className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <motion.div className="w-8 h-px bg-sage/40 mx-auto mb-8"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
        <p className="font-heading text-2xl sm:text-3xl text-foreground mb-4 font-light">{t("withLove")}</p>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2">{t("families")}</p>
        <p className="text-xs text-muted-foreground/60 font-body mt-12 tracking-wider">{t("footerNamesDate")}</p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
