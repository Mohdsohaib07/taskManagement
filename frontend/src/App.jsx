
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:3000/tasks";

function App() {
  const [tasks, setTasks] = useState("");

  // 1. Fetch Tasks (GET)
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      console.log(data);
      
      setTasks(data); 
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Add Task (POST)
  const addTask = async (taskData) => {
    try {
      await axios.post(API_URL, taskData);
      toast.success("Task added!");
      fetchTasks(); // Refresh list instantly
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  // 3. Toggle Status (PATCH)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      await axios.patch(`${API_URL}/${id}`, { status: newStatus });
      toast.success(`Task marked as ${newStatus}`);
      fetchTasks();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // 4. Delete Task (DELETE)
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Delete failed");
    }
  };
 // 5. Edit Task (Update Title/Desc)
const editTask = async (id, updatedData) => {
  try {
    await axios.patch(`${API_URL}/${id}`, updatedData);
    toast.success("Task updated!");
    fetchTasks(); // Refresh the list
  } catch (error) {
    toast.error("Update failed");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="bottom-center" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Task Manager
        </h1>
       
        {/* Pass the function down to the form */}
        <TaskForm onAdd={addTask} />
       
        {/* Pass data and actions down to the list */}
        <TaskList
          tasks={tasks}
          onToggle={toggleStatus}
          onDelete={deleteTask}
          onEdit={editTask} 
        />
      </div>
    </div>
  );
}

export default App;