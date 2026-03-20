import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import CommandInput from './components/CommandInput';
import TaskList from './components/TaskList';
import ActivityLog from './components/ActivityLog';
import PythonScripts from './components/PythonScripts';
import WorkflowAutomation from './components/WorkflowAutomation';
import MemoryAI from './components/MemoryAI';
import MultiAgentSystem from './components/MultiAgentSystem';
import TaskScheduler from './components/TaskScheduler';
import { Bot, ListChecks, CheckCircle, Clock } from 'lucide-react';
import { sendCommandToAI } from './utils/api';

// Initial data
const initialTasks = [
  { id: 1, name: 'Đăng 5 bài viết lên nhóm Facebook "Du Lịch Việt Nam"', status: 'done', progress: 100 },
  { id: 2, name: 'Gửi email marketing cho 500 khách hàng tiềm năng', status: 'running', progress: 65 },
  { id: 3, name: 'Phân tích dữ liệu bán hàng tháng 5', status: 'running', progress: 30 },
  { id: 4, name: 'Tạo báo cáo hiệu suất quảng cáo Google Ads', status: 'pending', progress: 0 },
  { id: 5, name: 'Trả lời 20 bình luận trên fanpage', status: 'done', progress: 100 },
];

const initialLogs = [
  { id: 1, time: '2 phút trước', message: 'Hoàn thành tác vụ: Đăng 5 bài viết.', type: 'success' },
  { id: 2, time: '5 phút trước', message: 'Bắt đầu tác vụ: Gửi email marketing.', type: 'info' },
  { id: 3, time: '10 phút trước', message: 'Lỗi kết nối với API Facebook.', type: 'error' },
  { id: 4, time: '12 phút trước', message: 'Bắt đầu tác vụ: Phân tích dữ liệu bán hàng.', type: 'info' },
  { id: 5, time: '15 phút trước', message: 'Hệ thống AI đã khởi động.', type: 'success' },
];

const initialMemories = [
  { id: 1, content: "Khách hàng 'Anh Tuấn' (tuan@gmail.com) thường xuyên hỏi về tour du lịch Đà Lạt.", timestamp: 'Học được 3 ngày trước', type: 'preference', tags: ['Sở thích', 'Khách hàng tiềm năng'] },
  { id: 2, content: "Tương tác gần nhất với 'Chị Lan' là về việc hoàn vé máy bay, cần theo dõi thêm.", timestamp: 'Học được 1 ngày trước', type: 'interaction', tags: ['CSKH', 'Cần xử lý'] },
  { id: 3, content: "Nhóm khách hàng từ 25-35 tuổi quan tâm nhiều nhất đến các tour du lịch mạo hiểm.", timestamp: 'Học được 1 tuần trước', type: 'preference', tags: ['Phân tích', 'Marketing'] },
  { id: 4, content: "Đã gửi báo giá tour Phú Quốc cho 'công ty ABC' qua email marketing@abc.com.", timestamp: 'Học được 2 giờ trước', type: 'customer_data', tags: ['Báo giá', 'Doanh nghiệp'] },
  { id: 5, content: "Chiến dịch quảng cáo Facebook cho tour 'Khám phá Tây Bắc' có tỷ lệ chuyển đổi cao nhất vào cuối tuần.", timestamp: 'Học được 2 tuần trước', type: 'interaction', tags: ['Hiệu suất', 'Quảng cáo'] },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [logs, setLogs] = useState(initialLogs);
  const [memories, setMemories] = useState(initialMemories);
  const [stats, setStats] = useState([
    { title: 'Tổng số tác vụ', value: '0', icon: <ListChecks className="w-6 h-6 text-slate-400" /> },
    { title: 'Hoàn thành', value: '0', icon: <CheckCircle className="w-6 h-6 text-slate-400" /> },
    { title: 'Đang chờ', value: '0', icon: <Clock className="w-6 h-6 text-slate-400" /> },
    { title: 'Trạng thái AI', value: 'Online', icon: <Bot className="w-6 h-6 text-green-500" /> },
  ]);

  useEffect(() => {
    // Update stats whenever tasks change
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    setStats(prevStats => [
      { ...prevStats[0], value: total.toString() },
      { ...prevStats[1], value: done.toString() },
      { ...prevStats[2], value: pending.toString() },
      prevStats[3]
    ]);

    // Simulate task progress
    const interval = setInterval(() => {
      setTasks(currentTasks => 
        currentTasks.map(task => {
          if (task.status === 'running' && task.progress < 100) {
            const newProgress = Math.min(task.progress + Math.floor(Math.random() * 5) + 1, 100);
            if (newProgress === 100) {
              setLogs(prevLogs => [{ id: `log-${Date.now()}`, time: 'Vừa xong', message: `Hoàn thành tác vụ: ${task.name}`, type: 'success' }, ...prevLogs]);
              return { ...task, progress: 100, status: 'done' };
            }
            return { ...task, progress: newProgress };
          }
          return task;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [tasks]);

  const handleSendCommand = async (command) => {
    const optimisticLog = { 
      id: `log-opt-${Date.now()}`, 
      time: 'Đang gửi...',
      message: `Đang gửi lệnh tới AI: "${command}"`,
      type: 'info' 
    };
    setLogs(prevLogs => [optimisticLog, ...prevLogs]);

    const response = await sendCommandToAI(command);
    
    let newLogs;
    if (response.success) {
      setTasks(prevTasks => [response.data.newTask, ...prevTasks]);
      newLogs = [response.data.newLog];
    } else {
      const errorMessage = response.error === "OpenAI API key is not configured."
        ? "Lỗi: Chưa cấu hình OpenAI API key trong src/utils/api.js."
        : `Gửi lệnh thất bại. Vui lòng thử lại. (${response.error || 'Lỗi không xác định'})`;

      const errorLog = {
        id: `log-err-${Date.now()}`,
        time: 'Vừa xong',
        message: errorMessage,
        type: 'error'
      };
      newLogs = [errorLog];
    }

    setLogs(prevLogs => [...newLogs, ...prevLogs.filter(l => l.id !== optimisticLog.id)]);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}
          </div>

          <CommandInput onSendCommand={handleSendCommand} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <TaskList tasks={tasks} />
            </div>
            <div>
              <ActivityLog logs={logs} />
            </div>
          </div>

          <TaskScheduler />

          <div className="space-y-8">
            <MultiAgentSystem />
            <MemoryAI memories={memories} />
            <WorkflowAutomation />
            <PythonScripts />
          </div>

        </div>
      </main>
    </div>
  );
}
