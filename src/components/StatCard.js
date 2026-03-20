import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-5 hover:border-blue-500/50 transition-colors duration-300 shadow-lg shadow-slate-950/50"
    >
      <div className="bg-slate-800 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}
