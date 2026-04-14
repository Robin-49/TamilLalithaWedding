import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import contactBg from "@/assets/contact-bg.png";

const contacts = [
  {
    familyKey: "brideFamily",
    nameKey: "brideFatherName",
    phone: "+91 98765 43210",
    email: "[EMAIL_ADDRESS]",
  },
  {
    familyKey: "groomFamily",
    nameKey: "groomFatherName",
    phone: "+91 98765 43211",
    email: "[EMAIL_ADDRESS]",
  },
];

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={contactBg} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-md scale-105" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p className="text-xs tracking-[0.4em] uppercase text-terracotta font-body mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("getInTouch")}
        </motion.p>
        <motion.h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
          {t("contact")}
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {contacts.map((c, i) => (
            <motion.div key={c.nameKey}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}>
              <p className="text-xs tracking-[0.3em] uppercase text-sage font-body mb-3">{t(c.familyKey)}</p>
              <p className="font-heading text-2xl text-foreground mb-4">{t(c.nameKey)}</p>
              <div className="space-y-2">
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <Phone className="w-4 h-4" /> {c.phone}
                </a>
                <a href={`mailto:${c.email}`} className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  <Mail className="w-4 h-4" /> {c.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
