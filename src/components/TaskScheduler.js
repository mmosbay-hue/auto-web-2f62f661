import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

const initialScheduledTasks = [
  { id: 1, name: 'Quét tin nhắn Zalo chưa đọc', frequency: 'Mỗi 5 phút', nextRun: 'Trong 2 phút', enabled: true },
  { id: 2, name: 'Đăng bài chào buổi sáng lên Fanpage', frequency: 'Hàng ngày lúc 8:00', nextRun: 'Ngày mai lúc 8:00', enabled: true },
  { id: 3, name: 'Gửi báo cáo tổng kết ngày', frequency: 'Hàng ngày lúc 18:00', nextRun: 'Hôm nay lúc 18:00', enabled: true },
  { id: 4, name: 'Kiểm tra và trả lời bình luận Facebook', frequency: 'Mỗi 30 phút', nextRun: 'Trong 25 phút', enabled: false },
  { id: 5, name: 'Tìm kiếm khách hàng tiềm năng trên Google', frequency: 'Mỗi 4 giờ', nextRun: 'Trong 3 giờ', enabled: true },
];

const ScheduledTaskItem = ({ task, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors"
    >
      <div className="flex-1">
        <p className="font-semibold text-white">{task.name}</p>
        <div className="flex items-center text-xs text-slate-400 mt-1 space-x-4">
          <span>
            <span className="font-medium text-slate-300">Tần suất:</span> {task.frequency}
          </span>
          <span>
            <span className="font-medium text-slate-300">Chạy tiếp theo:</span> {task.nextRun}
          </span>
        </div>
      </div>
      <button onClick={() => onToggle(task.id)} className="ml-4 focus:outline-none">
        {task.enabled ? (
          <ToggleRight className="w-10 h-10 text-green-500" />
        ) : (
          <ToggleLeft className="w-10 h-10 text-slate-500" />
        )}
      </button>
    </motion.div>
  );
};

export default function TaskScheduler() {
  const [scheduledTasks, setScheduledTasks] = useState(initialScheduledTasks);

  const handleToggle = (id) => {
    setScheduledTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, enabled: !task.enabled } : task
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg shadow-slate-950/50"
    >
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center">
          <CalendarClock className="w-6 h-6 text-blue-400 mr-3" />
          <div>
            <h3 className="text-lg font-bold text-white">Lập Lịch Tác Vụ (Chạy 24/24)</h3>
            <p className="text-sm text-slate-400">Tự động hóa các công việc định kỳ để AI hoạt động không ngừng nghỉ.</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm Lịch Trình
        </motion.button>
      </div>
      <div className="p-6 space-y-4">
        {scheduledTasks.map(task => (
          <ScheduledTaskItem key={task.id} task={task} onToggle={handleToggle} />
        ))}
      </div>
    </motion.div>
  );
}
