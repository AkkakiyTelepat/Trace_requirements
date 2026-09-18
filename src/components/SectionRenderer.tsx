import { Section, ContentBlock } from '../data/sections';

interface SectionRendererProps {
  section: Section;
  index: number;
}

export default function SectionRenderer({ section, index }: SectionRendererProps) {
  return (
    <article className="prose prose-slate max-w-none">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{section.icon}</span>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-wider">
            Раздел {index + 1} из 21
          </span>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-6">
        {section.content.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    </article>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock level={block.level} text={block.text} />;
    case 'paragraph':
      return <p className="text-gray-700 leading-relaxed text-[15px]">{block.text}</p>;
    case 'list':
      return <ListBlock items={block.items} ordered={block.ordered} />;
    case 'table':
      return <TableBlock headers={block.headers} rows={block.rows} />;
    case 'code':
      return <CodeBlock language={block.language} code={block.code} />;
    case 'callout':
      return <CalloutBlock variant={block.variant} title={block.title} text={block.text} />;
    case 'card':
      return <CardBlock title={block.title} subtitle={block.subtitle} items={block.items} />;
    case 'badge':
      return <BadgeBlock text={block.text} variant={block.variant} />;
    default:
      return null;
  }
}

function HeadingBlock({ level, text }: { level: 2 | 3 | 4; text: string }) {
  switch (level) {
    case 2:
      return <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{text}</h2>;
    case 3:
      return <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
        {text}
      </h3>;
    case 4:
      return <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">{text}</h4>;
  }
}

function ListBlock({ items, ordered }: { items: string[]; ordered?: boolean }) {
  if (ordered) {
    return (
      <ol className="space-y-2 ml-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-gray-700 text-[15px] leading-relaxed">
            <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-gray-700 text-[15px] leading-relaxed">
          <span className="flex-shrink-0 w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-800 text-white">
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700 text-[13px] leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
        </div>
      </div>
      <pre className="bg-slate-900 p-4 overflow-x-auto">
        <code className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function CalloutBlock({ variant, title, text }: { variant: 'info' | 'warning' | 'success' | 'danger'; title: string; text: string }) {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '💡', titleColor: 'text-blue-800', textColor: 'text-blue-700' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: '⚠️', titleColor: 'text-amber-800', textColor: 'text-amber-700' },
    success: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '✅', titleColor: 'text-emerald-800', textColor: 'text-emerald-700' },
    danger: { bg: 'bg-red-50', border: 'border-red-200', icon: '❌', titleColor: 'text-red-800', textColor: 'text-red-700' },
  };
  const s = styles[variant];

  return (
    <div className={`${s.bg} ${s.border} border rounded-xl p-5`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{s.icon}</span>
        <div>
          <h4 className={`font-semibold ${s.titleColor} mb-1`}>{title}</h4>
          <p className={`${s.textColor} text-sm leading-relaxed whitespace-pre-line`}>{text}</p>
        </div>
      </div>
    </div>
  );
}

function CardBlock({ title, subtitle, items }: { title: string; subtitle?: string; items: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        {subtitle && <p className="text-sm text-indigo-600 mt-1">{subtitle}</p>}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
            <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center text-xs font-bold mt-0.5">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BadgeBlock({ text, variant }: { text: string; variant: 'blue' | 'green' | 'red' | 'yellow' | 'purple' }) {
  const styles = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {text}
    </span>
  );
}
