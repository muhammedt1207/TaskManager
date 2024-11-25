import React, { useState } from "react";
import { 
  User, 
  Moon, 
  Sun, 
  LogOut, 
  Settings, 
  Bell, 
   
  ChevronLeft,
  Home,
  Calendar
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/AuthActions";



const Sidebar = ({ 
  isDarkMode, 
  setIsDarkMode, 
  isSidebarOpen, 
  setIsSidebarOpen,
  onLogout 
}) => {
  const [activeItem, setActiveItem] = useState('home');
  const user=useSelector((state)=>state.auth.user)
  const dispatch=useDispatch()
  const menuItems = [
    {
      id: 'home',
      icon: <Home size={20} />,
      label: 'Dashboard',
    },
    ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
  };


    const handleLogout = async () => {
      try {
         await dispatch(logoutUser())
          window.location.href = '/signin'; 
      } catch (error) {
          console.error('Logout failed:', error);
          alert('Logout failed. Please try again.');
      }
  
  }

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <aside className={`
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 
        fixed md:sticky top-0 h-screen w-64 
        transition-transform duration-300 ease-in-out
        shadow-lg z-40 flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-400 truncate w-44">{user?.email}</p>
              </div>
            </div>
            <button 
              className="md:hidden text-gray-400 hover:text-white p-3 bg-slate-400"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors
                  ${activeItem === item.id 
                    ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <button 
            className="w-full flex items-center space-x-3 p-3 rounded-lg
              text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button 
            className="w-full flex items-center space-x-3 p-3 rounded-lg
              text-red-400 hover:bg-red-500 hover:text-white mt-2 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;