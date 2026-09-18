import { 
  FileText, AlertTriangle, GitBranch, CheckCircle2, TrendingUp, 
  Shield, Clock, Users, ArrowRight, Zap, Target, Activity 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { qualityMetrics, scoreHistory, requirementsByType, coverageByStatus } from '../data/mockData';

interface DashboardProps {
  onNavigate: (page: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const radarData = [
    { metric: 'Полнота', value: qualityMetrics.completeness },
    { metric: 'Согласованность', value: qualityMetrics.consistency },
    { metric: 'Трассировка', value: qualityMetrics.traceability },
    { metric: 'Тестируемость', value: qualityMetrics.testability },
    { metric: 'Ясность', value: qualityMetrics.clarity },
    { metric: 'Покрытие ФЗ', value: qualityMetrics.legalCoverage },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Дашборд проекта</h1>
          <p className="text-slate-500 text-sm mt-1">Система учёта обращений граждан • Последнее обновление: 5 мин назад</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Анализ активен
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={<FileText size={20} />} 
          label="Требований выявлено" 
          value="15" 
          change="+3 за неделю" 
          color="blue" 
          onClick={() => onNavigate('requirements')}
        />
        <MetricCard 
          icon={<AlertTriangle size={20} />} 
          label="Пробелов обнаружено" 
          value="8" 
          change="2 критических" 
          color="red" 
          onClick={() => onNavigate('gaps')}
        />
        <MetricCard 
          icon={<GitBranch size={20} />} 
          label="Связей в графе" 
          value="22" 
          change="3 конфликтных" 
          color="purple" 
          onClick={() => onNavigate('graph')}
        />
        <MetricCard 
          icon={<CheckCircle2 size={20} />} 
          label="Покрытие кодом" 
          value="67%" 
          change="+5% за месяц" 
          color="green" 
          onClick={() => onNavigate('traceability')}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quality Radar */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-1">Зрелость требований</h3>
          <p className="text-xs text-slate-500 mb-4">Общая оценка: <span className="font-bold text-indigo-600">{qualityMetrics.overallScore}/10</span></p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-1">Динамика качества</h3>
          <p className="text-xs text-slate-500 mb-4">Рост средней оценки требований</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Requirements by Type */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-1">По типам</h3>
          <p className="text-xs text-slate-500 mb-4">Распределение артефактов</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={requirementsByType} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {requirementsByType.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {requirementsByType.map((item) => (
              <span key={item.name} className="flex items-center gap-1 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Status & Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coverage by Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Статус реализации</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coverageByStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="status" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {coverageByStatus.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Ключевые действия</h3>
          <div className="space-y-3">
            <AlertItem 
              icon={<AlertTriangle size={16} className="text-red-500" />}
              title="Критический конфликт"
              description="LEG-001 vs код: срок 20 дней вместо 30"
              action="Разрешить"
              onClick={() => onNavigate('gaps')}
              severity="critical"
            />
            <AlertItem 
              icon={<Clock size={16} className="text-amber-500" />}
              title="Не реализовано"
              description="FR-003: уведомление заявителя не в коде"
              action="Проверить"
              onClick={() => onNavigate('requirements')}
              severity="major"
            />
            <AlertItem 
              icon={<Users size={16} className="text-blue-500" />}
              title="Встреча обработана"
              description="3 новых требования, 5 уточнений"
              action="Смотреть delta"
              onClick={() => onNavigate('meeting')}
              severity="info"
            />
            <AlertItem 
              icon={<Shield size={16} className="text-emerald-500" />}
              title="Покрытие тестами"
              description="FR-004 не покрыт автотестами"
              action="Добавить тесты"
              onClick={() => onNavigate('traceability')}
              severity="major"
            />
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatMini icon={<Target size={16} />} label="Источников" value="8" sub="7 активных" />
        <StatMini icon={<FileText size={16} />} label="Документов" value="163" sub="обработано" />
        <StatMini icon={<Activity size={16} />} label="Код-артефактов" value="1243" sub="проанализировано" />
        <StatMini icon={<Zap size={16} />} label="API endpoints" value="34" sub="обнаружено" />
        <StatMini icon={<TrendingUp size={16} />} label="Confidence avg" value="0.78" sub="модели" />
        <StatMini icon={<CheckCircle2 size={16} />} label="Утверждено" value="4" sub="из 15 FR" />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, change, color, onClick }: { 
  icon: React.ReactNode; label: string; value: string; change: string; color: string; onClick: () => void 
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };
  const iconColors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <button onClick={onClick} className={`p-5 rounded-xl border ${colors[color]} hover:shadow-md transition-all text-left`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors[color]}`}>
          {icon}
        </div>
        <ArrowRight size={16} className="opacity-40" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
      <p className="text-xs text-slate-400 mt-1">{change}</p>
    </button>
  );
}

function AlertItem({ icon, title, description, action, onClick, severity }: {
  icon: React.ReactNode; title: string; description: string; action: string; onClick: () => void; severity: string;
}) {
  const borderColors: Record<string, string> = {
    critical: 'border-l-red-500',
    major: 'border-l-amber-500',
    info: 'border-l-blue-500',
  };
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 border-l-4 ${borderColors[severity]}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>
      <button onClick={onClick} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 whitespace-nowrap">
        {action} →
      </button>
    </div>
  );
}

function StatMini({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
      <div className="flex justify-center text-slate-400 mb-2">{icon}</div>
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}
