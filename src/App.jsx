import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from './pages/Courses';
import Instances from './pages/Instances';

function App() {
  return (
    <div>
      <nav className='bg-gray-900 text-white px-6 py-3 flex gap-4'>
        <a href='/courses' className='hover:underline'>
          Courses
        </a>
        <a href='/instances' className='hover:underline'>
          Instances
        </a>
      </nav>

      <Routes>
        <Route path='/' element={<Navigate to='/courses' />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/instances' element={<Instances />} />
      </Routes>
    </div>
  );
}

export default App;
