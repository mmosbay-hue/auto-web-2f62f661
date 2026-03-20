import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Loader, MoreVertical } from 'lucide-react';

const TaskStatusIcon = ({ status }) => {
  const iconMap = {
    done: <CheckCircle className="w-5 h-5 text-green-400" />,
    running: <Loader className="w-5 h-5 text-blue-400 animate-spin" />,
    pending: <Clock className="w-5 h-5 text-yellow-400" />,
  };
  return iconMap[status] || null;
};

const ProgressBar = ({ progress, status }) => {
  const colorMap = {
    done: 'bg-green-500',
    running: 'bg-blue-500',
    pending: 'bg-slate-600',
  };

  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`h-2 rounded-full ${colorMap[status]}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default function TaskItem({ task }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 flex items-center gap-4 transition-all hover:bg-slate-800 hover:border-slate-600"
    >
      <div className="flex-shrink-0">
        <TaskStatusIcon status={task.status} />
      </div>
      <div className="flex-grow">
        <p className="font-medium text-slate-200 truncate">{task.name}</p>
        <div className="flex items-center gap-3 mt-2">
          <ProgressBar progress={task.progress} status={task.status} />
          <span className="text-xs font-semibold text-slate-400 w-10 text-right">{task.progress}%</span>
        </div>
      </div>
      <button className="flex-shrink-0 p-2 text-slate-500 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
