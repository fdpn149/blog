export default function BentoAccordion({ title, children, defaultOpen = false }) {
  return (
    <details 
      className="group bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden mb-4 transition-all duration-300 hover:border-gray-600"
      open={defaultOpen}
    >
      {/* Summary: 標題列 */}
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none bg-gray-800 group-open:bg-gray-700/50 transition">
        <h3 className="text-lg font-bold text-gray-200 group-hover:text-blue-400 transition">
          {title}
        </h3>
        {/* 箭頭動畫 */}
        <span className="transform group-open:rotate-180 transition-transform duration-300 text-gray-500">
          ▼
        </span>
      </summary>
      
      {/* Content: 內容區 */}
      <div className="p-5 text-gray-300 leading-relaxed border-t border-gray-700/50">
        {children}
      </div>
    </details>
  );
}