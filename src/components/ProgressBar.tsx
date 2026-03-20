interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className="text-xs sm:text-sm font-medium text-slate-600">Progress</span>
        <span className="text-xs sm:text-sm font-bold text-indigo-600">{percentage}%</span>
      </div>
      <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-white/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-slate-500">
        {completed}/{total} completed
      </p>
    </div>
  );
}
