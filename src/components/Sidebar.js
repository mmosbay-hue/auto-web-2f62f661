import React, { useState } from 'react';
import { Bot, LayoutDashboard, ListTodo, History, Settings, ChevronLeft, ChevronRight, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ icon, text, active, expanded }) => (
  <li className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}>
    {icon}
    <AnimatePresence>
      {expanded && (
        <motion.span 
          initial={{ opacity: 0, width: 0, x: -10 }}
          animate={{ opacity: 1, width: 'auto', x: 0 }}
          exit={{ opacity: 0, width: 0, x: -10 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="ml-4 font-medium whitespace-nowrap">
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  </li>
);

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.aside 
      animate={{ width: isExpanded ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-slate-900 border-r border-slate-800 flex flex-col h-full relative"
    >
      <div className="flex items-center justify-between p-4 h-[77px] border-b border-slate-800">
        <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <Bot className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white whitespace-nowrap">CEO Agent</span>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="absolute -right-4 top-20 z-10 bg-slate-700 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      <nav className="flex-1 px-3 py-4">
        <ul>
          <NavItem icon={<LayoutDashboard className="w-5 h-5" />} text="Bảng điều khiển" active={true} expanded={isExpanded} />
          <NavItem icon={<ListTodo className="w-5 h-5" />} text="Quản lý tác vụ" expanded={isExpanded} />
          <NavItem icon={<BrainCircuit className="w-5 h-5" />} text="Trí Nhớ AI" expanded={isExpanded} />
          <NavItem icon={<History className="w-5 h-5" />} text="Lịch sử hoạt động" expanded={isExpanded} />
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-slate-800">
        <ul>
          <NavItem icon={<Settings className="w-5 h-5" />} text="Cài đặt" expanded={isExpanded} />
        </ul>
      </div>
    </motion.aside>
  );
}
