'use client';

import { useState } from 'react';

type TodoStatus = 'to-do' | 'in progress' | 'done';

interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      status: 'to-do',
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const changeStatus = (id: number, newStatus: TodoStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const confirmDelete = (id: number) => {
    setTodoToDelete(id);
    setShowDeleteDialog(true);
  };

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete));
      setShowDeleteDialog(false);
      setTodoToDelete(null);
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
          Lista Zadań
        </h1>

        {/* Input section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Wpisz nowe zadanie..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Dodaj
            </button>
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Brak zadań. Dodaj nowe zadanie powyżej!
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

                <select
                  value={todo.status}
                  onChange={(e) => changeStatus(todo.id, e.target.value as TodoStatus)}
                  className={`px-3 py-1 rounded-lg border font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    todo.status === 'to-do'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                      : todo.status === 'in progress'
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
                  }`}
                >
                  <option value="to-do">To-Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  onClick={() => confirmDelete(todo.id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Usuń
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
              Potwierdzenie usunięcia
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Czy na pewno chcesz usunąć to zadanie?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={deleteTodo}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
