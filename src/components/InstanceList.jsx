import React, { useEffect, useState } from 'react';
import api from '../lib/axiosConfig';

const InstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');

  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);

  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);

  const fetchInstances = async () => {
    if (!year || !semester) return;

    setError('');
    setInstances([]);
    setFilteredInstances([]);

    try {
      const res = await api.get(`/instances/${year}/${semester}`);
      if (Array.isArray(res.data)) {
        setInstances(res.data);
        setFilteredInstances(res.data);
      } else {
        setInstances([]);
        setFilteredInstances([]);
      }
    } catch {
      setError('Failed to load course instances.');
    }
  };

  const applyCourseFilter = async () => {
    if (courseId === '') {
      setFilteredInstances(instances);
      return;
    }

    try {
      const res = await api.get(`/instances/${year}/${semester}/${courseId}`);
      setFilteredInstances([res.data]); // wrap single item in array
    } catch {
      setError('Failed to fetch selected course instance.');
      setFilteredInstances([]);
    }
  };

  const handleDelete = async (instance) => {
    const { course } = instance;

    if (!course?.courseId) return;

    try {
      await api.delete(`/instances/${year}/${semester}/${course.courseId}`);
      const updated = filteredInstances.filter((i) => i.course?.courseId !== course.courseId);
      setFilteredInstances(updated);
    } catch (err) {
      if (err.response?.status === 409) {
        alert('Cannot delete due to dependency.');
      } else {
        alert('Delete failed.');
      }
    }
  };

  const handleViewDetails = async (cid) => {
    try {
      const res = await api.get(`/instances/${year}/${semester}/${cid}`);
      setDetails(res.data);
    } catch {
      alert('Failed to load instance details.');
    }
  };

  useEffect(() => {
    fetchInstances();
  }, [year, semester]);

  useEffect(() => {
    applyCourseFilter();
  }, [courseId]);

  const uniqueCourseIds = [...new Set(instances.map((i) => i.course?.courseId).filter(Boolean))];

  return (
    <div className='max-w-6xl mx-auto bg-white p-6 shadow rounded-xl'>
      <h2 className='text-2xl font-bold mb-4'>Course Instances</h2>

      {/* Filters */}
      <div className='flex flex-wrap gap-4 mb-6'>
        <div>
          <label className='text-sm font-medium'>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className='block p-2 border rounded'>
            <option value=''>-- Select Year --</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='text-sm font-medium'>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className='block p-2 border rounded'>
            <option value=''>-- Select Semester --</option>
            <option value='1'>Semester 1</option>
            <option value='2'>Semester 2</option>
          </select>
        </div>

        {instances.length > 0 && (
          <div>
            <label className='text-sm font-medium'>Course ID</label>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className='block p-2 border rounded'>
              <option value=''>All</option>
              {uniqueCourseIds.map((cid) => (
                <option key={cid} value={cid}>
                  {cid}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <p className='text-red-600 mb-4'>{error}</p>}

      {filteredInstances.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {filteredInstances.map(
            (inst) =>
              inst?.course && (
                <div key={`${inst.course.courseId}-${inst.year}-${inst.semester}`} className='border rounded p-4 bg-gray-50 shadow'>
                  <h3 className='text-lg font-bold mb-1'>
                    {inst.course.courseId} - {inst.course.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    Year: {inst.year}, Semester: {inst.semester}
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <button onClick={() => handleViewDetails(inst.course.courseId)} className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm'>
                      View Details
                    </button>
                    <button onClick={() => handleDelete(inst)} className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm'>
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <p className='text-gray-600'>No course instances found.</p>
      )}

      {/* Modal */}
      {details && details?.course && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative'>
            <button onClick={() => setDetails(null)} className='absolute top-2 right-2 text-gray-600 hover:text-black'>
              ✕
            </button>
            <h3 className='text-xl font-bold mb-2'>
              {details.course.courseId} - {details.course.title}
            </h3>
            <p className='text-sm text-gray-600'>
              Year: {details.year}, Semester: {details.semester}
            </p>
            <p className='mt-2'>{details.course.description}</p>

            <div className='mt-3'>
              <p className='font-medium'>Prerequisites:</p>
              {Array.isArray(details.course.prerequisites) && details.course.prerequisites.length > 0 ? (
                <ul className='list-disc ml-6 text-sm'>
                  {details.course.prerequisites.map((p) => (
                    <li key={p.courseId}>
                      {p.courseId} - {p.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-sm text-gray-500'>None</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstanceList;
