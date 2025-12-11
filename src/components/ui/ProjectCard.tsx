import { CheckCircle2 } from 'lucide-react';
import { urlFor } from '../../lib/sanity';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Date Logic
  const dateObj = new Date(project.startDate);
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();

  return (
    <div className="rounded-2xl overflow-hidden shadow-md h-full  flex flex-col">
      {/* 1. Image Area */}
      <div className="relative h-40 bg-gray-200">
        {project.mainImage && (
          <img 
            src={urlFor(project.mainImage).width(600).height(500).url()} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Green Date Badge */}
        <div className="absolute top-4 left-4 bg-primary text-white text-center py-2 px-3 rounded-lg shadow-lg min-w-[70px]">
          <span className="block text-sm font-medium uppercase">{month}</span>
          <span className="block text-lg font-bold leading-none">{year}</span>
        </div>
      </div>

      {/* 2. Details Area Background) */}
      <div className="bg-secondary p-6 grow text-white">
        <ul className="space-y-4">
          
          {/* Title Row */}
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 shrink-0 text-white" size={18} />
            <div>
              <span className="font-bold block text-sm">Project : </span>
              <span className="text-md font-semibold leading-tight block mt-0.5">
                {project.title}
              </span>
            </div>
          </li>

          {/* Location Row */}
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 shrink-0 text-white" size={18} />
            <div>
              <span className="font-bold block text-sm">Location : {project.location}</span>
              <span className="text-sm font-medium block mt-0.5">
                
              </span>
            </div>
          </li>

          {/* Status Row */}
          <li className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 shrink-0 text-white" size={18} />
            <div>
              <span className="font-bold block text-sm">Progress :</span>
              <span className="text-sm font-medium block mt-0.5">
                {project.status}
              </span>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;