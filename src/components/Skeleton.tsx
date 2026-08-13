// 数据加载骨架屏: 镜像真实布局的深色占位块, 世界风格(面板+发丝边框)
function P({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-edge/70 ${className}`} aria-hidden="true" />
}

export default function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="panel space-y-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2.5">
            <P className="h-3 w-28" />
            <P className="h-7 w-44" />
          </div>
          <P className="h-12 w-40 rounded-xl" />
        </div>
        <div className="flex gap-1.5 sm:gap-3">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <P key={i} className="size-9 rounded-full sm:size-16" />)}
        </div>
        <P className="h-4 w-72" />
      </div>

      <div className="panel space-y-4 p-5">
        <div className="flex items-center justify-between">
          <P className="h-5 w-24" />
          <P className="h-7 w-32 rounded-md" />
        </div>
        <P className="h-44 w-full" />
        <P className="h-32 w-full" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel space-y-3 p-5">
          <P className="h-5 w-28" />
          {[0, 1, 2, 3, 4].map((i) => <P key={i} className="h-3.5 w-full" />)}
        </div>
        <div className="panel space-y-3 p-5">
          <P className="h-5 w-28" />
          {[0, 1, 2, 3, 4].map((i) => <P key={i} className="h-3.5 w-full" />)}
        </div>
        <div className="panel space-y-3 p-5">
          <P className="h-5 w-28" />
          <P className="h-28 w-full" />
          <P className="h-3.5 w-full" />
        </div>
      </div>

      <div className="panel space-y-4 p-5">
        <div className="flex items-center justify-between">
          <P className="h-5 w-24" />
          <P className="h-8 w-56 rounded-lg" />
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <P className="h-4 w-16" />
            <P className="h-4 w-24" />
            <P className="h-4 flex-1" />
          </div>
        ))}
      </div>

      <div className="panel space-y-4 p-5">
        <div className="flex items-center justify-between">
          <P className="h-5 w-24" />
          <P className="h-8 w-40 rounded-lg" />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <P key={i} className="size-9 rounded-full" />)}
        </div>
      </div>
    </div>
  )
}
