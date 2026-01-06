import { useState } from "react";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
}

// Sub-component to handle individual task state (Edit Mode)
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");

  const handleSave = () => {
    if (!editTitle.trim()) return; // Prevent empty titles
    onEdit(task._id, { title: editTitle, description: editDesc });
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    // Reset fields to original values
    setEditTitle(task.title);
    setEditDesc(task.description || "");
    setIsEditing(false);
  };

  return (
    <div 
      className={`p-4 bg-white rounded-lg shadow-sm border-l-4 transition-all ${
        task.status === "completed" ? "border-green-500 opacity-75" : "border-yellow-500"
      }`}
    >
      {/* 1. EDIT MODE: Show Inputs */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-blue-500"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded focus:outline-blue-500 text-sm"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description..."
          />
          <div className="flex gap-2 mt-2">
            <button 
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* 2. VIEW MODE: Show Text & Buttons */
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-lg ${
              task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"
            }`}>
              {task.title}
            </h3>
            {task.description && <p className="text-gray-600 text-sm">{task.description}</p>}
            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
              task.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}>
              {task.status}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-4">
             {/* EDIT BUTTON (Only show if not completed, optional) */}
             <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
              title="Edit Task"
            >
              ✏️
            </button>

            {/* TOGGLE BUTTON */}
            <button
              onClick={() => onToggle(task._id, task.status)}
              className={`p-2 rounded-full transition ${
                task.status === "completed" 
                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200" 
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
              title={task.status === "completed" ? "Mark Pending" : "Mark Done"}
            >
              {task.status === "completed" ? "↩️" : "✅"}
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
              title="Delete Task"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;