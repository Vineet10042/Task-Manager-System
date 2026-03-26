import { format, isPast, formatDistanceToNow, isToday } from 'date-fns';
import { Edit2, Trash2, Calendar, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function TaskCard({ task, onEdit, onDelete }) {
  const getPriorityTheme = (priority) => {
    switch(priority) {
      case 'High': return 'from-rose-500 to-orange-500 shadow-rose-500/30 dark:shadow-rose-500/20';
      case 'Med': return 'from-blue-500 to-indigo-500 shadow-indigo-500/30 dark:shadow-indigo-500/20';
      case 'Low': return 'from-teal-400 to-emerald-500 shadow-teal-500/30 dark:shadow-teal-500/20';
      default: return 'from-slate-400 to-slate-500 shadow-slate-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Done': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30';
      case 'In Progress': return 'text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/30';
      case 'Todo': return 'text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600';
      default: return 'text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600';
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } },
    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2 } }
  };

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status !== 'Done' && !isToday(new Date(task.dueDate));
  const timeRemaining = task.dueDate ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true }) : null;

  return (
    <motion.div 
      variants={itemVariants}
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      className="group glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
    >
      {/* Priority Glow Bar Gradient */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${getPriorityTheme(task.priority)}`}></div>

      <div className="space-y-4 relative z-10 pt-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors drop-shadow-sm">{task.title}</h3>
        </div>
        
        {task.description && (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{task.description}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full border shadow-sm flex items-center gap-1.5 transition-colors duration-300 ${getStatusColor(task.status)}`}>
            {task.status === 'Done' ? <CheckCircle2 className="h-3.5 w-3.5" /> : task.status === 'In Progress' ? <Clock className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            {task.status}
          </span>
          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full border text-white shadow-sm border-white/20 bg-gradient-to-r ${getPriorityTheme(task.priority)}`}>
            {task.priority} YIELD
          </span>
        </div>
      </div>

      <div className="pt-4 mt-auto border-t border-slate-200/50 dark:border-slate-700/50 relative z-10">
         {task.dueDate && (
             <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl mb-4 transition-colors duration-300 ${isOverdue ? 'bg-rose-100/80 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30' : 'bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50'}`}>
               <Calendar className="h-4 w-4" />
               <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
               <span className="opacity-40 font-black">•</span>
               <span>{isOverdue ? 'Expired ' : ''}{timeRemaining}</span>
             </div>
          )}

        <div className="flex space-x-3 w-full">
          <Button variant="outline" size="sm" onClick={() => onEdit(task)} className="flex-1 h-10 rounded-xl glass-panel text-indigo-700 dark:text-indigo-300 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all font-bold">
            <Edit2 className="h-4 w-4 mr-2" /> Alter
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(task)} className="flex-1 h-10 rounded-xl glass-panel text-rose-700 dark:text-rose-400 hover:text-white hover:bg-rose-600 dark:hover:bg-rose-500 transition-all font-bold">
            <Trash2 className="h-4 w-4 mr-2" /> Purge
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
