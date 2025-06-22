import InstanceList from '../components/InstanceList';
import InstanceForm from '../components/InstanceForm';
import { useState } from 'react';

const InstancesPage = () => {
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-60px)]'>
      {/* Right: InstanceForm (1/3) */}
      <div className='w-full md:w-1/3 p-4 overflow-auto bg-white'>
        <InstanceForm onInstanceCreated={() => setTriggerRefresh(!triggerRefresh)} />
      </div>
      {/* Left: InstanceList (2/3) */}
      <div className='w-full md:w-2/3 p-4 overflow-auto bg-gray-50 border-r'>
        <InstanceList refreshTrigger={triggerRefresh} />
      </div>
    </div>
  );
};

export default InstancesPage;
