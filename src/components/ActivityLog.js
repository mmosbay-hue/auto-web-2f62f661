import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LogIcon = ({ type }) => {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-green-500" />,
    error: <AlertTriangle className="w-4 h-4 text-red-500" />,
    info: <Info className="w-4 h-4 text-blue-500" />,
  };
  return <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">{icons[type] || icons.info}</div>;
};

const LogItem = ({ time, message, type }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className="flex items-start gap-3"
  >
    <LogIcon type={type} />
    <div>
      <p className="text-sm text-slate-300">{message}</p>
      <p className="text-xs text-slate-500 mt-0.5">{time}</p>
    </div>
  </motion.div>
);

export default function ActivityLog({ logs }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50 h-full"
    >
      <h2 className="text-lg font-bold text-white mb-4">Nhật ký hoạt động</h2>
      <div className="space-y-4 h-[300px] overflow-y-auto pr-2">
        <AnimatePresence>
          {logs.length > 0 ? (
            logs.map(log => <LogItem key={log.id} {...log} />)
          ) : (
            <p className="text-slate-500 text-center py-10">Không có hoạt động nào.</p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
