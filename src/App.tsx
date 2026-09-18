import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sources from './components/Sources';
import Requirements from './components/Requirements';
import KnowledgeGraph from './components/KnowledgeGraph';
import GapRegister from './components/GapRegister';
import Traceability from './components/Traceability';
import MeetingAnalysis from './components/MeetingAnalysis';
import { 
  LayoutDashboard, Database, FileText, GitBranch, AlertTriangle, 
  Link2, Mic, Menu, X, ChevronRight 
} from 'lucide-react';

type Page = 'dashboard' | 'sources' | 'requirements' | 'graph' | 'gaps' | 'traceability' | 'meeting';

const navItems: { id: Page; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard size={20} /> },
  { id: 'sources', label: 'Источники', icon: <Database size={20} />, badge: '8' },
  { id: 'requirements', label: 'Требования', icon: <FileText size={20} />, badge: '15' },
  { id: 'graph', label: 'Граф знаний', icon: <GitBranch size={20} /> },
  { id: 'gaps', label: 'Реестр пробелов', icon: <AlertTriangle size={20} />, badge: '8' },
  { id: 'traceability', label: 'Трассировка', icon: <Link2 size={20} /> },
  { id: 'meeting', label: 'Анализ встречи', icon: <Mic size={20} /> },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
      case 'sources': return <Sources />;
      case 'requirements': return <Requirements />;
      case 'graph': return <KnowledgeGraph />;
      case 'gaps': return <GapRegister />;
      case 'traceability': return <Traceability />;
      case 'meeting': return <MeetingAnalysis />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RI</span>
            </div>
            <div>
              <h1 className="font-bold text-sm">Requirements Intelligence</h1>
              <p className="text-xs text-slate-400">As-Is Analysis Platform</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-indigo-600/20 text-white border-r-2 border-indigo-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  currentPage === item.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">АИ</div>
            <div>
              <p className="text-xs font-medium">Аналитик</p>
              <p className="text-xs text-slate-400">Проект: Обращения</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 text-white flex items-center px-4 z-50">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">RI</span>
          </div>
          <span className="font-bold text-sm">RI Platform</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-slate-900 pt-14" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm ${
                  currentPage === item.id ? 'bg-indigo-600/20 text-white' : 'text-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:pt-0 pt-14">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 hidden lg:flex items-center gap-2 text-sm">
          <span className="text-slate-400">Платформа</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-400">Проект: Обращения граждан</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-700 font-medium">
            {navItems.find(n => n.id === currentPage)?.label}
          </span>
        </div>
        <div className="p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
