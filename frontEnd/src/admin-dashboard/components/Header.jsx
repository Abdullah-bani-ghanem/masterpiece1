import { LogOut } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-md p-4 flex justify-between items-center border-b border-slate-200">
      <div className="flex items-center space-x-2">
        <svg 
          className="w-6 h-6 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
      </div>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm flex items-center transition-all duration-300 transform hover:scale-105">
        <LogOut className="w-4 h-4 mr-2" />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;