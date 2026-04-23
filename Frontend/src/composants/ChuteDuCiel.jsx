import { motion } from "framer-motion";

// Dans ton fichier ChuteDuCiel.jsx
const ChuteDuCiel = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: -120, rotateX: 25, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
    
    // CHANGE CECI : once: false permet de rejouer l'animation à chaque passage
    viewport={{ once: false, amount: 0.2 }} 
    
    transition={{
      duration: 0.8,
      delay: delay,
      type: "spring",
      stiffness: 50,
      damping: 15
    }}
  >
    {children}
  </motion.div>
);
export default ChuteDuCiel;