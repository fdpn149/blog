export default function CourseLayout({ children, title, progress }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
       {/* 這裡放 Header (略) */}
       
       <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左側主內容 */}
          <main className="lg:col-span-8">
             <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
             {children}
          </main>

          {/* 右側 Sidebar (可選) */}
          <aside className="hidden lg:block lg:col-span-4">
             <div className="sticky top-24 bg-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-white font-bold mb-4">章節進度</h3>
                {/* 進度條 */}
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: progress }}></div>
                </div>
                <p className="text-sm text-gray-400">目前進度：{progress}</p>
             </div>
          </aside>
       </div>
    </div>
  )
}