import InstanceList from '../components/InstanceList';
import InstanceForm from '../components/InstanceForm';

const InstancesPage = () => {
  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-60px)]'>
      {/* Right: InstanceForm (1/3) */}
      <div className='w-full md:w-1/3 p-4 overflow-auto bg-white'>
        <InstanceForm />
      </div>
      {/* Left: InstanceList (2/3) */}
      <div className='w-full md:w-2/3 p-4 overflow-auto bg-gray-50 border-r'>
        <InstanceList />
      </div>
    </div>
  );
};

export default InstancesPage;
