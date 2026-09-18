import { traceabilityChain, graphEdges } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Link2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Traceability() {
  const chartData = traceabilityChain.map(item => ({
    name: item.level,
    covered: item.covered,
    uncovered: item.count - item.covered,
    total: item.count,
  }));

  const totalNodes = traceabilityChain.reduce((a, b) => a + b.count, 0);
  const totalCovered = traceabilityChain.reduce((a, b) => a + b.covered, 0);
  const coveragePercent = ((totalCovered / totalNodes) * 100).toFixed(0);

  const edgeStats = {
    strong: graphEdges.filter(e => e.strength === 'strong').length,
    medium: graphEdges.filter(e => e.strength === 'medium').length,
    weak: graphEdges.filter(e => e.strength === 'weak').length,
    broken: graphEdges.filter(e => e.strength === 'broken').length,
    conflicting: graphEdges.filter(e => e.strength === 'conflicting').length,
  };

  const metrics = [
    { label: 'Требований с источником', value: '87%', target: '≥ 95%', status: 'warning' },
    { label: 'Требований с обоснованием', value: '73%', target: '≥ 90%', status: 'warning' },
    { label: 'Требований с владельцем', value: '60%', target: '≥ 85%', status: 'danger' },
    { label: 'Требований с критериями', value: '53%', target: '≥ 90%', status: 'danger' },
    { label: 'Связанных с кодом', value: '67%', target: '≥ 80%', status: 'warning' },
    { label: 'Связанных с UI', value: '43%', target: '≥ 70%', status: 'danger' },
    { label: 'Связанных с тестами', value: '33%', target: '≥ 75%', status: 'danger' },
    { label: 'Нормативных → функций', value: '61%', target: '≥ 90%', status: 'danger' },
    { label: 'Средняя глубина трассировки', value: '4.2', target: '≥ 7', status: 'warning' },
    { label: 'Orphan-требований', value: '3', target: '→ 0', status: 'warning' },
    { label: 'Конфликтных связей', value: '1', target: '→ 0', status: 'warning' },
    { label: 'Undocumented implementations', value: '2', target: '→ 0', status: 'warning' },
  ];

  const statusColors: Record<string, string> = {
    good: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Матрица трассировки</h1>
          <p className="text-slate-500 text-sm mt-1">Прослеживаемость требований от нормативных актов до тестов</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">
          Экспорт матрицы (XLSX)
        </button>
      </div>

      {/* Coverage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Общее покрытие трассировкой</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">{coveragePercent}%</p>
          <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${coveragePercent}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">{totalCovered} из {totalNodes} артефактов покрыты связями</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Сила связей</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Strong</span>
              <span className="font-bold text-slate-700">{edgeStats.strong}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Medium</span>
              <span className="font-bold text-slate-700">{edgeStats.medium}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Weak</span>
              <span className="font-bold text-slate-700">{edgeStats.weak}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Conflicting</span>
              <span className="font-bold text-red-600">{edgeStats.conflicting}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Цепочка трассировки</p>
          <div className="mt-3 text-xs space-y-1">
            <p className="text-slate-600">Legal → Business → UseCase → FR → BR → Data → UI → Code → Test</p>
            <p className="text-slate-400 mt-2">Средняя глубина: <strong className="text-slate-700">4.2 из 9</strong></p>
            <p className="text-amber-600 text-xs mt-1">⚠ Не хватает связей на уровнях Test и UI</p>
          </div>
        </div>
      </div>

      {/* Coverage Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Покрытие по уровням абстракции</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="covered" name="Покрыто" fill="#6366f1" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="uncovered" name="Не покрыто" fill="#e2e8f0" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Метрики связности</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left font-semibold text-slate-600 text-xs uppercase">Метрика</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Текущее</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Целевое</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-600 text-xs uppercase">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.map((metric, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-slate-700">{metric.label}</td>
                  <td className="px-6 py-3 text-center font-bold text-slate-900">{metric.value}</td>
                  <td className="px-6 py-3 text-center text-slate-500">{metric.target}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[metric.status]}`}>
                      {metric.status === 'good' ? '✓ Норма' : metric.status === 'warning' ? '⚠ Внимание' : '✗ Критично'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
