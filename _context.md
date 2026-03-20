### Design Tokens
- **Primary Color**: Slate (`bg-slate-900`, `bg-slate-800`)
- **Accent Color**: Blue (`blue-600`, `blue-700`)
- **Font**: Inter (sans-serif)
- **Border Radius**: `rounded-xl`
- **Shadow Style**: `shadow-lg`, `shadow-slate-950/50`

### Components
- `src/App.js`: Main layout, manages global state for tasks, logs, and memories.
- `src/components/Sidebar.js`: Navigation sidebar with a new "Trí Nhớ AI" link.
- `src/components/Header.js`: Top header with title.
- `src/components/StatCard.js`: Displays a key metric.
- `src/components/CommandInput.js`: Input form to send commands to the AI. Props: `onSendCommand`.
- `src/components/TaskList.js`: Lists AI tasks with status filtering. Props: `tasks`.
- `src/components/TaskItem.js`: Displays a single AI task with status and progress. Props: `task`.
- `src/components/ActivityLog.js`: Shows a feed of AI actions. Props: `logs`.
- `src/components/TaskScheduler.js`: Manages and displays scheduled tasks that run 24/24.
- `src/components/PythonScripts.js`: Displays example Python automation scripts.
- `src/components/WorkflowAutomation.js`: Visualizes an N8N/Antigravity automation workflow.
- `src/components/MemoryAI.js`: Displays the AI's learned knowledge base (memories). Props: `memories`.
- `src/components/MultiAgentSystem.js`: Visualizes the Crew AI architecture with a central CEO agent and specialist agents.

### Data Shapes
- `task`: `{ id, name, status: 'pending'|'running'|'done', progress: number }`
- `log`: `{ id, time: string, message: string, type: 'info'|'success'|'error' }`
- `stat`: `{ title, value, icon }`
- `memory`: `{ id, content, timestamp, type: 'preference'|'customer_data'|'interaction', tags: string[] }`
- `agent`: `{ name, role, icon, color }`
- `scheduledTask`: `{ id, name, frequency, nextRun, enabled }`
