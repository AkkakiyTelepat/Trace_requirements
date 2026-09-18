import { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Clock, Plus, Search, Filter } from 'lucide-react';
import { sources, Source } from '../data/mockData';

export default function Sources() {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = sources.filter(s => {
    const matchesFilter = filter === 'all' || s.type === filter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusIcon = (status: Source['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'syncing': return <RefreshCw size={16} className="text-blue-500 animate-spin" />;
      case 'error': return <AlertCircle size={16} className="text-red-500" />;
      case 'pending': return <Clock size={16} className="text-amber-500" />;
    }
  };

  const statusLabel = (status: Source['status']) => {
    switch (status) {
      case 'connected': return 'Подключён';
      case 'syncing': return 'Синхронизация';
      case 'error': return 'Ошибка';
      case 'pending': return 'Ожидание';
    }
  };

  const statusColor = (status: Source['status']) => {
    switch (status) {
      case 'connected': return 'bg-emerald-50 text-emerald-700';
      case 'syncing': return 'bg-blue-50 text-blue-700';
      case 'error': return 'bg-red-50 text-red-700';
      case 'pending': return 'bg-amber-50 text-amber-700';
    }
  };

  const typeFilters = [
    { id: 'all', label: 'Все' },
    { id: 'document', label: 'Документы' },
    { id: 'code', label: 'Код' },
    { id: 'legal', label: 'Нормативные' },
    { id: 'ui', label: 'UI/Макеты' },
    { id: 'jira', label: 'Jira' },
    { id: 'confluence', label: 'Wiki' },
    { id: 'meeting', label: 'Встречи' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Источники данных</h1>
          <p className="text-slate-500 text-sm mt-1">Подключённые корпоративные источники и статус синхронизации</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={16} />
          Добавить источник
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{sources.length}</p>
          <p className="text-sm text-slate-500">Всего источников</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-emerald-600">{sources.filter(s => s.status === 'connected').length}</p>
          <p className="text-sm text-slate-500">Активных</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-slate-900">{sources.reduce((acc, s) => acc + s.itemsCount, 0).toLocaleString()}</p>
          <p className="text-sm text-slate-500">Элементов обработано</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-2xl font-bold text-red-600">{sources.filter(s => s.status === 'error').length}</p>
          <p className="text-sm text-slate-500">С ошибками</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter size={16} className="text-slate-400 flex-shrink-0" />
          {typeFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                filter === f.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source) => (
          <div key={source.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{source.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{source.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{source.id}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusColor(source.status)}`}>
                {statusIcon(source.status)}
                {statusLabel(source.status)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-slate-500">
                  <span className="font-semibold text-slate-700">{source.itemsCount}</span> элементов
                </span>
                <span className="text-slate-400 text-xs">{source.lastSync}</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-xs font-medium">
                Подробнее →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">Источники не найдены</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
}
