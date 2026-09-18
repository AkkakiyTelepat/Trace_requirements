import { Section } from '../data/sections';

interface SidebarProps {
  sections: Section[];
  activeSection: number;
  setActiveSection: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ sections, activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-white transition-all duration-300 z-40 flex flex-col ${
          isOpen ? 'w-72' : 'w-16'
        } ${!isOpen ? 'lg:w-16' : ''}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
            RI
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold leading-tight">Requirements Intelligence</h1>
              <p className="text-xs text-slate-400">As-Is Analysis Platform</p>
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:bg-indigo-500 transition-colors hidden lg:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${!isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(index);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all duration-150 border-l-2 ${
                activeSection === index
                  ? 'bg-indigo-600/20 border-indigo-400 text-white'
                  : 'border-transparent text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg flex-shrink-0">{section.icon}</span>
              {isOpen && (
                <span className="text-sm truncate">{section.title}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-slate-700">
            <p className="text-xs text-slate-500">Проектное описание v1.0</p>
            <p className="text-xs text-slate-500">Методология: Вигерс & Битти</p>
          </div>
        )}
      </aside>
    </>
  );
}
