import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Courses from './pages/Courses';
import Instances from './pages/Instances';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-6 bg-gray-50'>
          <Outlet />
          <Routes>
            <Route path='/' element={<Navigate to='/courses' />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/instances' element={<Instances />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
