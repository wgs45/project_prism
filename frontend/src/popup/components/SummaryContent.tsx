import { motion } from "framer-motion";

interface Props {
  summary: string;
}

export function SummaryContent({ summary }: Props) {
  const lines = summary.split("\n");

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="space-y-3"
    >
      {lines.map((line, index) => (
        <motion.li
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          }}
          className="leading-relaxed text-slate-200"
        >
          {line}
        </motion.li>
      ))}
    </motion.ul>
  );
}
