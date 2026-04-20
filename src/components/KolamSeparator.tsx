import { motion } from "framer-motion";

const KolamSeparator = () => {
  return (
    <div className="section-divider">
      <motion.svg
        width="200"
        height="40"
        viewBox="0 0 200 40"
        className="text-blush opacity-40"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.path
          d="M10 20 Q30 5 50 20 Q70 35 90 20 Q110 5 130 20 Q150 35 170 20 Q190 5 190 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <circle cx="100" cy="20" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="190" cy="20" r="2" fill="currentColor" opacity="0.3" />
      </motion.svg>
    </div>
  );
};

export default KolamSeparator;
