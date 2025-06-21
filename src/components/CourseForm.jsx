import React, { useEffect, useState } from 'react';
import api from '../lib/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CourseForm = () => {
  const [form, setForm] = useState({
    title: '',
    courseId: '',
    description: '',
    prerequisites: [],
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

  const togglePrerequisite = (courseId) => {
    const selected = form.prerequisites.includes(courseId) ? form.prerequisites.filter((id) => id !== courseId) : [...form.prerequisites, courseId];

    setForm({ ...form, prerequisites: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/courses', {
        ...form,
        prerequisites: form.prerequisites.map((id) => ({ courseId: id })),
      });

      if (response.status === 200) navigate('/courses');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Course ID already exists. Please use a unique Course ID.');
      } else if (err.response?.status === 400) {
        setError(err.response.data || 'Invalid prerequisites.');
      } else {
        setError('Course creation failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Create New Course</h2>
      {error && <p className='text-red-600 mb-2'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Course Title</label>
          <input type='text' name='title' value={form.title} onChange={handleChange} className='mt-1 block w-full p-2 border rounded border-gray-300' required />
        </div>

        <div>
          <label className='block text-sm font-medium'>Course ID</label>
          <input type='text' name='courseId' value={form.courseId} onChange={handleChange} className='mt-1 block w-full p-2 border rounded border-gray-300' required />
        </div>

        <div>
          <label className='block text-sm font-medium'>Description</label>
          <textarea name='description' rows='3' value={form.description} onChange={handleChange} className='mt-1 block w-full p-2 border rounded border-gray-300' required />
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Select Prerequisites</label>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 p-2 rounded'>
            {Array.isArray(allCourses) &&
              allCourses.map((c) => (
                <label key={c.courseId} className='flex items-center space-x-2 text-sm'>
                  <input type='checkbox' value={c.courseId} checked={form.prerequisites.includes(c.courseId)} onChange={() => togglePrerequisite(c.courseId)} />
                  <span>
                    {c.courseId} - {c.title}
                  </span>
                </label>
              ))}
          </div>
        </div>

        <div className='flex justify-between mt-4'>
          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
            Submit
          </button>
          <button type='button' onClick={() => navigate('/courses')} className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
