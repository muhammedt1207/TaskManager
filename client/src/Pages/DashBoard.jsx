import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask, createTask, fetchTasks } from "../redux/actions/TaskActions";
import { User, Plus, Search, Filter } from "lucide-react";
import TaskModal from "../Components/TaskModal";
import TaskCard from "../Components/TaskCard";
import Sidebar from "../Components/SideBar";
import { TaskFilters } from "../Components/TaskFilters";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const user=useSelector((state)=>state.auth)
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    dateRange: { start: "", end: "" },
    sort: "",
    page: 1,
    limit: 10
  });


  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
   
  }, []);

  useEffect(() => {
    const fetchFilteredTasks = () => {
      const queryParams = {
        ...filters,
        search: searchQuery,
        startDate: filters.dateRange.start,
        endDate: filters.dateRange.end
      };
      dispatch(fetchTasks(queryParams));
    };
    fetchFilteredTasks()
    const debounceTimer = setTimeout(fetchFilteredTasks, 500);
    return () => clearTimeout(debounceTimer);
  }, [filters, searchQuery, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateTask({ id, status }));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (task) => {
    if (editingTask) {
      dispatch(updateTask({ ...task, id: editingTask.id }));
    } else {
      dispatch(createTask({ ...task }));
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };

      switch (type) {
        case 'status':
          newFilters.status = value;
          break;
        case 'priority':
          newFilters.priority = value;
          break;
        case 'dateRange':
          newFilters.dateRange = value;
          break;
        case 'sort':
          newFilters.sort = value;
          break;
        default:
          break;
      }

      newFilters.page = 1;
      return newFilters;
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <button
        className=" fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <User size={24} />
      </button>

      <div className="flex flex-col md:flex-row">
       {!isSidebarOpen && <Sidebar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} 
        />
       }
        <main className="flex-1 p-4 md:p-6 ml-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">My Tasks</h1>
              <button
                onClick={handleAddNewTask}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus size={20} className="mr-2" />
                New Task
              </button>
            </div>

           
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 mr-4">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className={`pl-10 pr-4 py-2 rounded-lg w-full 
        ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>

              <button
                onClick={() => setFilterIsVisible(!filterIsVisible)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg 
      ${isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'}
      transition-colors duration-200`}
              >
                <Filter size={20} className="text-gray-500" />
                <span>{filterIsVisible ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>

            {filterIsVisible && (
              <div className="mb-4">
                <TaskFilters
                  onFilterChange={handleFilterChange}
                  isDarkMode={isDarkMode}
                  currentFilters={filters}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${index * 100}`}
                    key={task.id}
                  >
                    <TaskCard
                      task={task}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      onEdit={handleEditTask}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-400">No tasks found.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleModalSubmit}
          editTask={editingTask}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;