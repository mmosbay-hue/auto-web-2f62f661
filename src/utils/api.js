// QUAN TRỌNG: Thay thế 'YOUR_OPENAI_API_KEY_HERE' bằng API key OpenAI của bạn.
// Trong một ứng dụng thực tế, key này KHÔNG BAO GIỜ được lộ ở code frontend.
// Nó nên được lưu trữ an toàn trên server backend và được gọi thông qua một API.
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendCommandToAI = async (command) => {
  console.log(`Sending command to OpenAI: "${command}"`);

  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
    console.error("OpenAI API key is not set. Please add your key in src/utils/api.js");
    return {
      success: false,
      error: "OpenAI API key is not configured.",
    };
  }

  const systemPrompt = `Bạn là một trợ lý AI có nhiệm vụ nhận lệnh của người dùng và chuyển đổi chúng thành một tên tác vụ ngắn gọn, có thể hành động để đưa vào danh sách việc cần làm. Tên tác vụ phải bằng tiếng Việt. Không thêm bất kỳ văn bản, giải thích hay dấu ngoặc kép nào. Chỉ trả về tên tác vụ.

Ví dụ 1:
Người dùng: "Tìm kiếm 10 khách hàng tiềm năng trong ngành du lịch trên facebook"
AI: "Tìm 10 khách hàng tiềm năng ngành du lịch trên Facebook"

Ví dụ 2:
Người dùng: "đăng bài lên fanpage sbay"
AI: "Đăng bài lên fanpage Sbay"

Ví dụ 3:
Người dùng: "phân tích doanh thu tháng trước và tạo báo cáo"
AI: "Phân tích doanh thu tháng trước và tạo báo cáo"`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: command }
        ],
        temperature: 0.5,
        max_tokens: 60,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const taskName = data.choices[0].message.content.trim().replace(/^"|"$/g, ''); // Remove quotes if any

    const timestamp = new Date();
    const newTaskId = `task-${timestamp.getTime()}`;
    const newLogId = `log-${timestamp.getTime()}`;

    const apiResponse = {
      success: true,
      data: {
        newTask: { 
          id: newTaskId, 
          name: taskName, 
          status: 'pending', 
          progress: 0 
        },
        newLog: { 
          id: newLogId, 
          time: 'Vừa xong', 
          message: `Đã nhận lệnh mới: "${command}" -> Tạo tác vụ: "${taskName}"`, 
          type: 'info' 
        },
      },
    };
    console.log('Received and processed OpenAI response:', apiResponse);
    return apiResponse;

  } catch (error) {
    console.error('Failed to send command to AI:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
