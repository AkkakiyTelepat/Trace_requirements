// ============================================
// MOCK DATA — Requirements Intelligence Platform
// ============================================

export interface Source {
  id: string;
  name: string;
  type: 'document' | 'code' | 'ui' | 'legal' | 'meeting' | 'jira' | 'confluence';
  status: 'connected' | 'syncing' | 'error' | 'pending';
  lastSync: string;
  itemsCount: number;
  icon: string;
}

export interface Requirement {
  id: string;
  name: string;
  type: 'legal' | 'business' | 'functional' | 'nonfunctional' | 'user';
  level: 'business' | 'user' | 'system' | 'implementation';
  status: 'proposed' | 'drafted' | 'clarified' | 'reviewed' | 'approved' | 'implemented' | 'verified' | 'deprecated';
  priority: 'Must' | 'Should' | 'Could' | "Won't";
  qualityScore: number;
  confidence: number;
  coverage: number;
  source: string;
  owner: string;
  links: number;
  hasConflicts: boolean;
}

export interface Gap {
  id: string;
  category: 'undocumented' | 'unimplemented' | 'conflict' | 'ambiguous' | 'missing_test' | 'missing_owner';
  severity: 'critical' | 'major' | 'minor';
  description: string;
  affectedArtifact: string;
  evidence: string;
  recommendedAction: string;
  owner: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: string;
  strength: 'strong' | 'medium' | 'weak' | 'broken' | 'conflicting';
}

export interface MeetingDelta {
  type: 'added' | 'modified' | 'removed' | 'clarified' | 'decision' | 'question';
  count: number;
  items: { id: string; text: string; affects: string[] }[];
}

export const sources: Source[] = [
  { id: 'SRC-001', name: 'Confluence — Бизнес-постановки', type: 'confluence', status: 'connected', lastSync: '2 мин назад', itemsCount: 47, icon: '📚' },
  { id: 'SRC-002', name: 'GitLab — Основной репозиторий', type: 'code', status: 'connected', lastSync: '5 мин назад', itemsCount: 1243, icon: '💻' },
  { id: 'SRC-003', name: 'ФЗ-59, ФЗ-152, Приказы', type: 'legal', status: 'connected', lastSync: '1 час назад', itemsCount: 23, icon: '⚖️' },
  { id: 'SRC-004', name: 'Figma — Макеты интерфейсов', type: 'ui', status: 'syncing', lastSync: 'синхронизация...', itemsCount: 34, icon: '🖼️' },
  { id: 'SRC-005', name: 'Jira — Бэклог проекта', type: 'jira', status: 'connected', lastSync: '10 мин назад', itemsCount: 156, icon: '📋' },
  { id: 'SRC-006', name: 'SharePoint — Системные постановки', type: 'document', status: 'connected', lastSync: '30 мин назад', itemsCount: 89, icon: '📄' },
  { id: 'SRC-007', name: 'Транскрибация встречи 15.01', type: 'meeting', status: 'connected', lastSync: 'обработана', itemsCount: 1, icon: '🎙️' },
  { id: 'SRC-008', name: 'Swagger API каталог', type: 'document', status: 'error', lastSync: 'ошибка подключения', itemsCount: 0, icon: '🔌' },
];

export const requirements: Requirement[] = [
  { id: 'FR-001', name: 'Регистрация обращения с присвоением уникального номера', type: 'functional', level: 'system', status: 'implemented', priority: 'Must', qualityScore: 8.5, confidence: 0.92, coverage: 85, source: 'DOC-003 §3.2', owner: 'Иванов А.С.', links: 7, hasConflicts: false },
  { id: 'FR-002', name: 'Маршрутизация обращения по категории', type: 'functional', level: 'system', status: 'implemented', priority: 'Must', qualityScore: 7.2, confidence: 0.88, coverage: 70, source: 'DOC-003 §3.3', owner: 'Петрова М.В.', links: 5, hasConflicts: true },
  { id: 'FR-003', name: 'Уведомление заявителя о статусе', type: 'functional', level: 'system', status: 'drafted', priority: 'Should', qualityScore: 4.1, confidence: 0.55, coverage: 30, source: 'BG-001', owner: '—', links: 2, hasConflicts: false },
  { id: 'FR-004', name: 'Контроль сроков исполнения', type: 'functional', level: 'system', status: 'implemented', priority: 'Must', qualityScore: 6.8, confidence: 0.81, coverage: 60, source: 'LEG-012', owner: 'Сидоров К.Л.', links: 4, hasConflicts: false },
  { id: 'FR-005', name: 'Экспорт обращений в Excel', type: 'functional', level: 'implementation', status: 'implemented', priority: 'Could', qualityScore: 5.0, confidence: 0.95, coverage: 90, source: 'CODE-012', owner: '—', links: 1, hasConflicts: false },
  { id: 'FR-006', name: 'Интеграция с ЕСИА для авторизации', type: 'functional', level: 'system', status: 'reviewed', priority: 'Must', qualityScore: 7.9, confidence: 0.75, coverage: 45, source: 'DOC-005 §2.1', owner: 'Козлов Д.А.', links: 3, hasConflicts: false },
  { id: 'FR-007', name: 'Автоматическая классификация обращений (ML)', type: 'functional', level: 'system', status: 'proposed', priority: 'Should', qualityScore: 3.2, confidence: 0.40, coverage: 10, source: 'MTG-001', owner: '—', links: 0, hasConflicts: false },
  { id: 'NFR-001', name: 'Время отклика API < 500мс', type: 'nonfunctional', level: 'system', status: 'verified', priority: 'Must', qualityScore: 9.0, confidence: 0.98, coverage: 95, source: 'DOC-003 §5.1', owner: 'Архитектор', links: 6, hasConflicts: false },
  { id: 'NFR-002', name: 'Аудит-лог всех действий пользователей', type: 'nonfunctional', level: 'system', status: 'implemented', priority: 'Must', qualityScore: 8.0, confidence: 0.90, coverage: 80, source: 'LEG-015', owner: 'Сидоров К.Л.', links: 4, hasConflicts: false },
  { id: 'LEG-001', name: 'Ведение учёта обращений граждан (ФЗ-59 ст.8)', type: 'legal', level: 'business', status: 'implemented', priority: 'Must', qualityScore: 3.0, confidence: 0.95, coverage: 55, source: 'ФЗ-59 ст.8', owner: 'Юрист', links: 8, hasConflicts: true },
  { id: 'LEG-002', name: 'Защита персональных данных (ФЗ-152)', type: 'legal', level: 'business', status: 'implemented', priority: 'Must', qualityScore: 4.5, confidence: 0.85, coverage: 65, source: 'ФЗ-152 ст.19', owner: 'Юрист', links: 6, hasConflicts: false },
  { id: 'BG-001', name: 'Сокращение времени обработки обращений на 30%', type: 'business', level: 'business', status: 'clarified', priority: 'Must', qualityScore: 7.8, confidence: 0.82, coverage: 50, source: 'Постановление №12', owner: 'Директор', links: 5, hasConflicts: false },
  { id: 'UC-001', name: 'Регистрация обращения гражданином', type: 'user', level: 'user', status: 'approved', priority: 'Must', qualityScore: 8.2, confidence: 0.90, coverage: 75, source: 'DOC-003 §4.1', owner: 'БА Аналитик', links: 6, hasConflicts: false },
  { id: 'FR-008', name: 'Формирование отчёта по просроченным обращениям', type: 'functional', level: 'system', status: 'drafted', priority: 'Should', qualityScore: 5.5, confidence: 0.60, coverage: 25, source: 'BG-001', owner: 'Петрова М.В.', links: 2, hasConflicts: false },
  { id: 'FR-009', name: 'Массовая рассылка уведомлений', type: 'functional', level: 'system', status: 'proposed', priority: "Won't", qualityScore: 2.8, confidence: 0.35, coverage: 5, source: 'MTG-001', owner: '—', links: 0, hasConflicts: false },
];

export const gaps: Gap[] = [
  { id: 'GAP-001', category: 'undocumented', severity: 'major', description: 'Кнопка "Экспорт в Excel" реализована в коде, но отсутствует в документации', affectedArtifact: 'CODE-012', evidence: 'ComplaintExportController.java:45', recommendedAction: 'Добавить в FR или удалить из кода', owner: 'Петрова М.В.' },
  { id: 'GAP-002', category: 'unimplemented', severity: 'critical', description: 'Требование об уведомлении заявителя (FR-003) не реализовано ни в коде, ни в UI', affectedArtifact: 'FR-003', evidence: 'Отсутствует в коде и UI', recommendedAction: 'Создать задачу на реализацию или пересмотреть требование', owner: 'Петрова М.В.' },
  { id: 'GAP-003', category: 'conflict', severity: 'major', description: 'В документации статус "Обрабатывается", в UI отображается "В работе"', affectedArtifact: 'FR-002', evidence: 'DOC-003 §3.3 vs SCR-005', recommendedAction: 'Унифицировать терминологию статусов', owner: 'Иванов А.С.' },
  { id: 'GAP-004', category: 'missing_test', severity: 'major', description: 'FR-004 (контроль сроков) не покрыт автотестами', affectedArtifact: 'FR-004', evidence: 'Нет тестов в /tests/deadline/', recommendedAction: 'Написать unit и integration тесты', owner: 'QA Lead' },
  { id: 'GAP-005', category: 'ambiguous', severity: 'minor', description: 'LEG-001 не определяет состав реквизитов учёта обращения', affectedArtifact: 'LEG-001', evidence: 'ФЗ-59 ст.8 п.1 — расплывчатая формулировка', recommendedAction: 'Запросить разъяснение у юриста', owner: 'Юрист' },
  { id: 'GAP-006', category: 'missing_owner', severity: 'minor', description: 'FR-005 (экспорт в Excel) не имеет назначенного владельца', affectedArtifact: 'FR-005', evidence: 'Поле owner = null', recommendedAction: 'Назначить владельца', owner: 'PM' },
  { id: 'GAP-007', category: 'unimplemented', severity: 'major', description: 'Интеграция с ЕСИА (FR-006) реализована частично — только авторизация, без профиля', affectedArtifact: 'FR-006', evidence: 'EsiaController.java: только /auth endpoint', recommendedAction: 'Реализовать получение профиля или уточнить scope', owner: 'Козлов Д.А.' },
  { id: 'GAP-008', category: 'conflict', severity: 'critical', description: 'LEG-001 требует срок 30 дней, в коде установлен срок 20 дней', affectedArtifact: 'LEG-001', evidence: 'DeadlineConfig.java:20 vs ФЗ-59 ст.12', recommendedAction: 'Исправить конфигурацию на 30 дней', owner: 'Архитектор' },
];

export const graphNodes: GraphNode[] = [
  { id: 'LEG-001', label: 'ФЗ-59 ст.8', type: 'legal', x: 400, y: 50, size: 28, color: '#ef4444' },
  { id: 'LEG-002', label: 'ФЗ-152', type: 'legal', x: 550, y: 80, size: 24, color: '#ef4444' },
  { id: 'BG-001', label: 'Сокращение сроков', type: 'business', x: 300, y: 160, size: 26, color: '#f59e0b' },
  { id: 'UC-001', label: 'Регистрация обращения', type: 'usecase', x: 200, y: 270, size: 22, color: '#8b5cf6' },
  { id: 'FR-001', label: 'Регистрация с номером', type: 'functional', x: 120, y: 370, size: 20, color: '#3b82f6' },
  { id: 'FR-002', label: 'Маршрутизация', type: 'functional', x: 280, y: 370, size: 20, color: '#3b82f6' },
  { id: 'FR-003', label: 'Уведомление', type: 'functional', x: 420, y: 370, size: 20, color: '#3b82f6' },
  { id: 'FR-004', label: 'Контроль сроков', type: 'functional', x: 550, y: 370, size: 20, color: '#3b82f6' },
  { id: 'FR-006', label: 'Интеграция ЕСИА', type: 'functional', x: 680, y: 370, size: 20, color: '#3b82f6' },
  { id: 'NFR-001', label: 'API < 500мс', type: 'nfr', x: 700, y: 160, size: 18, color: '#06b6d4' },
  { id: 'NFR-002', label: 'Аудит-лог', type: 'nfr', x: 750, y: 270, size: 18, color: '#06b6d4' },
  { id: 'SCR-003', label: 'Экран регистрации', type: 'screen', x: 100, y: 480, size: 16, color: '#10b981' },
  { id: 'SCR-005', label: 'Список обращений', type: 'screen', x: 280, y: 480, size: 16, color: '#10b981' },
  { id: 'CODE-012', label: 'ComplaintService', type: 'code', x: 150, y: 570, size: 16, color: '#6366f1' },
  { id: 'CODE-015', label: 'RoutingService', type: 'code', x: 320, y: 570, size: 16, color: '#6366f1' },
  { id: 'API-001', label: 'POST /complaints', type: 'api', x: 480, y: 570, size: 16, color: '#ec4899' },
  { id: 'DBT-001', label: 'complaints', type: 'database', x: 620, y: 570, size: 16, color: '#78716c' },
  { id: 'TEST-045', label: 'TestRegistration', type: 'test', x: 150, y: 650, size: 14, color: '#a3e635' },
  { id: 'BR-001', label: 'Уникальный номер', type: 'rule', x: 450, y: 480, size: 16, color: '#fb923c' },
];

export const graphEdges: GraphEdge[] = [
  { from: 'LEG-001', to: 'BG-001', type: 'derived_from', strength: 'strong' },
  { from: 'LEG-001', to: 'FR-001', type: 'satisfies', strength: 'strong' },
  { from: 'LEG-001', to: 'FR-004', type: 'satisfies', strength: 'medium' },
  { from: 'LEG-002', to: 'NFR-002', type: 'satisfies', strength: 'strong' },
  { from: 'LEG-002', to: 'FR-006', type: 'constrained_by', strength: 'medium' },
  { from: 'BG-001', to: 'UC-001', type: 'derived_from', strength: 'strong' },
  { from: 'BG-001', to: 'FR-003', type: 'derived_from', strength: 'medium' },
  { from: 'UC-001', to: 'FR-001', type: 'implements', strength: 'strong' },
  { from: 'UC-001', to: 'FR-002', type: 'implements', strength: 'strong' },
  { from: 'FR-001', to: 'SCR-003', type: 'displayed_on', strength: 'strong' },
  { from: 'FR-001', to: 'CODE-012', type: 'implements', strength: 'strong' },
  { from: 'FR-001', to: 'BR-001', type: 'constrained_by', strength: 'strong' },
  { from: 'FR-002', to: 'SCR-005', type: 'displayed_on', strength: 'medium' },
  { from: 'FR-002', to: 'CODE-015', type: 'implements', strength: 'strong' },
  { from: 'FR-003', to: 'API-001', type: 'implements', strength: 'weak' },
  { from: 'FR-004', to: 'DBT-001', type: 'stored_in', strength: 'medium' },
  { from: 'CODE-012', to: 'DBT-001', type: 'stored_in', strength: 'strong' },
  { from: 'CODE-012', to: 'TEST-045', type: 'tested_by', strength: 'strong' },
  { from: 'SCR-003', to: 'API-001', type: 'displayed_on', strength: 'medium' },
  { from: 'FR-002', to: 'FR-003', type: 'contradicts', strength: 'conflicting' },
  { from: 'NFR-001', to: 'API-001', type: 'constrained_by', strength: 'strong' },
  { from: 'NFR-002', to: 'CODE-012', type: 'constrained_by', strength: 'medium' },
];

export const meetingDeltas: MeetingDelta[] = [
  { type: 'added', count: 3, items: [
    { id: 'FR-007', text: 'Автоматическая классификация обращений (ML)', affects: ['BG-001'] },
    { id: 'FR-009', text: 'Массовая рассылка уведомлений', affects: ['FR-003'] },
    { id: 'NFR-003', text: 'Мобильная адаптация интерфейса', affects: ['UC-001'] },
  ]},
  { type: 'modified', count: 2, items: [
    { id: 'FR-002', text: 'Маршрутизация: добавить эскалацию при отсутствии исполнителя', affects: ['BR-ROUTE-001'] },
    { id: 'FR-004', text: 'Срок исполнения: изменить с 20 на 30 дней (соответствие ФЗ)', affects: ['LEG-001'] },
  ]},
  { type: 'removed', count: 1, items: [
    { id: 'FR-010', text: 'Интеграция с почтовым сервером (отложена на этап 2)', affects: [] },
  ]},
  { type: 'clarified', count: 4, items: [
    { id: 'QST-001', text: 'Состав реквизитов учёта обращения — определён', affects: ['LEG-001'] },
    { id: 'QST-003', text: 'Каналы приёма: только веб + email, без бумажного', affects: ['UC-001'] },
    { id: 'QST-005', text: 'Ролевая модель: 3 роли (оператор, исполнитель, руководитель)', affects: ['FR-006'] },
    { id: 'QST-008', text: 'Формат номера: YYYY-NNNNN подтверждён', affects: ['BR-001'] },
  ]},
  { type: 'decision', count: 3, items: [
    { id: 'MTG-DEC-001', text: 'Использовать существующий справочник категорий без изменений', affects: ['FR-002'] },
    { id: 'MTG-DEC-002', text: 'Отложить ML-классификацию на этап 2', affects: ['FR-007'] },
    { id: 'MTG-DEC-003', text: 'Срок обработки: 30 календарных дней (не рабочих)', affects: ['FR-004', 'LEG-001'] },
  ]},
  { type: 'question', count: 2, items: [
    { id: 'QST-012', text: 'Нужна ли интеграция с ГИС ЖКХ на этапе 1?', affects: [] },
    { id: 'QST-013', text: 'Какой формат выгрузки для отчётности в надзорные органы?', affects: [] },
  ]},
];

export const qualityMetrics = {
  overallScore: 5.8,
  completeness: 62,
  consistency: 71,
  traceability: 48,
  testability: 55,
  clarity: 64,
  legalCoverage: 58,
  codeCoverage: 67,
  uiCoverage: 43,
};

export const scoreHistory = [
  { month: 'Сен', score: 2.5 },
  { month: 'Окт', score: 3.1 },
  { month: 'Ноя', score: 3.8 },
  { month: 'Дек', score: 4.5 },
  { month: 'Янв', score: 5.2 },
  { month: 'Фев', score: 5.8 },
];

export const requirementsByType = [
  { name: 'Функциональные', value: 9, color: '#3b82f6' },
  { name: 'Нефункц.', value: 2, color: '#06b6d4' },
  { name: 'Нормативные', value: 2, color: '#ef4444' },
  { name: 'Бизнес', value: 1, color: '#f59e0b' },
  { name: 'User', value: 1, color: '#8b5cf6' },
];

export const coverageByStatus = [
  { status: 'Реализовано', count: 6, color: '#10b981' },
  { status: 'Черновик', count: 2, color: '#f59e0b' },
  { status: 'Предложено', count: 2, color: '#94a3b8' },
  { status: 'На ревью', count: 1, color: '#3b82f6' },
  { status: 'Утверждено', count: 1, color: '#8b5cf6' },
  { status: 'Верифицировано', count: 1, color: '#06b6d4' },
  { status: 'Не реализовано', count: 2, color: '#ef4444' },
];

export const traceabilityChain = [
  { level: 'Legal Clause', count: 23, covered: 14, color: '#ef4444' },
  { level: 'Business Goal', count: 8, covered: 7, color: '#f59e0b' },
  { level: 'Use Case', count: 12, covered: 10, color: '#8b5cf6' },
  { level: 'Functional Req', count: 15, covered: 12, color: '#3b82f6' },
  { level: 'Business Rule', count: 18, covered: 11, color: '#fb923c' },
  { level: 'Data Entity', count: 9, covered: 8, color: '#78716c' },
  { level: 'Screen/API', count: 14, covered: 11, color: '#10b981' },
  { level: 'Code Module', count: 22, covered: 19, color: '#6366f1' },
  { level: 'Test', count: 15, covered: 8, color: '#a3e635' },
];
