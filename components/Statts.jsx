"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const isPercent = typeof end === "string" && end.includes("%");
    const isPlus = typeof end === "string" && end.includes("+");

    const cleanNumber = parseFloat(end);
    if (isNaN(cleanNumber)) {
      setCount(end); // If it's not a number, just show as is
      return;
    }

    const increment = cleanNumber / (duration * 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= cleanNumber) {
        clearInterval(timer);
        setCount(end); // Put back with % or +
      } else {
        setCount(
          `${Math.floor(start)}${isPlus ? "+" : ""}${isPercent ? "%" : ""}`
        );
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count}</>;
};

const Statts = ({
  statts = [],
  containerClass = "bg-[#143c2d]",
  numberClass = "text-3xl md:text-4xl font-bold",
  labelClass = "text-sm md:text-base text-[#71C0BB]",
}) => {
  if (!Array.isArray(statts) || statts.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-8 ${containerClass}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {statts.map((stat, idx) => (
          <div key={idx} className="text-white">
            <div className={`${numberClass} mb-2`}>
              <CountUp end={stat.number} />
            </div>
            <div className={labelClass}>{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Statts;
