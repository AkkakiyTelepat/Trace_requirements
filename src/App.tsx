import { useState } from 'react';
import Sidebar from './components/Sidebar';
import SectionRenderer from './components/SectionRenderer';
import { sections } from './data/sections';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-16'}`}>
        <div className="max-w-5xl mx-auto px-8 py-10">
          <SectionRenderer section={sections[activeSection]} index={activeSection} />
        </div>
      </main>
    </div>
  );
}
