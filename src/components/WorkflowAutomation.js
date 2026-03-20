import React from 'react';
import { Webhook, Zap, BrainCircuit, Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowStep = ({ icon, title, description, isLast = false }) => (
  <div className="flex items-center w-full">
    <div className="flex flex-col items-center text-center flex-grow">
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="bg-slate-800 border border-slate-700 p-4 rounded-full mb-2 inline-block"
      >
        {icon}
      </motion.div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-xs text-slate-400 max-w-[120px]">{description}</p>
    </div>
    {!isLast && (
      <ArrowRight className="w-8 h-8 text-slate-600 mx-2 sm:mx-6 flex-shrink-0" />
    )}
  </div>
);

export default function WorkflowAutomation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Tự Động Hóa Workflow (N8N / Antigravity)</h2>
          <p className="text-slate-400">Kết nối AI với các hành động thực tế để tạo ra các luồng công việc thông minh.</p>
        </div>
      </div>

      <div className="bg-slate-950/50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-center mb-2 text-white">Ví dụ: Tự động trả lời tin nhắn Zalo</h3>
        <p className="text-slate-400 text-center mb-8">Luồng xử lý tự động khi có tin nhắn mới từ khách hàng.</p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-0"
        >
          <motion.div variants={itemVariants} className="flex-1 flex">
            <WorkflowStep 
              icon={<Webhook className="w-8 h-8 text-purple-400" />} 
              title="Zalo Webhook" 
              description="Nhận tín hiệu khi có tin nhắn mới" 
            />
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1 flex">
            <WorkflowStep 
              icon={<Zap className="w-8 h-8 text-orange-400" />} 
              title="N8N / Make" 
              description="Bắt đầu và điều phối workflow" 
            />
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1 flex">
            <WorkflowStep 
              icon={<BrainCircuit className="w-8 h-8 text-sky-400" />} 
              title="GPT Brain" 
              description="Phân tích và tạo nội dung trả lời" 
            />
          </motion.div>
          <motion.div variants={itemVariants} className="flex-1 flex">
            <WorkflowStep 
              icon={<Code className="w-8 h-8 text-green-400" />} 
              title="Python Script" 
              description="Gửi tin nhắn trả lời qua Zalo API" 
              isLast={true} 
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
