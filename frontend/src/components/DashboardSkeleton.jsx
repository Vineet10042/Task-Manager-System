export default function DashboardSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse pt-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="h-[240px] glass-panel rounded-3xl p-6 flex flex-col justify-between shadow-sm transition-colors duration-500 border border-slate-200/50 dark:border-slate-700/40">
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="h-7 bg-slate-200/60 dark:bg-slate-700/50 rounded-xl w-3/4"></div>
              <div className="h-6 w-16 bg-slate-200/60 dark:bg-slate-700/50 rounded-full shrink-0"></div>
            </div>
            <div className="space-y-4">
              <div className="h-5 bg-slate-100/50 dark:bg-slate-700/30 rounded-lg w-full"></div>
              <div className="h-5 bg-slate-100/50 dark:bg-slate-700/30 rounded-lg w-5/6"></div>
              <div className="h-5 bg-slate-100/50 dark:bg-slate-700/30 rounded-lg w-4/6"></div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-5 border-t border-slate-200/30 dark:border-slate-700/30 mt-auto">
            <div className="h-6 bg-slate-200/60 dark:bg-slate-700/50 rounded-lg w-28"></div>
            <div className="flex space-x-3">
              <div className="h-10 w-10 bg-slate-200/60 dark:bg-slate-700/50 rounded-xl"></div>
              <div className="h-10 w-10 bg-slate-200/60 dark:bg-slate-700/50 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
