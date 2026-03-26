import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function TaskModal({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Med");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "Todo");
      setPriority(initialData.priority || "Med");
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setPriority("Med");
      setDueDate("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status, priority, dueDate });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-8 font-sans">
          {/* Deep Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Glass Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-panel w-full max-w-lg p-0 rounded-3xl shadow-2xl shadow-indigo-500/10 relative z-10 overflow-hidden transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full filter blur-[80px] -z-10"></div>
            
            <div className="p-8 space-y-8 relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-indigo-300 tracking-tight flex items-center gap-3">
                    {initialData ? "Alter Node" : "Initialize Node"}
                    {!initialData && <Sparkles className="h-6 w-6 text-indigo-500 animate-pulse" />}
                  </h2>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">{initialData ? "Modify active task parameters" : "Establish new task parameters"}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10 rounded-full bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 ml-1">Title Target <span className="text-indigo-500">*</span></label>
                  <Input 
                    required 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g. Optimize rendering pipeline"
                    className="h-12 glass-input text-slate-900 dark:text-white rounded-xl transition-all shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 ml-1">Payload Details</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-xl glass-input px-4 py-3 text-sm text-slate-900 dark:text-white shadow-inner placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all resize-y font-medium"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Expand on the parameters..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 ml-1">Status State</label>
                    <select 
                      className="flex h-12 w-full rounded-xl glass-input px-4 text-sm font-bold text-slate-900 dark:text-white shadow-inner outline-none transition-all cursor-pointer"
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Todo" className="text-black">Pending</option>
                      <option value="In Progress" className="text-black">Active</option>
                      <option value="Done" className="text-black">Resolved</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 ml-1">Yield Priority</label>
                    <select 
                      className="flex h-12 w-full rounded-xl glass-input px-4 text-sm font-bold text-slate-900 dark:text-white shadow-inner outline-none transition-all cursor-pointer"
                      value={priority} 
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="Low" className="text-black">Low Yield</option>
                      <option value="Med" className="text-black">Standard</option>
                      <option value="High" className="text-black">High Yield</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 ml-1">Deadline Horizon</label>
                  <Input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-12 glass-input text-slate-900 dark:text-white font-bold rounded-xl shadow-inner transition-all [&::-webkit-calendar-picker-indicator]:dark:invert"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 mt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                  <Button type="button" variant="outline" onClick={onClose} className="rounded-xl px-8 h-12 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold">Abort</Button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="rounded-xl px-10 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/30 transition-all text-white font-extrabold tracking-wide">
                    {initialData ? "Commit Alteration" : "Execute Initialization"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
