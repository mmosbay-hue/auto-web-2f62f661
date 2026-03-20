import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommandInput({ onSendCommand }) {
  const [command, setCommand] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!command.trim() || isSending) return;

    setIsSending(true);
    await onSendCommand(command);
    setCommand('');
    setIsSending(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder='Ra lệnh cho AI... ví dụ: "Tìm 50 khách hàng tiềm năng ngành du lịch trên Facebook"'
          className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-5 pr-16 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-inner shadow-slate-950/50"
          disabled={isSending}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={isSending}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
}
