import { FilterType } from '@/shared/lib/types'

interface TodoFilterProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  const filters = [
    { key: 'all' as FilterType, label: 'すべて' },
    { key: 'pending' as FilterType, label: '未完了' },
    { key: 'completed' as FilterType, label: '完了済み' }
  ]

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentFilter === key ? 'active' : ''
          }`}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}