import React, { useEffect, useState } from 'react';
import api from '../lib/axiosConfig';

const InstanceForm = ({ onInstanceCreated }) => {
  const [form, setForm] = useState({ year: '', semester: '', courseId: '' });
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setAllCourses(res.data || []); // Fix map() error
      } catch {
        setAllCourses([]);
      }
    };
    fetchCourses();
  }, []);

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

      if (response.status === 200) {
        alert('Instance created successfully!');
        setForm({ year: '', semester: '', courseId: '' });

        if (onInstanceCreated) onInstanceCreated(); // Tell parent to reload
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Instance already exists for this course in selected year/semester.');
      } else if (err.response?.status === 400) {
        setError('Invalid Course ID.');
      } else {
        setError('Failed to create course instance.');
      }
    }
  };

  return (
    <div className='max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Create Course Instance</h2>
      {error && <p className='text-red-600 mb-2'>{error}</p>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Year dropdown */}
        <div>
          <label className='block text-sm font-medium'>Year</label>
          <select name='year' value={form.year} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded'>
            <option value=''>-- Select Year --</option>
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Semester dropdown */}
        <div>
          <label className='block text-sm font-medium'>Semester</label>
          <select name='semester' value={form.semester} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded'>
            <option value=''>-- Select Semester --</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </div>

        {/* Course ID selection */}
        <div>
          <label className='block text-sm font-medium'>Course</label>
          <select name='courseId' value={form.courseId} onChange={handleChange} required className='mt-1 block w-full p-2 border rounded'>
            <option value=''>-- Select Course --</option>
            {Array.isArray(allCourses) &&
              allCourses.map((c) => (
                <option key={c.courseId} value={c.courseId}>
                  {c.courseId} - {c.title}
                </option>
              ))}
          </select>
        </div>

        {/* Buttons */}
        <div className='flex justify-between mt-4'>
          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
            Submit
          </button>
          <button type='button' onClick={() => setForm({ year: '', semester: '', courseId: '' })} className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstanceForm;
