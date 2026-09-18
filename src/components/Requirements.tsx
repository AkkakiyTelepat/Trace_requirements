import { useState } from 'react';
import { Search, Filter, ChevronDown, ExternalLink, AlertTriangle, Eye } from 'lucide-react';
import { requirements, Requirement } from '../data/mockData';

export default function Requirements() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);

  const filtered = requirements.filter(r => {
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const typeColors: Record<string, string> = {
    legal: 'bg-red-100 text-red-700',
    business: 'bg-amber-100 text-amber-700',
    functional: 'bg-blue-100 text-blue-700',
    nonfunctional: 'bg-cyan-100 text-cyan-700',
    user: 'bg-purple-100 text-purple-700',
  };

  const statusColors: Record<string, string> = {
    proposed: 'bg-slate-100 text-slate-600',
    drafted: 'bg-amber-100 text-amber-700',
    clarified: 'bg-blue-100 text-blue-700',
    reviewed: 'bg-indigo-100 text-indigo-700',
    approved: 'bg-purple-100 text-purple-700',
    implemented: 'bg-emerald-100 text-emerald-700',
    verified: 'bg-teal-100 text-teal-700',
    deprecated: 'bg-red-100 text-red-600',
  };

  const priorityColors: Record<string, string> = {
    Must: 'text-red-600 bg-red-50',
    Should: 'text-amber-600 bg-amber-50',
    Could: 'text-blue-600 bg-blue-50',
    "Won't": 'text-slate-500 bg-slate-50',
  };

  const qualityColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600';
    if (score >= 6) return 'text-amber-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Реестр требований</h1>
          <p className="text-slate-500 text-sm mt-1">Все выявленные требования с оценками качества и покрытия</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
            Экспорт XLSX
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
            Экспорт DOCX
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по ID или названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все типы</option>
          <option value="legal">Нормативные</option>
          <option value="business">Бизнес</option>
          <option value="functional">Функциональные</option>
          <option value="nonfunctional">Нефункциональные</option>
          <option value="user">Пользовательские</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все статусы</option>
          <option value="proposed">Предложено</option>
          <option value="drafted">Черновик</option>
          <option value="clarified">Уточнено</option>
          <option value="reviewed">На ревью</option>
          <option value="approved">Утверждено</option>
          <option value="implemented">Реализовано</option>
          <option value="verified">Верифицировано</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-600 text-xs uppercase">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 text-xs uppercase">Название</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 text-xs uppercase">Тип</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 text-xs uppercase">Статус</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600 text-xs uppercase">Приоритет</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Качество</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Покрытие</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Связи</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600 text-xs uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedReq(req)}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-indigo-600">{req.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium truncate max-w-xs">{req.name}</span>
                      {req.hasConflicts && <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[req.type]}`}>
                      {req.type === 'legal' ? 'ФЗ' : req.type === 'business' ? 'БТ' : req.type === 'functional' ? 'ФТ' : req.type === 'nonfunctional' ? 'НФТ' : 'ПТ'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[req.status]}`}>
                      {req.status === 'implemented' ? 'Реализовано' : req.status === 'drafted' ? 'Черновик' : req.status === 'proposed' ? 'Предложено' : req.status === 'reviewed' ? 'Ревью' : req.status === 'approved' ? 'Утверждено' : req.status === 'verified' ? 'Верифицир.' : req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${priorityColors[req.priority]}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${qualityColor(req.qualityScore)}`}>{req.qualityScore}</span>
                    <span className="text-slate-400 text-xs">/10</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${req.coverage >= 70 ? 'bg-emerald-500' : req.coverage >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${req.coverage}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-500">{req.coverage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-slate-600 font-medium">{req.links}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-slate-400 hover:text-indigo-600">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>Показано {filtered.length} из {requirements.length} требований</span>
          <span>Среднее качество: <strong className="text-indigo-600">{(requirements.reduce((a, r) => a + r.qualityScore, 0) / requirements.length).toFixed(1)}/10</strong></span>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReq(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-sm font-bold text-indigo-600">{selectedReq.id}</span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedReq.name}</h2>
                </div>
                <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoField label="Тип" value={selectedReq.type} />
                <InfoField label="Уровень" value={selectedReq.level} />
                <InfoField label="Статус" value={selectedReq.status} />
                <InfoField label="Приоритет" value={selectedReq.priority} />
                <InfoField label="Качество" value={`${selectedReq.qualityScore}/10`} />
                <InfoField label="Confidence" value={`${(selectedReq.confidence * 100).toFixed(0)}%`} />
                <InfoField label="Покрытие" value={`${selectedReq.coverage}%`} />
                <InfoField label="Связей" value={String(selectedReq.links)} />
                <InfoField label="Источник" value={selectedReq.source} />
                <InfoField label="Владелец" value={selectedReq.owner} />
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-2">Критерии приёмки</h4>
                <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                  <p>• Given обращение создано → When сохранено → Then уникальный номер присвоен</p>
                  <p>• Given номер присвоен → When повторное сохранение → Then номер не изменяется</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-2">Evidence</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ExternalLink size={14} className="text-slate-400" />
                    <span>DOC-003 §3.2.1 — стр. 45</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ExternalLink size={14} className="text-slate-400" />
                    <span>CODE-012: ComplaintService.java:127</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ExternalLink size={14} className="text-slate-400" />
                    <span>TEST-045: TestRegistration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-slate-900 mt-0.5 capitalize">{value}</p>
    </div>
  );
}
