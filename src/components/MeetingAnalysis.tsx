import { useState } from 'react';
import { meetingDeltas } from '../data/mockData';
import { Upload, Mic, FileText, CheckCircle2, Plus, AlertCircle, MessageSquare, Lightbulb, XCircle } from 'lucide-react';

export default function MeetingAnalysis() {
  const [uploaded, setUploaded] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  const typeConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string; label: string }> = {
    added: { icon: <Plus size={16} />, color: 'text-emerald-600', bgColor: 'bg-emerald-50 border-emerald-200', label: 'Добавлено' },
    modified: { icon: <FileText size={16} />, color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-200', label: 'Изменено' },
    removed: { icon: <XCircle size={16} />, color: 'text-red-600', bgColor: 'bg-red-50 border-red-200', label: 'Удалено' },
    clarified: { icon: <Lightbulb size={16} />, color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-200', label: 'Уточнено' },
    decision: { icon: <CheckCircle2 size={16} />, color: 'text-indigo-600', bgColor: 'bg-indigo-50 border-indigo-200', label: 'Решения' },
    question: { icon: <MessageSquare size={16} />, color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200', label: 'Вопросы' },
  };

  const filtered = activeTab === 'all' 
    ? meetingDeltas 
    : meetingDeltas.filter(d => d.type === activeTab);

  const totalChanges = meetingDeltas.reduce((a, d) => a + d.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Анализ встречи</h1>
          <p className="text-slate-500 text-sm mt-1">Обработка транскрибации и формирование delta-отчёта</p>
        </div>
      </div>

      {/* Upload Area */}
      {!uploaded ? (
        <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer">
          <Upload size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Загрузите транскрибацию встречи</h3>
          <p className="text-sm text-slate-500 mb-4">Поддерживаемые форматы: TXT, JSON, SRT, аудио (MP3, WAV)</p>
          <button 
            onClick={() => setUploaded(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700"
          >
            Загрузить файл
          </button>
          <p className="text-xs text-slate-400 mt-3">или перетащите файл сюда</p>
        </div>
      ) : (
        <>
          {/* Meeting Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Mic size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Встреча с заказчиком — 15 января 2026</h3>
                  <p className="text-sm text-slate-500">Длительность: 1ч 23мин • Участники: 5 • Обработано автоматически</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                ✓ Обработана
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-slate-900">{totalChanges}</p>
                <p className="text-xs text-slate-500">Всего изменений</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-emerald-700">{meetingDeltas.find(d => d.type === 'added')?.count || 0}</p>
                <p className="text-xs text-emerald-600">Новых требований</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-indigo-700">{meetingDeltas.find(d => d.type === 'decision')?.count || 0}</p>
                <p className="text-xs text-indigo-600">Решений</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-purple-700">{meetingDeltas.find(d => d.type === 'question')?.count || 0}</p>
                <p className="text-xs text-purple-600">Открытых вопросов</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Все ({totalChanges})
            </button>
            {meetingDeltas.map((delta) => {
              const config = typeConfig[delta.type];
              return (
                <button
                  key={delta.type}
                  onClick={() => setActiveTab(delta.type)}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    activeTab === delta.type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={config.color}>{config.icon}</span>
                  {config.label} ({delta.count})
                </button>
              );
            })}
          </div>

          {/* Delta Items */}
          <div className="space-y-4">
            {filtered.map((delta) => {
              const config = typeConfig[delta.type];
              return (
                <div key={delta.type} className={`rounded-xl border ${config.bgColor} p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={config.color}>{config.icon}</span>
                    <h3 className={`font-semibold ${config.color}`}>{config.label}</h3>
                    <span className="text-xs text-slate-500 ml-auto">{delta.count} записей</span>
                  </div>
                  <div className="space-y-3">
                    {delta.items.map((item) => (
                      <div key={item.id} className="bg-white/70 rounded-lg p-3 border border-white">
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded flex-shrink-0">
                            {item.id}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-slate-800">{item.text}</p>
                            {item.affects.length > 0 && (
                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                <span className="text-xs text-slate-400">Влияет на:</span>
                                {item.affects.map((a) => (
                                  <span key={a} className="text-xs font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                    {a}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generated Business Statements */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Сгенерированные бизнес-постановки</h3>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">BG-002</span>
                  <span className="text-xs text-slate-400">Новая</span>
                </div>
                <h4 className="font-medium text-slate-900 text-sm">Автоматическая классификация обращений</h4>
                <p className="text-xs text-slate-500 mt-1">Проблема: ручная маршрутизация занимает до 2 часов в день. Цель: сократить время маршрутизации на 80% с помощью ML.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">KPI: время маршрутизации</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Приоритет: Should</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Этап: 2</span>
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">BG-001-v2</span>
                  <span className="text-xs text-slate-400">Обновлённая</span>
                </div>
                <h4 className="font-medium text-slate-900 text-sm">Сокращение сроков обработки обращений</h4>
                <p className="text-xs text-slate-500 mt-1">Уточнение: срок обработки — 30 календарных дней (не рабочих). Добавлена эскалация при отсутствии исполнителя.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Решение: MTG-DEC-003</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">KPI: % просроченных</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
              Применить изменения к модели
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
              Сформировать delta-отчёт (DOCX)
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">
              Обновить реестр вопросов
            </button>
          </div>
        </>
      )}
    </div>
  );
}
