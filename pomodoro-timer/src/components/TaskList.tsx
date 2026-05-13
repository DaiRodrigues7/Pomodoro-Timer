import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, History, Edit3, Calendar } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

interface TaskHistory {
  date: string;
  tasks: Task[];
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [taskHistory, setTaskHistory] = useState<TaskHistory[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Load tasks and history from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    const savedHistory = localStorage.getItem('pomodoro-task-history');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined
        })));
      } catch (error) {
        console.log('Failed to load tasks from localStorage');
      }
    }

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setTaskHistory(parsedHistory.map((day: any) => ({
          ...day,
          tasks: day.tasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            completedAt: task.completedAt ? new Date(task.completedAt) : undefined
          }))
        })));
      } catch (error) {
        console.log('Failed to load task history from localStorage');
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save task history when tasks are completed
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
      const today = new Date().toLocaleDateString('pt-BR');
      const existingHistory = taskHistory.find(day => day.date === today);
      
      if (existingHistory) {
        const updatedHistory = taskHistory.map(day =>
          day.date === today
            ? { ...day, tasks: completedTasks }
            : day
        );
        setTaskHistory(updatedHistory);
      } else {
        setTaskHistory([{ date: today, tasks: completedTasks }, ...taskHistory]);
      }
    }
  }, [tasks.filter(task => task.completed).length]);

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks([newTask, ...tasks]);
      setNewTaskText('');
    }
  };

  const startEditingTask = (taskId: string, currentText: string) => {
    setEditingTask(taskId);
    setEditedTaskText(currentText);
  };

  const saveEditedTask = () => {
    if (editingTask && editedTaskText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingTask
          ? { ...task, text: editedTaskText.trim() }
          : task
      ));
      setEditingTask(null);
      setEditedTaskText('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed && !task.completed) {
          updatedTask.completedAt = new Date();
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('pomodoro-task-history');
    setTaskHistory([]);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Title and History Toggle */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          className="text-2xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          📝 {showHistory ? 'Histórico' : 'Lista de Tarefas'}
        </motion.h2>
        
        <motion.button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 bg-lune-violet/20 backdrop-blur-sm rounded-2xl hover:bg-lune-violet/30 kawaii-transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <History className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-quicksand font-medium">
            {showHistory ? 'Tarefas' : 'Histórico'}
          </span>
        </motion.button>
      </div>

      {/* Content Area */}
      {showHistory ? (
        /* History View */
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20 max-h-96 overflow-y-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-700 font-quicksand flex items-center gap-2">
              <Calendar className="w-5 h-5 text-lune-violet" />
              Histórico de Tarefas
            </h3>
            <motion.button
              onClick={clearHistory}
              className="px-3 py-1 bg-lune-violet/20 hover:bg-lune-violet/30 text-lune-purple rounded-xl text-sm font-quicksand kawaii-transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Limpar Histórico
            </motion.button>
          </div>
          
          {taskHistory.length === 0 ? (
            <div className="text-center py-8 text-lune-violet">
              <div className="text-4xl mb-4">📅</div>
              <p className="text-lg font-quicksand" style={{ color: '#4A1D96' }}>
                  Nenhuma tarefa concluída ainda.
                </p>
            </div>
          ) : (
            <div className="space-y-4">
              {taskHistory.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  className="bg-white bg-opacity-50 rounded-2xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                >
                  <h4 className="font-semibold text-gray-800 font-quicksand mb-3 flex items-center gap-2">
                    📅 {new Date(day.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h4>
                  <div className="space-y-2">
                    {day.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={task.id}
                        className="flex items-center gap-3 p-2 bg-white bg-opacity-70 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: dayIndex * 0.1 + taskIndex * 0.05 }}
                      >
                        <Check className="w-4 h-4 text-lune-purple flex-shrink-0" />
                        <span className="text-gray-700 font-quicksand text-sm">
                          {task.text}
                        </span>
                        <span className="text-xs text-gray-400 font-quicksand ml-auto">
                          {task.completedAt && new Date(task.completedAt).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        /* Tasks View */
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Add Task Input */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-4 mb-6 shadow-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-white bg-opacity-70 rounded-2xl p-3 flex items-center gap-2 border border-transparent">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Adicionar nova tarefa..."
                className="flex-1 bg-transparent text-slate-700 font-quicksand focus:outline-none focus:ring-2 focus:ring-sol-orange border-none outline-none"
                autoFocus
              />
              <motion.button
                onClick={addTask}
                className="px-4 py-2 bg-sol-orange hover:bg-sol-orange/90 text-white rounded-xl font-medium font-quicksand shadow-md kawaii-transition whitespace-nowrap border-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 text-white" />
                Adicionar
              </motion.button>
            </div>
          </motion.div>

          {/* Tasks List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 kawaii-transition"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {/* Complete/Uncomplete Button */}
                    <motion.button
                      onClick={() => toggleTask(task.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center kawaii-transition ${
                        task.completed
                          ? 'bg-lune-violet hover:bg-lune-violet/90'
                          : 'bg-sol-orange hover:bg-sol-orange/90'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {task.completed ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border-2 border-sol-orange/50" />
                      )}
                    </motion.button>

                    {/* Task Text */}
                    <div className="flex-1">
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={editedTaskText}
                          onChange={(e) => setEditedTaskText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white bg-opacity-70 text-gray-700 font-quicksand focus:outline-none focus:ring-2 focus:ring-sol-orange"
                          autoFocus
                        />
                      ) : (
                        <motion.div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => startEditingTask(task.id, task.text)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center kawaii-transition ${
                              task.completed
                                ? 'bg-lune-violet hover:bg-lune-violet/90'
                                : 'bg-sol-orange hover:bg-sol-orange/90'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {task.completed ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border-2 border-sol-orange/50" />
                            )}
                          </motion.div>
                          <motion.p
                            className={`font-quicksand flex-1 ${
                              task.completed
                                ? 'text-gray-400 line-through'
                                  : 'text-gray-700'
                            }`}
                            animate={
                              task.completed
                                ? { opacity: 0.6 }
                                : { opacity: 1 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {task.text}
                          </motion.p>
                        </motion.div>
                      )}

                      {/* Edit/Delete Buttons */}
                      <div className="flex items-center gap-2">
                        {editingTask !== task.id && (
                          <motion.button
                            onClick={() => startEditingTask(task.id, task.text)}
                            className="w-6 h-6 rounded-lg bg-sol-orange/20 hover:bg-sol-orange/30 flex items-center justify-center kawaii-transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Edit3 className="w-4 h-4 text-white" />
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => deleteTask(task.id)}
                          className="w-8 h-8 rounded-full bg-lune-violet/20 hover:bg-lune-violet/40 flex items-center justify-center kawaii-transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-white/70">
                <div className="text-6xl mb-4">🌸</div>
                <p className="text-lg font-quicksand">
                  Nenhuma tarefa ainda. Adicione uma para começar!
                </p>
              </div>
            )}

            {/* Task Counter */}
            {tasks.length > 0 && (
              <motion.div
                className="mt-4 text-center text-white/80 text-sm font-quicksand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {tasks.filter(t => t.completed).length} de {tasks.length} tarefas completadas
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskList;
