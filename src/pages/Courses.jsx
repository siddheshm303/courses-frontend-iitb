import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';

const CoursesPage = () => {
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-60px)]'>
      {/* Right: CourseForm (1/3) */}
      <div className='w-full md:w-1/3 p-4 overflow-auto bg-white'>
        <CourseForm />
      </div>
      {/* Left: CourseList (2/3) */}
      <div className='w-full md:w-2/3 p-4 overflow-auto bg-gray-50 border-r'>
        <CourseList />
      </div>
    </div>
  );
};

export default CoursesPage;
