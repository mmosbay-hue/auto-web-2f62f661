import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, Play, Clock, CheckCircle } from 'lucide-react';
import TaskItem from './TaskItem';

const filterOptions = [
  { id: 'all', label: 'Tất cả', icon: <ListTodo className="w-4 h-4 mr-2" /> },
  { id: 'running', label: 'Đang chạy', icon: <Play className="w-4 h-4 mr-2" /> },
  { id: 'pending', label: 'Đang chờ', icon: <Clock className="w-4 h-4 mr-2" /> },
  { id: 'done', label: 'Hoàn thành', icon: <CheckCircle className="w-4 h-4 mr-2" /> },
];

const FilterButton = ({ option, activeFilter, setFilter }) => (
  <motion.button
    onClick={() => setFilter(option.id)}
    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center
      ${activeFilter === option.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
  >
    {option.icon}
    {option.label}
    {activeFilter === option.id && (
      <motion.div
        layoutId="activeFilterHighlight"
        className="absolute inset-0 bg-blue-600/30 rounded-md -z-10"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
  </motion.button>
);

export default function TaskList({ tasks }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.status === activeFilter);
  }, [tasks, activeFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <ListTodo className="w-6 h-6 mr-3 text-blue-500" />
          Danh sách công việc AI
        </h3>
        <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-lg p-1">
          {filterOptions.map(option => (
            <FilterButton 
              key={option.id}
              option={option}
              activeFilter={activeFilter}
              setFilter={setActiveFilter}
            />
          ))}
        </div>
      </div>
      
      <div className="space-y-3 h-[300px] overflow-y-auto pr-2">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-slate-500"
            >
              <p>Không có công việc nào phù hợp.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
