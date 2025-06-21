import React, { useEffect, useState } from 'react';
import api from '../lib/axiosConfig';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      if (Array.isArray(res.data)) {
        setCourses(res.data);
      } else {
        setCourses([]);
      }
    } catch (err) {
      setError('Failed to load courses.');
      setCourses([]);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course.courseId !== courseId));
    } catch (err) {
      if (err.response?.status === 409) {
        alert('Cannot delete this course due to existing dependencies.');
      } else {
        alert('Delete failed.');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Courses</h2>
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      {Array.isArray(courses) && courses.length === 0 ? (
        <p className='text-gray-600'>No courses found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {Array.isArray(courses) &&
            courses.map((course) => (
              <div key={course.courseId} className='bg-white shadow-md rounded-xl p-4 border border-gray-200'>
                <h3 className='text-xl font-bold text-gray-800'>{course.title}</h3>
                <p className='text-sm text-gray-600 mb-2'>{course.courseId}</p>
                <p className='text-gray-700 mb-2'>{course.description}</p>

                <div className='mb-2'>
                  <p className='text-sm font-semibold'>Prerequisites:</p>
                  {Array.isArray(course.prerequisites) && course.prerequisites.length > 0 ? (
                    <ul className='list-disc ml-6 text-sm text-gray-700'>
                      {course.prerequisites.map((pr) => (
                        <li key={pr.courseId}>
                          {pr.courseId} - {pr.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-sm text-gray-500'>None</p>
                  )}
                </div>

                <button onClick={() => handleDelete(course.courseId)} className='mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
