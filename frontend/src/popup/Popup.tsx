import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function Popup({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        w-[420px]
        max-h-[600px]
        overflow-y-auto
        scrollbar-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-5
        shadow-2xl
      "
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="text-sky-300" size={20} />

        <h1 className="text-lg font-semibold tracking-wide text-slate-100">
          Prism
        </h1>
      </div>

      {children}
    </motion.div>
  );
}
