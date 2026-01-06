
import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Simple validation

    onAdd({ title, description: desc });
    
    // Reset form
    setTitle("");
    setDesc("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Description (Optional)"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;