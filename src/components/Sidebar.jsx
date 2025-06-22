import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-48 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4 shadow-lg'>
      <h2 className='text-xl font-bold mb-6'>Course App</h2>
      <NavLink to='/courses' className={({ isActive }) => `hover:bg-gray-700 p-2 rounded ${isActive ? 'bg-gray-700 font-semibold' : ''}`}>
        Courses
      </NavLink>
      <NavLink to='/instances' className={({ isActive }) => `hover:bg-gray-700 p-2 rounded ${isActive ? 'bg-gray-700 font-semibold' : ''}`}>
        Instances
      </NavLink>
    </div>
  );
};

export default Sidebar;
