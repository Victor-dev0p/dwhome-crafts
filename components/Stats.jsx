"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Stats({ stats }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [showSuffix, setShowSuffix] = useState(Array(stats.length).fill(false));

  useEffect(() => {
    if (inView) {
      stats.forEach((_, index) => {
        const delay = (index * 0.4 + 2) * 1000; // match number duration + delay
        setTimeout(() => {
          setShowSuffix(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }, delay);
      });
    }
  }, [inView, stats]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-2xl p-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => {
          const numericValue = parseInt(stat.number);
          const suffix = stat.number.replace(/[0-9]/g, "");

          return (
            <motion.div
              key={index}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.4,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-800 mb-2 flex justify-center items-center">
                {inView && (
                  <>
                    <CountUp
                      start={0}
                      end={numericValue}
                      duration={2 + index * 0.5}
                      easingFn={(t, b, c, d) => {
                        t /= d;
                        t--;
                        return c * (t * t * t + 1) + b;
                      }}
                    />
                    {showSuffix[index] && (
                      <motion.span
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="ml-1"
                      >
                        {suffix}
                      </motion.span>
                    )}
                  </>
                )}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
