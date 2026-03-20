import { FilterType } from '../types';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: { total: number; active: number; completed: number };
  onClearCompleted: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  stats,
  onClearCompleted,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 sm:py-2.5 sm:pl-10 sm:pr-4"
        />
      </div>

      {/* Filters + Clear */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-0.5 rounded-xl bg-slate-100 p-0.5 sm:gap-1 sm:p-1">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`rounded-lg px-2.5 py-1 text-xs sm:text-sm font-medium transition-all sm:px-3.5 sm:py-1.5 ${
                filter === f.value
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f.label}
              <span className={`ml-1 text-[10px] sm:text-xs ${filter === f.value ? 'text-indigo-400' : 'text-slate-400'}`}>
                {f.value === 'all' ? stats.total : f.value === 'active' ? stats.active : stats.completed}
              </span>
            </button>
          ))}
        </div>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs sm:text-sm text-slate-400 transition-colors hover:text-red-500 active:text-red-600"
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
