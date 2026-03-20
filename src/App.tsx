import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import ProgressBar from './components/ProgressBar';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-xl px-3 py-6 sm:px-4 sm:py-16">
        {/* Header */}
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-1.5 font-medium text-indigo-700 sm:mb-4">
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Stay productive
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Task<span className="text-indigo-600">Flow</span>
          </h1>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-500">
            Organize your day, one task at a time.
          </p>
        </header>

        {/* Add Todo */}
        <div className="mb-4 sm:mb-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Progress */}
        {stats.total > 0 && (
          <div className="mb-4 sm:mb-6">
            <ProgressBar completed={stats.completed} total={stats.total} />
          </div>
        )}

        {/* Filters */}
        {stats.total > 0 && (
          <div className="mb-3 sm:mb-4">
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              stats={stats}
              onClearCompleted={clearCompleted}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-1.5 sm:space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>

        {/* Empty States */}
        {stats.total === 0 && (
          <div className="mt-6 sm:mt-8 text-center animate-fade-in">
            <div className="mx-auto mb-3 sm:mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 sm:h-20 sm:w-20">
              <svg className="h-8 w-8 text-slate-400 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-700">No tasks yet</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">Add your first task above to get started!</p>
          </div>
        )}

        {stats.total > 0 && todos.length === 0 && (
          <div className="mt-6 sm:mt-8 text-center animate-fade-in">
            <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 sm:h-16 sm:w-16">
              <svg className="h-7 w-7 text-slate-400 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">No tasks match your current filter.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pb-4 sm:pb-6 text-center text-[10px] sm:text-xs text-slate-400 px-2">
          <p>Double-click a task to edit</p>
          <p>Tasks saved locally</p>
          <p className="mt-1.5 sm:mt-2 font-medium text-indigo-400">Developed by Kushal</p>
        </footer>
      </div>
    </div>
  );
}
