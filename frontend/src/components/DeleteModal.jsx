import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, onConfirm, taskName }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-8 font-sans">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="glass-panel w-full max-w-sm p-8 rounded-3xl shadow-2xl shadow-rose-500/10 relative z-10 overflow-hidden transition-colors duration-500 border-rose-500/30 dark:border-rose-500/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 dark:bg-rose-500/20 rounded-full filter blur-[80px] -z-10"></div>
            
            <div className="flex flex-col items-center text-center space-y-5 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-red-600 text-white rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-rose-500/40">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-rose-900 dark:from-white dark:to-rose-300 tracking-tight">Purge Node?</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                Are you absolute certain you want to eradicate <br/> <span className="font-black text-rose-600 dark:text-rose-400 text-base">"{taskName}"</span>?<br/> Data recovery is not possible.
              </p>
              
              <div className="flex w-full space-x-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 mt-6">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                  onClick={onClose} 
                  className="flex-1 glass-panel text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all h-12 rounded-xl font-bold"
                >
                  Keep Active
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                  onClick={onConfirm} 
                  className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white transition-all border-none h-12 rounded-xl font-extrabold shadow-lg shadow-rose-500/30"
                >
                  Execute Purge
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
