import React, { useState } from "react";
import { Edit, Trash2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

const TaskCard = ({ task, onDelete, onStatusChange, onEdit, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do": return "bg-blue-500";
      case "In Progress": return "bg-yellow-500";
      case "Completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const isOverdue = () => {
    if (task.status === "Completed") return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const overdueStatus = isOverdue();

  return (
    <div
      className={`rounded-lg shadow-lg p-4 border-2 transition-all
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        ${overdueStatus ? 'border-red-500' : 'border-transparent'}
        h-48 relative overflow-hidden`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-start gap-2 max-w-[70%]">
          <h3 className="font-bold text-lg truncate" title={task.title}>
            {task.title}
          </h3>
          {overdueStatus && (
            <AlertCircle 
              size={20} 
              className="text-red-500 animate-pulse flex-shrink-0" 
              title="Task is overdue"
            />
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)} text-white flex-shrink-0`}>
          {task.status}
        </span>
      </div>
      
      {/* Description Section */}
      <div className="mb-2 h-[80px]">
        <p className="text-sm text-gray-400 line-clamp-2" title={task.description}>
          {task.description}
        </p>
      </div>

      {/* Due Date Section */}
      <p className={`text-sm mb-4 ${overdueStatus ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
        Due: {task.dueDate}
        {overdueStatus && ' (Overdue)'}
      </p>
      
      {/* Action Buttons Section - Fixed at Bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex flex-wrap gap-2">
          {task.status !== "Completed" && (
            <button
              className={`flex-1 py-2 px-2 rounded-lg text-white 
                ${task.status === "To Do" ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
                transition-colors text-sm`}
              onClick={() => onStatusChange(
                task._id,
                task.status === "To Do" ? "In Progress" : "Completed"
              )}
            >
              {task.status === "To Do" ? (
                <>
                  <span className="mr-2">➡️</span> Next
                </>
              ) : (
                <>
                  <span className="mr-2">✔️</span> Done
                </>
              )}
            </button>
          )}
          <button
            className="flex-1 py-2 px-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition-colors text-sm"
            onClick={() => onEdit(task)}
          >
            <Edit size={16} className="inline mr-2" />
            Edit
          </button>
          <button
            className="flex-1 py-2 px-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm"
            onClick={() => onDelete(task._id)}
          >
            <Trash2 size={16} className="inline mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;