import { Link } from 'react-router-dom';
import type { Department } from '../../types';
import { RenderIcon } from '../../lib/iconMap'; // Import the helper

interface DepartmentCardProps {
  dept: Department;
  index: number;
}

const DepartmentCard = ({ dept, index }: DepartmentCardProps) => {
  const numberString = (index + 1).toString().padStart(2, '0');

  return (
    <Link 
      to={`/departments/${dept.slug.current}`}
      className="group bg-white p-6 rounded-md shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-38 md:h-48 relative"
    >
      <div className="flex justify-between items-start">
        {/* REPLACED IMAGE WITH REACT ICON */}
        <div className="text-primary text-4xl group-hover:scale-110 transition-transform duration-300">
           {/* We pass the string name (e.g., "FaBuilding") and the class */}
           <RenderIcon iconName={dept.icon} />
        </div>

        <div className="bg-green-50 text-secondary text-sm font-semibold py-2 px-3 rounded">
          {numberString}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-secondary font-display group-hover:text-primary transition-colors">
          {dept.title}
        </h3>
      </div>
    </Link>
  );
};

export default DepartmentCard;