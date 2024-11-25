import React, { useState } from 'react';
import { Calendar, Clock, Tag, SortAsc, SortDesc, Filter } from 'lucide-react';

export const TaskFilters = ({ onFilterChange, isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [priority, setPriority] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleFilterChange = (type, value) => {
    onFilterChange(type, value);
  };

  const handleDateRangeChange = (type, value) => {
    const newRange = { ...dateRange, [type]: value };
    setDateRange(newRange);
    onFilterChange('dateRange', newRange);
  };

  return (
    <div className="mb-6">
    

        <div className={`flex flex-col gap-4 p-4 rounded-lg shadow transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Date Range Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                placeholder="Start Date"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
              <input
                type="date"
                placeholder="End Date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>

          {/* Status and Priority Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-500" />
              <select
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Tag size={20} className="text-gray-500" />
              <select
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  handleFilterChange('priority', e.target.value);
                }}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              {sortOrder === 'desc' ? (
                <SortDesc size={20} className="text-gray-500" />
              ) : (
                <SortAsc size={20} className="text-gray-500" />
              )}
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  handleFilterChange('sort', e.target.value);
                }}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">Sort By</option>
                <option value="dueDate:asc">Due Date (Ascending)</option>
                <option value="dueDate:desc">Due Date (Descending)</option>
                <option value="priority:asc">Priority (Low to High)</option>
                <option value="priority:desc">Priority (High to Low)</option>
                <option value="createdAt:desc">Newest First</option>
                <option value="createdAt:asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default TaskFilters;