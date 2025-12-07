import { 
    FaBuilding, 
    FaHandHoldingWater, 
    FaHeartbeat, 
    FaGraduationCap, 
    FaMoneyBillWave, 
    FaLeaf, 
    FaUsers,
    FaShieldAlt 
  } from 'react-icons/fa'; // Importing FontAwesome icons
  import type { IconType } from 'react-icons';
  
  // This object maps the "String" from Sanity to the "Component"
  export const iconMap: Record<string, IconType> = {
    'FaBuilding': FaBuilding,
    'FaHandHoldingWater': FaHandHoldingWater,
    'FaHeartbeat': FaHeartbeat,
    'FaGraduationCap': FaGraduationCap,
    'FaMoneyBillWave': FaMoneyBillWave,
    'FaLeaf': FaLeaf,
    'FaUsers': FaUsers,
    'FaShieldAlt': FaShieldAlt,
  };
  
  // Helper component to safely render the icon
  export const RenderIcon = ({ iconName, className }: { iconName: string, className?: string }) => {
    const IconComponent = iconMap[iconName];
  
    if (!IconComponent) {
      // Fallback icon if the name is wrong or missing
      return <FaBuilding className={className} />; 
    }
  
    return <IconComponent className={className} />;
  };