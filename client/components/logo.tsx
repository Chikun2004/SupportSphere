"use client";

import { motion } from 'framer-motion';
import { MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="relative w-8 h-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-45"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="absolute inset-0"
        >
          <MessageSquareHeart className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
      >
        SupportSphere
      </motion.span>
    </Link>
  );
}