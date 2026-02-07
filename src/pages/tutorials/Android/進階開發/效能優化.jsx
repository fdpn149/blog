
import { useTheme } from "@/hooks/useTheme";

function Page() {
    const theme = useTheme();

    return (
        <section className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">效能優化</h1>
            <div className="prose dark:prose-invert max-w-none">
                <p>這是一個範例頁面，用於展示從三方轉運站切換過來的「進階開發」路線（紅線）。</p>
                <p>如果是從「輸入法」站轉乘過來的，代表三方轉運測試成功！</p>
            </div>
        </section>
    );
}

export default Page;
