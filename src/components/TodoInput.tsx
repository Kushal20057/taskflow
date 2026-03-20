import { useState, useRef, useEffect } from 'react';
import { Category } from '../types';

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'personal', label: 'Personal', emoji: '🏠' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'shopping', label: 'Shopping', emoji: '🛒' },
  { value: 'health', label: 'Health', emoji: '💪' },
];

interface TodoInputProps {
  onAdd: (text: string, category: Category) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [showCategories, setShowCategories] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, category);
      setText('');
      inputRef.current?.focus();
    }
  };

  const selectedCategory = categories.find(c => c.value === category)!;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-indigo-300 sm:gap-2 sm:p-2 sm:rounded-2xl">
        {/* Category Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-base transition-colors hover:bg-slate-100 sm:h-10 sm:w-10 sm:text-lg"
            title={selectedCategory.label}
          >
            {selectedCategory.emoji}
          </button>

          {showCategories && (
            <div className="absolute left-0 top-full z-10 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-lg animate-fade-in sm:w-40">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setCategory(cat.value);
                    setShowCategories(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors sm:text-sm ${
                    category === cat.value
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent px-1 sm:px-2 py-2 text-slate-800 placeholder-slate-400 outline-none text-sm sm:text-[15px]"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 sm:h-10 sm:w-auto sm:px-5"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  );
}
