import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Sakura petals */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`sakura-${i}`}
          className="absolute bg-gradient-to-br from-sakura to-blush opacity-60"
          style={{
            width: `${Math.random() * 8 + 8}px`,
            height: `${Math.random() * 10 + 12}px`,
            borderRadius: "100% 0 100% 0", // Petal shape
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20,
          }}
        />
      ))}

      {/* Gentle glow accents */}
      <motion.div
        className="absolute -left-12 top-1/4 w-32 h-64 opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--rose)) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-12 top-2/3 w-40 h-80 opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--sakura)) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

export default FloatingElements;
