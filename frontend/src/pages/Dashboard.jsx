import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { LogOut, Plus, Search, LayoutDashboard, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';
import Analytics from '../components/Analytics';
import DashboardSkeleton from '../components/DashboardSkeleton';
import ThemeToggle from '../components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  // Filters, Sorting, and Pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, priorityFilter, sortBy]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (sortBy) params.append('sortBy', sortBy);
      params.append('page', page);
      params.append('limit', 8);
      
      const res = await axios.get(`https://task-manager-system-izqz.onrender.com/api/tasks?${params.toString()}`);
      
      if (res.data && res.data.tasks) {
        setTasks(res.data.tasks);
        setTotalPages(res.data.pages || 1);
      } else {
        setTasks(res.data || []);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching tasks', error);
      addToast("Failed to fetch tasks from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter, priorityFilter, sortBy, page]);

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (editingTask) {
        await axios.put(`https://task-manager-system-izqz.onrender.com/api/tasks/${editingTask._id}`, taskData);
        addToast("Task updated successfully!", "success");
      } else {
        await axios.post('https://task-manager-system-izqz.onrender.com/api/tasks', taskData);
        addToast("Task created successfully!", "success");
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      addToast(error.response?.data?.message || "Error saving task", "error");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await axios.delete(`https://task-manager-system-izqz.onrender.com/api/tasks/${taskToDelete._id}`);
      fetchTasks();
      addToast("Task deleted.", "info");
    } catch (error) {
      addToast("Error deleting task", "error");
    } finally {
      setTaskToDelete(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 relative overflow-hidden">
      
      {/* V3 Ambient Mesh Background (Static for Performance) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/30 dark:bg-indigo-900/40 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-300/30 dark:bg-purple-900/40 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-sky-300/30 dark:bg-sky-900/40 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="relative z-10 h-screen overflow-y-auto hide-scroll pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-6">
          
          {/* Floating Header */}
          <header className="glass-panel rounded-2xl h-16 flex items-center justify-between px-4 sm:px-6 sticky top-6 z-40 transition-all duration-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <LayoutDashboard className="text-white h-5 w-5" />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 outfit hidden sm:block">TaskFlow</h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-slate-300/50 dark:border-slate-700/50">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-sm shadow-inner">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all h-10 px-3">
                <LogOut className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline font-bold">Log out</span>
              </Button>
            </div>
          </header>

          <main className="py-10 space-y-10">
            
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white outfit drop-shadow-sm pb-1">Dashboard</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Capture your ideas. Master your workflow.</p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="rounded-xl px-8 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-xl shadow-indigo-500/30 transition-all border-none relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <Zap className="h-5 w-5 mr-2" /> Activate Task
                  </span>
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Glowing Analytics Summary */}
            <Analytics tasks={tasks} />

            {/* Glass Filter Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-panel p-4 rounded-2xl flex flex-col xl:flex-row gap-4 items-center justify-between transition-colors duration-500">
              <div className="relative w-full xl:max-w-md group/input">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-400 group-focus-within/input:text-indigo-600 transition-colors" />
                <Input 
                  placeholder="Search across all dimensions..." 
                  className="pl-12 h-12 glass-input text-slate-900 dark:text-white rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scroll items-center">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Sort By</span>
                  <select 
                    className="h-12 w-[160px] rounded-xl glass-input px-4 font-semibold text-sm text-slate-800 dark:text-slate-200 outline-none transition-all cursor-pointer hover:border-indigo-400/50"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="" className="text-black">Newest Pulse</option>
                    <option value="dueDate" className="text-black">Chronological</option>
                    <option value="priority" className="text-black">Priority Matrix</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Status</span>
                  <select 
                    className="h-12 w-[160px] rounded-xl glass-input px-4 font-semibold text-sm text-slate-800 dark:text-slate-200 outline-none transition-all cursor-pointer hover:border-indigo-400/50"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="" className="text-black">Universal</option>
                    <option value="Todo" className="text-black">Pending</option>
                    <option value="In Progress" className="text-black">Active</option>
                    <option value="Done" className="text-black">Resolved</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Yield</span>
                  <select 
                    className="h-12 w-[140px] rounded-xl glass-input px-4 font-semibold text-sm text-slate-800 dark:text-slate-200 outline-none transition-all cursor-pointer hover:border-indigo-400/50"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="" className="text-black">All Yields</option>
                    <option value="High" className="text-black">High Yield</option>
                    <option value="Med" className="text-black">Standard</option>
                    <option value="Low" className="text-black">Low Yield</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Task Grid Feed */}
            <div className="pt-2">
              {loading ? (
                <DashboardSkeleton />
              ) : tasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32 glass-panel rounded-3xl flex flex-col items-center justify-center transition-colors duration-500"
                >
                  <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <LayoutDashboard className="h-12 w-12 text-indigo-600 dark:text-indigo-400 drop-shadow-lg" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">The grid is empty.</h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-sm font-medium">There are no tasks pending. Initiate a new node to populate the network.</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="rounded-full px-8 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-2xl transition-all">
                    Initialize Node
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    <AnimatePresence>
                      {tasks.map(task => (
                        <TaskCard 
                          key={task._id} 
                          task={task} 
                          onEdit={handleEditClick}
                          onDelete={handleDeleteClick}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Glass Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-6 pt-12 pb-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-full glass-panel h-12 w-12 p-0 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <span className="text-base font-bold text-slate-600 dark:text-slate-400 glass-panel px-6 py-2 rounded-full">
                        Sector <span className="text-indigo-600 dark:text-indigo-400">{page}</span> // {totalPages}
                      </span>
                      <Button 
                        variant="outline" 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-full glass-panel h-12 w-12 p-0 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        initialData={editingTask}
      />
      
      <DeleteModal 
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={confirmDeleteTask}
        taskName={taskToDelete?.title}
      />
    </div>
  );
}
