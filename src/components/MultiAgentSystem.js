import React from 'react';
import { motion } from 'framer-motion';
import { UserCog, Megaphone, DollarSign, Headset, BrainCircuit } from 'lucide-react';

const agents = [
  {
    name: 'Agent Marketing',
    role: 'Phân tích thị trường, tạo chiến dịch quảng cáo và tìm kiếm khách hàng tiềm năng.',
    icon: <Megaphone className="w-8 h-8 text-pink-400" />,
    color: 'pink'
  },
  {
    name: 'Agent Bán Hàng',
    role: 'Tương tác với khách hàng, gửi báo giá và chốt đơn hàng tự động.',
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    color: 'green'
  },
  {
    name: 'Agent CSKH',
    role: 'Hỗ trợ khách hàng, giải đáp thắc mắc và xử lý các yêu cầu sau bán hàng.',
    icon: <Headset className="w-8 h-8 text-cyan-400" />,
    color: 'cyan'
  },
];

const AgentCard = ({ agent, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + index * 0.2,
        duration: 0.5
      }
    }
  };

  const colorClasses = {
    pink: 'border-pink-500/30 hover:border-pink-500/50',
    green: 'border-green-500/30 hover:border-green-500/50',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/50',
  };
  
  const iconBgClasses = {
    pink: 'border-pink-500/30',
    green: 'border-green-500/30',
    cyan: 'border-cyan-500/30',
  }

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center flex flex-col items-center shadow-lg transition-colors duration-300 ${colorClasses[agent.color]}`}
    >
      <div className={`mb-4 p-4 bg-slate-900 rounded-full border-2 ${iconBgClasses[agent.color]}`}>
        {agent.icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-2">{agent.name}</h4>
      <p className="text-sm text-slate-400">{agent.role}</p>
    </motion.div>
  );
};

export default function MultiAgentSystem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:p-8 shadow-lg shadow-slate-950/50"
    >
      <div className="flex items-center mb-6">
        <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
          <UserCog className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Hệ Thống Multi-Agent (Crew AI)</h3>
          <p className="text-slate-400">Các nhân viên AI chuyên biệt phối hợp để thực hiện các nhiệm vụ phức tạp.</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 mt-8">
        {/* Central CEO Agent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 flex flex-col items-center text-center bg-slate-800 border-2 border-blue-500 rounded-full w-48 h-48 justify-center p-4 shadow-2xl shadow-blue-600/20"
        >
          <BrainCircuit className="w-12 h-12 text-blue-400 mb-2" />
          <h4 className="font-bold text-white">CEO Agent</h4>
          <p className="text-xs text-slate-400">Điều phối & Ra quyết định</p>
        </motion.div>

        {/* Connecting line */}
        <div className="w-px h-8 bg-slate-700"></div>

        {/* Specialist Agents */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
