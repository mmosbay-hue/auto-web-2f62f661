import React, { useState } from 'react';
import { Code, Terminal, Clock, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const scripts = [
  {
    id: 1,
    title: 'Điều khiển máy tính (PyAutoGUI)',
    description: 'Tự động click chuột và gõ phím để thực hiện các tác vụ lặp đi lặp lại trên máy tính của bạn.',
    icon: <Terminal className="w-5 h-5 text-blue-400" />,
    code: `import pyautogui
import time

# Chờ 5 giây để bạn có thời gian chuyển cửa sổ
time.sleep(5)

# Click vào tọa độ (100, 200)
pyautogui.click(100, 200)

# Gõ nội dung
pyautogui.write("Xin chào, tôi là nhân viên AI!", interval=0.1)`
  },
  {
    id: 2,
    title: 'Tự động hóa Web (Selenium)',
    description: 'Mở trình duyệt, truy cập một trang web và tự động thực hiện các hành động như đăng nhập, điền form.',
    icon: <Code className="w-5 h-5 text-green-400" />,
    code: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Khởi tạo trình duyệt Chrome
driver = webdriver.Chrome()

# Mở Facebook
driver.get("https://facebook.com")

# Chờ 5 giây
time.sleep(5)

# Đóng trình duyệt
driver.quit()`
  },
  {
    id: 3,
    title: 'Lên lịch tác vụ (Schedule)',
    description: 'Lập lịch để chạy các hàm Python vào những thời điểm cụ thể, ví dụ: mỗi 10 phút, mỗi ngày.',
    icon: <Clock className="w-5 h-5 text-yellow-400" />,
    code: `import schedule
import time

def auto_task():
    print("AI đang thực hiện công việc định kỳ...")

# Lên lịch chạy hàm auto_task mỗi 10 phút
schedule.every(10).minutes.do(auto_task)

while True:
    schedule.run_pending()
    time.sleep(1)`
  }
];

const ScriptCard = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-slate-950/50"
    >
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 p-2 rounded-lg">{script.icon}</div>
          <div>
            <h3 className="font-bold text-white">{script.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{script.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-950/50 relative group">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-slate-700 p-2 rounded-lg text-slate-300 hover:bg-slate-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <Check className="w-5 h-5 text-green-400" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <Copy className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <pre className="p-5 text-sm text-slate-300 overflow-x-auto">
          <code className="font-mono">{script.code}</code>
        </pre>
      </div>
    </motion.div>
  );
};

export default function PythonScripts() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50">
      <h2 className="text-lg font-bold text-white mb-4">Mẫu Script Tự Động Hóa Python</h2>
      <p className="text-slate-400 mb-6">Đây là những "tay chân" thực thi của nhân viên AI. Bạn có thể sử dụng các đoạn mã này làm nền tảng để xây dựng các kịch bản tự động hóa phức tạp hơn.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scripts.map(script => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>
    </div>
  );
}
