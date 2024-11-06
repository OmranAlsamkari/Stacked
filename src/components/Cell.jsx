import { AnimatePresence, motion } from "framer-motion";

function Cell({ top, left }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      style={{ top: `${top + 25}px`, left: `${left + 25}px` }}
      className="w-[50px] h-[50px] rounded-md border-2 absolute bg-white border-black flex justify-center items-center -translate-x-1/2 -translate-y-1/2"
    >
    </motion.div>
  );
}

export default Cell;
