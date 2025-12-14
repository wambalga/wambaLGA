import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import type { Staff } from '../types';
import FadeIn from '../components/ui/FadeIn';

const Council = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch name, role, photo, and the new CATEGORY field
    const query = `*[_type == "staff"] | order(rank asc) {
      _id,
      name,
      role,
      category,
      photo,
      bio
    }`;

    client.fetch(query)
      .then((data) => {
        setStaff(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div className="p-20 text-center">Loading Personnel...</div>;

  // Filter staff into their respective categories
  const executive = staff.filter((p) => p.category === 'executive');
  const legislative = staff.filter((p) => p.category === 'legislative');
  const management = staff.filter((p) => p.category === 'management');
  const traditional = staff.filter((p) => p.category === 'traditional');

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="bg-secondary text-white py-16 text-center">
        <h1 className="font-display text-white font-bold text-4xl">Council Personnel</h1>
        <p className="mt-4 text-gray-300">Meet the Administration, Legislature, and Traditional Leaders</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-16">
        <FadeIn>
        {/* 1. Executive Arm */}
        {executive.length > 0 && (
          <Section title="Executive Arm" subtitle="WAMBA LGA">
            {executive.map((person) => <PersonCard key={person._id} person={person} />)}
          </Section>
        )}
      </FadeIn>

        {/* 2. Legislative Arm */}
        <FadeIn delay={0.2}>
        {legislative.length > 0 && (
          <Section title="Legislative Arm" subtitle="WAMBA LGA">
            {legislative.map((person) => <PersonCard key={person._id} person={person} />)}
          </Section>
        )}
        </FadeIn>

        {/* 3. The Management */}
        <FadeIn>
        {management.length > 0 && (
          <Section title="The Management" subtitle="WAMBA LGA">
            {management.map((person) => <PersonCard key={person._id} person={person} />)}
          </Section>
        )}
        </FadeIn>

        {/* 4. Traditional Rulers */}
        <FadeIn>
        {traditional.length > 0 && (
          <Section title="Traditional Rulers" subtitle="WAMBA LGA">
            {traditional.map((person) => <PersonCard key={person._id} person={person} />)}
          </Section>
        )}
        </FadeIn>

      </div>
    </div>
  );
};

// --- Helper Components for the New UI ---

// Reusable Section Wrapper
const Section = ({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) => (
  <div>
    <div className="text-center mb-12">
      {subtitle && (
        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="font-display font-bold text-4xl text-[#0a1f44]">
        {title}
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      {children}
    </div>
  </div>
);

// New Card Design
const PersonCard = ({ person }: { person: Staff }) => (
  <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center border border-gray-100">
    
    {/* Circular Image */}
    <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-50 shrink-0">
      {person.photo ? (
        <img
          src={urlFor(person.photo).width(400).height(400).url()}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Photo
        </div>
      )}
    </div>

    {/* Name */}
    <h3 className="text-xl font-bold text-[#0a1f44] mb-2 font-display">
      {person.name}
    </h3>

    {/* Green Divider Line */}
    <div className="w-12 h-1 bg-primary rounded-full mb-3"></div>

    {/* Role */}
    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
      {person.role}
    </p>
  </div>
);

export default Council;
