import { useState } from 'react';
import { graphNodes, graphEdges, GraphNode } from '../data/mockData';
import { ZoomIn, ZoomOut, Info } from 'lucide-react';

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const nodeTypeLabels: Record<string, string> = {
    legal: 'Нормативное',
    business: 'Бизнес-цель',
    usecase: 'Вариант исп.',
    functional: 'Функ. требование',
    nfr: 'Нефунк. требование',
    screen: 'Экран',
    code: 'Код-модуль',
    api: 'API',
    database: 'Таблица БД',
    test: 'Тест',
    rule: 'Бизнес-правило',
  };

  const edgeStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return '#10b981';
      case 'medium': return '#3b82f6';
      case 'weak': return '#f59e0b';
      case 'broken': return '#ef4444';
      case 'conflicting': return '#dc2626';
      default: return '#94a3b8';
    }
  };

  const connectedEdges = hoveredNode
    ? graphEdges.filter(e => e.from === hoveredNode || e.to === hoveredNode)
    : [];

  const connectedNodeIds = new Set(
    connectedEdges.flatMap(e => [e.from, e.to])
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Граф знаний</h1>
          <p className="text-slate-500 text-sm mt-1">Визуализация связей между артефактами • {graphNodes.length} узлов, {graphEdges.length} связей</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <ZoomOut size={16} />
          </button>
          <span className="text-sm text-slate-500 w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
          <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-4 text-xs">
          {Object.entries(nodeTypeLabels).map(([type, label]) => {
            const node = graphNodes.find(n => n.type === type);
            return (
              <span key={type} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: node?.color || '#94a3b8' }}></span>
                <span className="text-slate-600">{label}</span>
              </span>
            );
          })}
          <span className="ml-4 border-l border-slate-200 pl-4 flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-emerald-500 inline-block"></span> Strong</span>
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-blue-500 inline-block"></span> Medium</span>
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-amber-500 inline-block"></span> Weak</span>
            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-red-500 inline-block"></span> Conflict</span>
          </span>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative" style={{ height: '600px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 800 700`}
            className="cursor-grab"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          >
            {/* Edges */}
            {graphEdges.map((edge, i) => {
              const fromNode = graphNodes.find(n => n.id === edge.from);
              const toNode = graphNodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = hoveredNode && (edge.from === hoveredNode || edge.to === hoveredNode);
              const isDimmed = hoveredNode && !isHighlighted;

              return (
                <line
                  key={i}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={edgeStrengthColor(edge.strength)}
                  strokeWidth={isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={edge.strength === 'weak' ? '4 4' : edge.strength === 'conflicting' ? '2 2' : undefined}
                  opacity={isDimmed ? 0.1 : isHighlighted ? 1 : 0.4}
                  className="transition-all duration-200"
                />
              );
            })}

            {/* Nodes */}
            {graphNodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const isDimmed = hoveredNode && !isHovered && !isConnected;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-all duration-200"
                  style={{ opacity: isDimmed ? 0.2 : 1 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? node.size + 4 : node.size}
                    fill={node.color}
                    opacity={0.15}
                    className="transition-all duration-200"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? node.size - 2 : node.size - 5}
                    fill={node.color}
                    stroke="white"
                    strokeWidth={2}
                    className="transition-all duration-200"
                  />
                  <text
                    x={node.x}
                    y={node.y + node.size + 12}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-600 font-medium pointer-events-none"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="text-[8px] fill-white font-bold pointer-events-none"
                  >
                    {node.id.split('-')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Info tooltip */}
          {hoveredNode && (
            <div className="absolute top-4 right-4 bg-white rounded-lg border border-slate-200 shadow-lg p-3 max-w-xs">
              <div className="flex items-center gap-2 mb-1">
                <Info size={14} className="text-indigo-500" />
                <span className="font-mono text-xs font-bold text-indigo-600">{hoveredNode}</span>
              </div>
              <p className="text-sm text-slate-700">{graphNodes.find(n => n.id === hoveredNode)?.label}</p>
              <p className="text-xs text-slate-400 mt-1">
                Связей: {graphEdges.filter(e => e.from === hoveredNode || e.to === hoveredNode).length}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Node Detail */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedNode(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedNode.color, opacity: 0.2 }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: selectedNode.color }}></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-indigo-600">{selectedNode.id}</span>
                    <h2 className="text-lg font-bold text-slate-900">{selectedNode.label}</h2>
                  </div>
                </div>
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600 text-xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Тип</p>
                  <p className="text-sm font-medium text-slate-900">{nodeTypeLabels[selectedNode.type] || selectedNode.type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Входящих связей</p>
                  <p className="text-sm font-medium text-slate-900">{graphEdges.filter(e => e.to === selectedNode.id).length}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Исходящих связей</p>
                  <p className="text-sm font-medium text-slate-900">{graphEdges.filter(e => e.from === selectedNode.id).length}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase">Конфликтных</p>
                  <p className="text-sm font-medium text-red-600">{graphEdges.filter(e => (e.from === selectedNode.id || e.to === selectedNode.id) && e.strength === 'conflicting').length}</p>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-2">Связи</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {graphEdges
                    .filter(e => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge, i) => {
                      const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
                      const otherNode = graphNodes.find(n => n.id === otherId);
                      const direction = edge.from === selectedNode.id ? '→' : '←';
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="text-slate-400">{direction}</span>
                          <span className="font-mono text-xs text-indigo-600">{otherId}</span>
                          <span className="text-slate-500 text-xs">{otherNode?.label}</span>
                          <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: edgeStrengthColor(edge.strength) + '20', color: edgeStrengthColor(edge.strength) }}>
                            {edge.type}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
