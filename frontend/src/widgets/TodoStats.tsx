import { Card } from '@/shared/ui'

interface TodoStatsProps {
  stats: {
    total: number
    pending: number
    completed: number
  }
}

export default function TodoStats({ stats }: TodoStatsProps) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-white">{stats.total}</div>
        <div className="text-sm text-gray-300">合計</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
        <div className="text-sm text-gray-300">未完了</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
        <div className="text-sm text-gray-300">完了済み</div>
      </Card>
    </div>
  )
}