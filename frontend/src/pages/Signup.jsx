import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Mail, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden transition-colors duration-500">
      {/* Ambient Animated Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300/50 dark:bg-emerald-900/50 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300/50 dark:bg-teal-900/50 rounded-full filter blur-[80px]"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300/50 dark:bg-cyan-900/50 rounded-full filter blur-[80px]"></div>
      </div>

      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
        className="w-full max-w-md z-10 relative"
      >
        <div className="text-center mb-10 relative">
          <motion.div 
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 ring-4 ring-white/50 dark:ring-slate-900/50"
          >
            <Sparkles className="h-8 w-8 text-white absolute -top-3 -right-3 drop-shadow-md animate-pulse" />
            <LayoutDashboard className="h-8 w-8 text-white relative z-10" />
          </motion.div>
          <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 dark:from-white dark:via-teal-200 dark:to-white outfit drop-shadow-sm pb-1">Create Account</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-base font-medium font-sans">Join the next generation of productivity</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 transition-colors duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10 dark:from-white/5 dark:to-transparent pointer-events-none group-hover:opacity-100 transition-opacity"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Email address</label>
              <div className="relative group/input">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-600 dark:text-teal-400 group-focus-within/input:text-teal-700 dark:group-focus-within/input:text-teal-300 transition-colors" />
                <input 
                  type="email" 
                  className="w-full pl-11 h-12 glass-input text-slate-900 dark:text-white rounded-xl outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:scale-[1.02]"
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-600 dark:text-teal-400 group-focus-within/input:text-teal-700 dark:group-focus-within/input:text-teal-300 transition-colors" />
                <input 
                  type="password" 
                  className="w-full pl-11 h-12 glass-input text-slate-900 dark:text-white rounded-xl outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:scale-[1.02]"
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-500/30 mt-4 relative overflow-hidden"
            >
              <span className="relative z-10">Sign up securely</span>
              <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 hover:opacity-80 transition-opacity">
                Sign in deeply
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
