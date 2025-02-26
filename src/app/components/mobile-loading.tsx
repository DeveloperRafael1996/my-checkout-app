"use client";

import { motion } from "framer-motion";

export default function MobileLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-3">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-10 h-10 bg-primary-foreground rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
