import React, { useState, useMemo } from 'react';
import { BrainCircuit, Search, User, MessageSquare, ShoppingCart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const memoryIcons = {
  preference: <User className="w-5 h-5 text-purple-400" />,
  customer_data: <ShoppingCart className="w-5 h-5 text-green-400" />,
  interaction: <MessageSquare className="w-5 h-5 text-blue-400" />,
};

const MemoryItem = ({ memory }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-slate-800/50 p-4 rounded-lg flex items-start gap-4"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
      {memoryIcons[memory.type] || <BrainCircuit className="w-5 h-5 text-slate-400" />}
    </div>
    <div className="flex-1">
      <p className="text-slate-200 text-sm">{memory.content}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 flex-wrap">
          {memory.tags.map(tag => (
            <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500 flex-shrink-0">{memory.timestamp}</span>
      </div>
    </div>
  </motion.div>
);

export default function MemoryAI({ memories }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMemories = useMemo(() => {
    if (!searchTerm) return memories;
    return memories.filter(memory =>
      memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [memories, searchTerm]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg shadow-slate-950/50">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Trí Nhớ Của AI</h3>
            <p className="text-sm text-slate-400">Nơi AI lưu trữ thông tin đã học để đưa ra quyết định thông minh hơn.</p>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm trong trí nhớ của AI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>
      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {filteredMemories.length > 0 ? (
            filteredMemories.map(memory => <MemoryItem key={memory.id} memory={memory} />)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-slate-500"
            >
              <p>Không tìm thấy kết quả nào.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
