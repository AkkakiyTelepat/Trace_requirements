import { useState } from 'react';
import { gaps } from '../data/mockData';
import { AlertTriangle, Filter, ChevronDown, ExternalLink } from 'lucide-react';

export default function GapRegister() {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = gaps.filter(g => {
    const matchSeverity = severityFilter === 'all' || g.severity === severityFilter;
    const matchCategory = categoryFilter === 'all' || g.category === categoryFilter;
    return matchSeverity && matchCategory;
  });

  const severityColors: Record<string, string> = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    major: 'bg-amber-100 text-amber-700 border-amber-200',
    minor: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const severityIcons: Record<string, string> = {
    critical: '🔴',
    major: '🟠',
    minor: '🔵',
  };

  const categoryLabels: Record<string, string> = {
    undocumented: 'Не задокументировано',
    unimplemented: 'Не реализовано',
    conflict: 'Конфликт',
    ambiguous: 'Двусмысленность',
    missing_test: 'Нет тестов',
    missing_owner: 'Нет владельца',
  };

  const categoryColors: Record<string, string> = {
    undocumented: 'bg-purple-100 text-purple-700',
    unimplemented: 'bg-red-100 text-red-700',
    conflict: 'bg-orange-100 text-orange-700',
    ambiguous: 'bg-yellow-100 text-yellow-700',
    missing_test: 'bg-cyan-100 text-cyan-700',
    missing_owner: 'bg-slate-100 text-slate-600',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Реестр пробелов</h1>
          <p className="text-slate-500 text-sm mt-1">Обнаруженные разрывы, конфликты и недостающие элементы</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
          Экспорт реестра
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-xl border border-red-100 p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔴</span>
            <div>
              <p className="text-2xl font-bold text-red-700">{gaps.filter(g => g.severity === 'critical').length}</p>
              <p className="text-sm text-red-600">Критических</p>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟠</span>
            <div>
              <p className="text-2xl font-bold text-amber-700">{gaps.filter(g => g.severity === 'major').length}</p>
              <p className="text-sm text-amber-600">Серьёзных</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔵</span>
            <div>
              <p className="text-2xl font-bold text-blue-700">{gaps.filter(g => g.severity === 'minor').length}</p>
              <p className="text-sm text-blue-600">Незначительных</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все уровни</option>
          <option value="critical">Критические</option>
          <option value="major">Серьёзные</option>
          <option value="minor">Незначительные</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все категории</option>
          <option value="undocumented">Не задокументировано</option>
          <option value="unimplemented">Не реализовано</option>
          <option value="conflict">Конфликт</option>
          <option value="ambiguous">Двусмысленность</option>
          <option value="missing_test">Нет тестов</option>
          <option value="missing_owner">Нет владельца</option>
        </select>
      </div>

      {/* Gap Cards */}
      <div className="space-y-4">
        {filtered.map((gap) => (
          <div key={gap.id} className={`bg-white rounded-xl border-l-4 border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow ${
            gap.severity === 'critical' ? 'border-l-red-500' : gap.severity === 'major' ? 'border-l-amber-500' : 'border-l-blue-500'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-600">{gap.id}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severityColors[gap.severity]}`}>
                    {severityIcons[gap.severity]} {gap.severity === 'critical' ? 'Критический' : gap.severity === 'major' ? 'Серьёзный' : 'Незначительный'}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[gap.category]}`}>
                    {categoryLabels[gap.category]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{gap.description}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Затронутый артефакт:</span>
                    <p className="font-mono text-indigo-600 mt-0.5">{gap.affectedArtifact}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Доказательство:</span>
                    <p className="text-slate-700 mt-0.5 font-mono text-[11px]">{gap.evidence}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Владелец:</span>
                    <p className="text-slate-700 mt-0.5">{gap.owner}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-700">Рекомендация:</span> {gap.recommendedAction}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <AlertTriangle size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-lg">Пробелы не найдены</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
}
