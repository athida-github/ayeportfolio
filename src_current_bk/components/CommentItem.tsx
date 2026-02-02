import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CommentItemProps {
  comment: {
    id: number;
    name: string;
    message: string;
    date: string;
  };
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ----------------------------------
     Scroll progress (per comment)
  ----------------------------------- */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const indicatorHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div className="relative flex gap-6">
      {/* LEFT PROGRESS INDICATOR */}
      <div className="relative w-[3px] rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          style={{ height: indicatorHeight }}
          className="absolute top-0 w-full bg-gradient-to-b
                     from-indigo-500 to-purple-500"
        />
      </div>

      {/* COMMENT CARD */}
      <div
        ref={containerRef}
        className="flex-1 max-h-[180px] overflow-y-auto
                   rounded-2xl border border-gray-200
                   bg-white/80 backdrop-blur
                   p-6 shadow-sm
                   hover:shadow-md transition
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-900 leading-tight">
              {comment.name}
            </h4>
            <span className="block text-xs text-gray-400 mt-0.5">
              Recommendation
            </span>
          </div>

          <span className="text-xs text-gray-400 whitespace-nowrap">
            {comment.date}
          </span>
        </div>

        {/* MESSAGE */}
        <p className="text-[15px] text-gray-600 leading-relaxed">
          “{comment.message}”
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
