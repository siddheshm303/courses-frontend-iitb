import { Routes, Route, Navigate } from 'react-router-dom';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <h1 className='text-3xl font-bold text-center mb-6'>Course Management</h1>
      <Routes>
        <Route path='/' element={<Navigate to='/courses' />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/courses/new' element={<CourseForm />} />
        <Route path='/instances' element={<InstanceList />} />
        <Route path='/instances/new' element={<InstanceForm />} />
      </Routes>
    </div>
  );
}
