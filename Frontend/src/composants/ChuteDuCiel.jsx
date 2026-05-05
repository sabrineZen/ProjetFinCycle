import { motion } from "framer-motion";

const ChuteDuCiel = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -80, rotateX: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{
      duration: 0.7,
      delay,
      type: "spring",
      stiffness: 60,
      damping: 16,
    }}
    style={{ transformPerspective: 1000 }}
  >
    {children}
  </motion.div>
);

export default ChuteDuCiel;