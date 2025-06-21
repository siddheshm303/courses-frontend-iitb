import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className='bg-slate-700 text-white px-8 py-4 shadow flex justify-between'>
        <div className='text-lg font-semibold'>Course Manager</div>
        <div className='space-x-6'>
          <Link to='/' className='hover:underline text-white'>
            Courses
          </Link>
          <Link to='/instances' className='hover:underline text-white'>
            Instances
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className='p-6 max-w-6xl mx-auto'>
        <Routes>
          <Route
            path='/'
            element={
              <div className='grid md:grid-cols-2 gap-10'>
                <CourseForm />
                <CourseList />
              </div>
            }
          />
          <Route
            path='/instances'
            element={
              <div className='grid md:grid-cols-2 gap-10'>
                <InstanceForm />
                <InstanceList />
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
