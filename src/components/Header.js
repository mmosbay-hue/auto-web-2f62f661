import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="flex-shrink-0 bg-slate-950/70 backdrop-blur-sm border-b border-slate-800 px-6 lg:px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">Bảng Điều Khiển</h1>
        <p className="text-sm text-slate-400">Chào mừng trở lại, đây là trung tâm điều khiển nhân viên AI của bạn.</p>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950">
        <Plus size={20} />
        Tạo tác vụ mới
      </motion.button>
    </header>
  );
}
