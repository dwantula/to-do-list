'use client';

import { useState, useEffect } from 'react';
import { getTodos, addTodo as addTodoSupabase, updateTodoStatus, deleteTodo as deleteTodoSupabase } from '@/lib/supabase/todos';
import { Database, TodoStatus } from '@/types/supabase';

type Todo = Database['public']['Tables']['todos']['Row'];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === '') return;

    try {
      setError(null);
      const newTodo = await addTodoSupabase(inputValue);
      setTodos([newTodo, ...todos]);
      setInputValue('');
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding todo:', err);
    }
  };

  const changeStatus = async (id: number, newStatus: TodoStatus) => {
    try {
      setError(null);
      await updateTodoStatus(id, newStatus);
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      ));
    } catch (err) {
      setError('Failed to change status');
      console.error('Error updating status:', err);
    }
  };

  const confirmDelete = (id: number) => {
    setTodoToDelete(id);
    setShowDeleteDialog(true);
  };

  const deleteTodo = async () => {
    if (todoToDelete !== null) {
      try {
        setError(null);
        await deleteTodoSupabase(todoToDelete);
        setTodos(todos.filter(todo => todo.id !== todoToDelete));
        setShowDeleteDialog(false);
        setTodoToDelete(null);
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting todo:', err);
        setShowDeleteDialog(false);
        setTodoToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setTodoToDelete(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Task List
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Input section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Loading tasks...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No tasks. Add a new task above!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200">{todo.text}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => changeStatus(todo.id, 'to-do')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      todo.status === 'to-do'
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 shadow-md scale-105'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    To-Do
                  </button>
                  <button
                    onClick={() => changeStatus(todo.id, 'in progress')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      todo.status === 'in progress'
                        ? 'bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 shadow-md scale-105'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-700'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => changeStatus(todo.id, 'done')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      todo.status === 'done'
                        ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 shadow-md scale-105'
                        : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-700'
                    }`}
                  >
                    Done
                  </button>
                </div>

                <button
                  onClick={() => confirmDelete(todo.id)}
                  className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-lg transition-colors"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this task?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteTodo}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
