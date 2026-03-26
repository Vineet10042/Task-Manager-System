import { motion } from 'framer-motion';
import { Target, CheckCircle2, Clock, Activity } from 'lucide-react';

export default function Analytics({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Done').length;
  const pending = total - completed;
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-6 glass-panel rounded-3xl flex flex-col justify-between group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Nodes</p>
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/40">
            <Target className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 relative z-10">{total}</h3>
      </motion.div>

      <motion.div variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-6 glass-panel rounded-3xl flex flex-col justify-between group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-colors"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Resolved</p>
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-2xl shadow-lg shadow-emerald-500/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 relative z-10">{completed}</h3>
      </motion.div>

      <motion.div variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-6 glass-panel rounded-3xl flex flex-col justify-between group overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/20 dark:group-hover:bg-amber-500/30 transition-colors"></div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending</p>
          <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl shadow-lg shadow-amber-500/40">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 relative z-10">{pending}</h3>
      </motion.div>

      <motion.div variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} className="p-6 glass-panel rounded-3xl flex flex-col justify-center space-y-4 group overflow-hidden relative">
         <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-colors"></div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Efficiency</p>
          <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/40">
            <Activity className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 relative z-10">
          <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">{percentage}</h3>
          <span className="text-slate-500 dark:text-slate-400 font-bold tracking-tight text-xl">%</span>
        </div>
        <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full overflow-hidden relative z-10 shadow-inner p-0.5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.2, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
