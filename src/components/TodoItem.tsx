import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';

const categoryColors: Record<string, string> = {
  personal: 'bg-blue-100 text-blue-700',
  work: 'bg-amber-100 text-amber-700',
  shopping: 'bg-green-100 text-green-700',
  health: 'bg-rose-100 text-rose-700',
};

const categoryEmoji: Record<string, string> = {
  personal: '🏠',
  work: '💼',
  shopping: '🛒',
  health: '💪',
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isChecking, setIsChecking] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 250);
    onToggle(todo.id);
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    } else {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const timeAgo = getTimeAgo(todo.createdAt);

  return (
    <div className="group animate-fade-in rounded-xl border border-slate-100 bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-200">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all sm:h-6 sm:w-6 ${
            todo.completed
              ? 'border-indigo-500 bg-indigo-500'
              : 'border-slate-300 hover:border-indigo-400 active:border-indigo-500'
          } ${isChecking ? 'animate-check-pop' : ''}`}
        >
          {todo.completed && (
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-indigo-300 bg-indigo-50/50 px-2 py-1.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-200 sm:text-[15px] sm:px-3"
            />
          ) : (
            <div className="flex items-center gap-2">
              <p
                onDoubleClick={() => setIsEditing(true)}
                className={`text-sm leading-snug cursor-default truncate sm:text-[15px] ${
                  todo.completed
                    ? 'text-slate-400 line-through'
                    : 'text-slate-800'
                }`}
              >
                {todo.text}
              </p>
            </div>
          )}

          {/* Meta */}
          <div className="mt-1 flex items-center gap-1.5 sm:gap-2">
            <span className={`inline-flex items-center gap-0.5 rounded-md px-1 py-0.5 text-[10px] sm:text-[11px] font-medium ${categoryColors[todo.category]}`}>
              {categoryEmoji[todo.category]} {todo.category}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400">{timeAgo}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 active:bg-slate-200"
            title="Edit"
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 active:bg-red-100"
            title="Delete"
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}
