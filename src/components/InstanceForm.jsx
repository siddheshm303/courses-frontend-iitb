import React, { useEffect, useState } from 'react';
import api from '../lib/axiosConfig';
import { useNavigate } from 'react-router-dom';

const InstanceForm = () => {
  const [form, setForm] = useState({
    year: '',
    semester: '',
    courseId: '',
  });

  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      if (Array.isArray(res.data)) {
        setAllCourses(res.data);
      } else {
        setAllCourses([]);
      }
    } catch {
      setAllCourses([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/instances', {
        year: parseInt(form.year),
        semester: parseInt(form.semester),
        course: { courseId: form.courseId },
      });

      if (response.status === 200) navigate('/instances');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('This instance already exists for the selected year and semester.');
      } else if (err.response?.status === 400) {
        setError(err.response.data || 'Invalid input. Make sure the course ID exists.');
      } else {
        setError('Failed to create course instance.');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Create Course Instance</h2>
      {error && <p className='text-red-600 mb-2'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Select Course</label>
          <select name='courseId' value={form.courseId} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded border-gray-300'>
            <option value=''>-- Select Course --</option>
            {Array.isArray(allCourses) &&
              allCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseId} - {course.title}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Year</label>
          <select name='year' value={form.year} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded border-gray-300'>
            <option value=''>-- Select Year --</option>
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Semester</label>
          <select name='semester' value={form.semester} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded border-gray-300'>
            <option value=''>-- Select Semester --</option>
            <option value='1'>Semester 1</option>
            <option value='2'>Semester 2</option>
          </select>
        </div>

        <div className='flex justify-between mt-4'>
          <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'>
            Submit
          </button>
          <button type='button' onClick={() => navigate('/instances')} className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstanceForm;
