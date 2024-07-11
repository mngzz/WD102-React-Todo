import React, { useState } from "react";
import { Card } from "flowbite-react";
export default function TodoCard() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Wake up",
      isDone: true,
    },
  ]);

  const handleSubmit = () => {
    const trimmedInput = todoInput.trim();

    if (trimmedInput.length === 0) {
      alert("Please enter a todo before adding.");
      return;
    }

    const limitedInput = trimmedInput.slice(0, 5);

    if (limitedInput !== trimmedInput) {
      alert("Cannot exceed 5 characters!");
      return;
    }

    const newData = {
      id: todos.length + 1,
      task: limitedInput,
      isDone: false,
    };

    setTodos([...todos, newData]);
    setTodoInput(""); // Clear input after adding todo
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateStatus = (id) => {
    const getIndex = todos.findIndex((todo) => todo.id === id);
    const updateTodo = {
      ...todos[getIndex],
      isDone: todos[getIndex].isDone ? false : true,
    };
    const updatedTodos = [...todos];
    updatedTodos[getIndex] = updateTodo;
    setTodos(updatedTodos);
  };
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <input
          type="text"
          name="todo"
          id="todo"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          className="w-full text-xl rounded-sm"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-3"
        >
          Add
        </button>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {todos.map((todo, i) => (
            <li
              key={i}
              className={
                todo.isDone ? "bg-gray-200 py-3 sm:py-4" : "py-3 sm:py-4"
              }
            >
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {todo.task}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Status: {todo.isDone ? "Done" : "Not Done"}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white px-4">
                  <button
                    type="button"
                    className={
                      todo.isDone
                        ? "bg-gray-400 px-5 py-3 text-black"
                        : "bg-green-400 px-5 py-3 text-white"
                    }
                    onClick={() => updateStatus(todo.id)}
                  >
                    {todo.isDone ? "Undo" : "Done"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-400 px-5 py-3 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
