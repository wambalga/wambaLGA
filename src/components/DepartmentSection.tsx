import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { Department } from '../types';
import DepartmentCard from './ui/DepartmentCard';

const DepartmentSection = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    // Fetch departments alphabetically
    client.fetch(`*[_type == "department"] | order(title asc)`)
      .then(setDepartments)
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-secondary"> {/* Dark Blue Background from UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 text-white">
          <p className="opacity-80 mb-2">The official guide to living, working, visiting and investing in Wamba.</p>
          <h2 className="font-display font-bold text-3xl text-white sm:text-4xl underline decoration-primary underline-offset-8">
            All Departments
          </h2>
        </div>

        {/* Grid Layout 
            Mobile: 1 column
            Tablet: 2 columns
            Desktop: 4 or 5 columns (depending on screen size)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {departments.map((dept, index) => (
            <DepartmentCard key={dept._id} dept={dept} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default DepartmentSection;