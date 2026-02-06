import React, { useState, useEffect } from 'react';
import Image from "@/utils/Image";

// --- Design System & Components ---

const cn = (...classes) => classes.filter(Boolean).join(' ');

// 1. 互動式關鍵字 (TermLink)
const TermLink = ({ term, activeTerm, onClick, children, color = "blue" }) => {
    const isActive = activeTerm === term;
    const colors = {
        blue: "decoration-blue-400/50 hover:bg-blue-500/20 text-blue-200",
        green: "decoration-green-400/50 hover:bg-green-500/20 text-green-200",
        purple: "decoration-purple-400/50 hover:bg-purple-500/20 text-purple-200",
    };

    return (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(term); }}
            className={cn(
                "inline-block px-1 -mx-1 rounded-md transition-all duration-300 cursor-pointer underline decoration-2 underline-offset-4 font-medium",
                isActive ? "bg-white/10 text-white decoration-transparent scale-105" : colors[color] || colors.blue
            )}
        >
            {children}
        </button>
    );
};

// 2. 章節包裝 (Chapter)
const Chapter = ({ id, title, icon, color = "bg-blue-500", children }) => (
    <section id={id} className="relative scroll-mt-32 group">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent group-hover:via-gray-500 transition-colors" />
        <div className="pl-8 py-4">
            <div className="flex items-center gap-4 mb-8">
                <span className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ring-1 ring-white/10", color, "bg-opacity-20 backdrop-blur-md")}>
                    {icon}
                </span>
                <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            </div>
            <div className="space-y-12">
                {children}
            </div>
        </div>
    </section>
);

// 3. 視覺化容器 (VisualCard)
const VisualCard = ({ title, children, sideContent }) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-1 rounded-3xl bg-gray-900/40 border border-white/5 overflow-hidden ring-1 ring-black/20">
        <div className="md:col-span-3 p-6 md:p-8 space-y-4">
            {title && <h3 className="text-xl font-bold text-gray-100">{title}</h3>}
            <div className="text-gray-400 leading-relaxed space-y-4">
                {children}
            </div>
        </div>
        {sideContent && (
            <div className="md:col-span-2 bg-black/20 p-6 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-white/5 relative">
                {sideContent}
            </div>
        )}
    </div>
);

// 4. 數學矩陣 (Matrix)
const Matrix = ({ rows, label }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="inline-flex text-lg font-mono relative mx-2 align-middle">
            <div className="absolute top-0 bottom-0 left-0 w-3 border-l-2 border-t-2 border-b-2 border-gray-600 rounded-l-md"></div>
            <div className="grid gap-y-1 gap-x-3 px-4 py-2">
                {rows.map((row, i) => (
                    <div key={i} className="flex justify-center gap-3">
                        {row.map((val, j) => <span key={j} className="w-8 text-center text-gray-300">{val}</span>)}
                    </div>
                ))}
            </div>
            <div className="absolute top-0 bottom-0 right-0 w-3 border-r-2 border-t-2 border-b-2 border-gray-600 rounded-r-md"></div>
        </div>
        {label && <span className="text-xs text-gray-500 font-mono tracking-wider uppercase">{label}</span>}
    </div>
);

// 輔助：帶顏色的公式項目 (保留原有名稱和參數)
const ColorFormula = ({ c1, n1, c2, n2, resColor, resName, label }) => (
    <li className="flex items-center gap-2 text-sm font-mono">
        <span className={`w-3 h-3 rounded-full ${c1}`}></span> {n1} +
        <span className={`w-3 h-3 rounded-full ${c2}`}></span> {n2} =
        <span className={`font-bold ${resColor}`}>{resName}</span>
        {label && <span className="text-gray-500 text-xs ml-auto">{label}</span>}
    </li>
);

// --- Main Content ---

export default function MultimediaFullNotes() {
    const [activeTerm, setActiveTerm] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // 監聽滾動以改變 Header 樣式
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTerm = (term) => setActiveTerm(prev => prev === term ? null : term);

    // 擴充知識庫 (保留所有中文內容)
    const knowledgeMap = {
        sampling: {
            title: "Sampling (取樣)",
            icon: "📉",
            color: "from-blue-500 to-cyan-400",
            desc: "將連續的類比訊號在時間或空間上做切割。取樣頻率決定了還原後的精細度。",
            note: "平滑曲線 -> 格狀像素"
        },
        quantization: {
            title: "Quantization (量化)",
            icon: "🔢",
            color: "from-green-500 to-emerald-400",
            desc: "將取樣後的振幅數值映射到有限的整數範圍 (例如 0~255)。",
            note: "色彩深度 (Bit Depth) 來源"
        },
        cones: {
            title: "視錐細胞 (Cones)",
            icon: "👁️",
            color: "from-rose-500 to-orange-400",
            desc: "負責感知顏色，對強光敏感。分為感知紅(L)、綠(M)、藍(S)波長的三種。",
            note: "數量分佈 G:R:B = 4:2:1"
        },
        rgb: { title: "RGB", icon: "🔴", color: "from-red-500 to-blue-500", desc: "加色法混色。R+G=Y, R+G+B=W。用於螢幕顯示。", note: "0~255, 8-bits" },
        cmyk: { title: "CMYK", icon: "🖨️", color: "from-cyan-500 to-yellow-400", desc: "減色法混色。C+M=B, C+M+Y=K(黑)。用於印刷。", note: "K = Key (Black)" },
        hsl: { title: "HSL", icon: "🎨", color: "from-purple-500 to-pink-500", desc: "Hue(色相), Saturation(飽和度), Luminance(亮度)。更符合人類直覺的色彩描述。", note: "圓柱座標系" },
        gamma: { title: "Gamma 校正", icon: "〰️", color: "from-yellow-500 to-orange-400", desc: "對抗 CRT 螢幕非線性輸出以及人眼對暗部敏感的特性。", note: "V_out = V_in ^ gamma" },
        sobel: { title: "Sobel Filter", icon: "📐", color: "from-teal-500 to-emerald-400", desc: "透過計算梯度的微分來尋找影像邊緣。", note: "包含水平與垂直兩個遮罩" },
        convolution: { title: "Convolution (卷積)", icon: "⚙️", color: "from-amber-500 to-orange-500", desc: "將 Kernel 翻轉後與影像相乘加總。CNN 的基礎。", note: "Flip -> Multiply -> Sum" },
        cnn: { title: "CNN", icon: "🧠", color: "from-indigo-500 to-violet-500", desc: "卷積神經網路。利用 Filters 擷取局部特徵，解決全連接層參數過多的問題。", note: "Parameter Sharing" }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[100px]" />
            </div>

            {/* Navigation */}
            <nav className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b",
                scrolled ? "bg-[#0a0a0c]/80 backdrop-blur-xl border-white/5 py-4" : "bg-transparent border-transparent py-6"
            )}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <a href="#" className="flex items-center gap-2 group">
                            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-black group-hover:scale-110 transition-transform">S</span>
                            <span className="font-bold text-white tracking-wide">SKILLBOX.</span>
                        </a>
                    </div>
                    <div className="flex gap-6 text-sm font-medium text-gray-400">
                        <a href="#digitization" className="hover:text-white transition-colors">數位化</a>
                        <a href="#color-space" className="hover:text-white transition-colors">色彩空間</a>
                        <a href="#filters" className="hover:text-white transition-colors">影像濾鏡</a>
                        <a href="#dl" className="hover:text-white transition-colors">Deep Learning</a>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 relative pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Article */}
                    <main className="lg:col-span-8 space-y-20">

                        {/* Hero Section */}
                        <header className="space-y-6 mb-20 border-b border-white/10 pb-10">
                            <div className="flex gap-2">
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">筆記整理</span>
                                <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-bold border border-white/10">影像處理</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.2]">
                                多媒體系統 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">完整學習筆記</span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                                涵蓋從影像數位化、色彩學、視覺感知、影像濾鏡運算到深度學習 CNN 的完整學習歷程。
                            </p>
                        </header>

                        {/* Part 1: 數位化 */}
                        <Chapter id="digitization" title="類比影像 → 數位影像" icon="🔳" color="bg-blue-500">
                            <p className="text-lg leading-relaxed text-gray-300">
                                核心步驟：
                                <TermLink term="sampling" activeTerm={activeTerm} onClick={toggleTerm} color="blue">Sampling</TermLink> +
                                <TermLink term="quantization" activeTerm={activeTerm} onClick={toggleTerm} color="green">Quantization</TermLink>
                            </p>

                            <VisualCard
                                title="1. Sampling (取樣)"
                                sideContent={
                                    <Image path="/notes/多媒體/Untitled" alt="取樣示意圖" className="w-full mix-blend-screen opacity-90" />
                                }
                            >
                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>將類比資料以一定間隔 (時間、像素) 取值，離散化。</li>
                                    <li>結果：平滑圖案變成一格一格。</li>
                                </ul>
                            </VisualCard>

                            <VisualCard
                                title="2. Quantization (量化)"
                                sideContent={
                                    <div className="space-y-4">
                                        <Image path="/notes/多媒體/Untitled 1" alt="量化階層" className="w-full rounded-lg" />
                                        <Image path="/notes/多媒體/Untitled 2" alt="色彩深度" className="w-full rounded-lg" />
                                    </div>
                                }
                            >
                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>將數值映射到有限範圍。</li>
                                    <li>例 1：現實顏色 (∞) → 螢幕顯示 (16,777,216種)。</li>
                                    <li>例 2：彩色 (24 bytes) → 灰階 (8 bytes)。</li>
                                </ul>
                            </VisualCard>
                        </Chapter>

                        {/* Part 2: 眼睛成像 */}
                        <Chapter id="eye" title="眼睛的成像" icon="👁️" color="bg-pink-500">
                            <ul className="space-y-3 text-gray-300 list-disc pl-5">
                                <li>水晶體當作鏡頭，成像在視網膜。</li>
                                <li>視網膜有 <TermLink term="cones" activeTerm={activeTerm} onClick={toggleTerm} color="purple">視錐 (Cones)</TermLink> 與視桿 (Rods) 細胞。</li>
                                <li>
                                    視網膜對顏色的敏感度比例：
                                    <span className="bg-gray-800 px-2 py-1 rounded font-mono font-bold text-white mx-1 border border-gray-700">G:R:B = 4:2:1</span>
                                </li>
                            </ul>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <Image path="/notes/多媒體/Untitled 3" alt="眼睛構造" className="rounded-xl border border-gray-700" />
                                <Image path="/notes/多媒體/Untitled 4" alt="視錐細胞反應" className="rounded-xl border border-gray-700" />
                            </div>

                            <div className="mt-6 bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-xl">
                                <p className="text-sm text-blue-200">
                                    💡 <strong>積分運算：</strong> 眼睛會將看到的顏色做類似積分的運算。
                                </p>
                            </div>
                        </Chapter>

                        {/* Part 3: 色彩空間 */}
                        <Chapter id="color-space" title="色彩空間 (Color Space)" icon="🎨" color="bg-yellow-500">
                            <p className="mb-4 text-gray-400">彩色影像由 3 個不唯一的 Bands 組成。</p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <Image path="/notes/多媒體/Untitled 137" alt="Color Bands" className="rounded-xl border border-gray-700 w-full" />
                                <Image path="/notes/多媒體/Untitled 5" alt="影像合成" className="rounded-xl border border-gray-700 w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* RGB */}
                                <div className={cn(
                                    "p-6 rounded-2xl bg-[#1a1b26] border transition-colors",
                                    activeTerm === 'rgb' ? "border-red-500/50 ring-1 ring-red-500/20" : "border-white/5 hover:border-white/10"
                                )}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-white text-lg"><TermLink term="rgb" activeTerm={activeTerm} onClick={toggleTerm} color="blue">RGB 加色法</TermLink></h3>
                                        <span className="text-xs bg-red-900/30 text-red-200 px-2 py-1 rounded border border-red-500/20">螢幕/光</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <Image path="/notes/多媒體/Untitled 6" alt="" className="h-20 w-full object-cover rounded-lg" />
                                        <Image path="/notes/多媒體/Untitled 7" alt="" className="h-20 w-full object-cover rounded-lg" />
                                    </div>
                                    <ul className="space-y-2 mb-4">
                                        <ColorFormula c1="bg-red-500" n1="紅" c2="bg-green-500" n2="綠" resColor="text-yellow-400" resName="黃" />
                                        <ColorFormula c1="bg-green-500" n1="綠" c2="bg-blue-500" n2="藍" resColor="text-cyan-400" resName="青" />
                                        <ColorFormula c1="bg-blue-500" n1="藍" c2="bg-red-500" n2="紅" resColor="text-fuchsia-400" resName="洋紅" />
                                    </ul>
                                    <div className="text-center text-xs text-gray-400 mt-2 border-t border-white/5 pt-2">R+G+B = <span className="text-white font-bold">白</span> (越疊越亮)</div>
                                </div>

                                {/* CMYK */}
                                <div className={cn(
                                    "p-6 rounded-2xl bg-[#1a1b26] border transition-colors",
                                    activeTerm === 'cmyk' ? "border-cyan-500/50 ring-1 ring-cyan-500/20" : "border-white/5 hover:border-white/10"
                                )}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-white text-lg"><TermLink term="cmyk" activeTerm={activeTerm} onClick={toggleTerm} color="green">CMYK 減色法</TermLink></h3>
                                        <span className="text-xs bg-cyan-900/30 text-cyan-200 px-2 py-1 rounded border border-cyan-500/20">印刷</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <Image path="/notes/多媒體/Untitled 8" alt="" className="h-20 w-full object-cover rounded-lg" />
                                        <Image path="/notes/多媒體/Untitled 9" alt="" className="h-20 w-full object-cover rounded-lg" />
                                    </div>
                                    <ul className="space-y-2 mb-4">
                                        <ColorFormula c1="bg-fuchsia-400" n1="洋紅" c2="bg-yellow-400" n2="黃" resColor="text-red-500" resName="紅" />
                                        <ColorFormula c1="bg-yellow-400" n1="黃" c2="bg-cyan-400" n2="青" resColor="text-green-500" resName="綠" />
                                        <ColorFormula c1="bg-cyan-400" n1="青" c2="bg-fuchsia-400" n2="洋紅" resColor="text-blue-500" resName="藍" />
                                    </ul>
                                    <div className="text-center text-xs text-gray-400 mt-2 border-t border-white/5 pt-2">C+M+Y = <span className="text-gray-500 font-bold">黑</span> (越疊越暗)</div>
                                    <div className="mt-2 bg-black/30 p-2 rounded text-xs text-gray-400">
                                        <strong>為什麼是 K (Key)?</strong> 獨立黑色油墨可節省成本，避免疊加過濕。
                                    </div>
                                </div>
                            </div>
                        </Chapter>

                        {/* Part 4: HSL */}
                        <Chapter id="hsl" title="HSL 色彩空間" icon="🌈" color="bg-green-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <Image path="/notes/多媒體/Untitled 12" alt="Color Cube" className="h-32 rounded-lg border border-gray-700" />
                                        <Image path="/notes/多媒體/Untitled 13" alt="Color Cube" className="h-32 rounded-lg border border-gray-700" />
                                    </div>
                                    <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10">
                                        <h3 className="text-lg font-bold text-white mb-4">圓柱座標系</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <span className="bg-blue-500 text-white px-2 rounded font-bold text-xs mt-1">H</span>
                                                <div className="text-sm text-gray-300">
                                                    <strong className="text-blue-300 block">Hue (色相)</strong> 角度
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="bg-green-500 text-white px-2 rounded font-bold text-xs mt-1">S</span>
                                                <div className="text-sm text-gray-300">
                                                    <strong className="text-green-300 block">Saturation (飽和度)</strong> 半徑
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Image path="/notes/多媒體/Untitled 138" alt="HSL 模型" className="w-full rounded-xl border border-gray-700" />
                                    <Image path="/notes/多媒體/Untitled 14" alt="HSL 剖面" className="w-full rounded-xl border border-gray-700" />
                                </div>
                            </div>
                        </Chapter>

                        {/* Part 5: 物體顏色與 Halftone */}
                        <Chapter id="halftone" title="物體顏色與 Halftone" icon="🌔" color="bg-orange-500">
                            <VisualCard title="為什麼物體有顏色？" sideContent={
                                <Image path="/notes/多媒體/Untitled 19" alt="光線反射" className="w-full opacity-80" />
                            }>
                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                    <li><strong>發光體</strong>：加法混色。</li>
                                    <li><strong>反光體</strong>：減法混色。</li>
                                </ul>
                            </VisualCard>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-white mb-4">Halftone Screen Angles</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <Image path="/notes/多媒體/Untitled 20" alt="排列效果" className="rounded-xl border border-gray-700 w-full" />
                                    <Image path="/notes/多媒體/Untitled 21" alt="排列效果" className="rounded-xl border border-gray-700 w-full" />
                                </div>

                                <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-2xl flex items-center gap-6">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-red-200 mb-2">如何消除 Halftone Noise?</h4>
                                        <p className="text-sm text-gray-400">使用傅立葉轉換找出頻譜中的雜訊位置並消除。</p>
                                    </div>
                                    <div className="w-32">
                                        <Image path="/notes/多媒體/Untitled 139" alt="頻譜圖" className="rounded-lg border border-gray-700" />
                                    </div>
                                </div>
                            </div>
                        </Chapter>

                        {/* Part 9: 電腦視覺 & YOLO */}
                        <Chapter id="cv" title="電腦視覺 (Computer Vision)" icon="📼" color="bg-teal-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-white">電腦的難關 (Ambiguity)</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                        <li>難判斷人數與笑點</li>
                                        <li>視角、亮度、比例不同</li>
                                        <li>遮擋 (Occlusion)</li>
                                    </ul>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Image path="/notes/多媒體/Untitled 95" alt="Ambiguity" className="rounded-lg border border-gray-700" />
                                        <Image path="/notes/多媒體/Untitled 96" alt="Ambiguity" className="rounded-lg border border-gray-700" />
                                    </div>
                                </div>
                                <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 h-fit">
                                    <h3 className="text-lg font-bold text-white mb-2">YOLO (You Only Look Once)</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        不同於傳統 ML，YOLO 是一種端到端的物件偵測算法，速度極快。
                                    </p>
                                </div>
                            </div>
                        </Chapter>

                        {/* Part 10: 影像濾鏡 */}
                        <Chapter id="filters" title="影像濾鏡 (Image Filters)" icon="🕸️" color="bg-gray-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                                    <div className="font-bold text-white mb-2 text-sm">影像不變</div>
                                    <Image path="/notes/多媒體/Untitled 98" alt="" className="h-16 mx-auto opacity-70" />
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                                    <div className="font-bold text-white mb-2 text-sm">左移一像素</div>
                                    <Image path="/notes/多媒體/Untitled 99" alt="" className="h-16 mx-auto opacity-70" />
                                </div>
                                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center">
                                    <div className="font-bold text-white mb-2 text-sm">低通濾波 (模糊)</div>
                                    <Image path="/notes/多媒體/Untitled 100" alt="" className="h-16 mx-auto opacity-70" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 flex flex-col items-center mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">高通濾波器 (High Pass)</h3>
                                <p className="mb-6 text-gray-400 text-sm">找出變化高的部分 (邊緣)。原理：自己 - 低通 = 高通。</p>

                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <Matrix rows={[[0, 0, 0], [0, 1, 0], [0, 0, 0]]} />
                                    <span className="text-2xl text-gray-600">-</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl text-gray-500">1/9</span>
                                        <Matrix rows={[[1, 1, 1], [1, 1, 1], [1, 1, 1]]} />
                                    </div>
                                    <span className="text-2xl text-gray-600">=</span>
                                    <Image path="/notes/多媒體/Untitled 101" alt="高通濾波" className="h-24 rounded border border-gray-700" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
                                    <h4 className="font-bold text-white mb-2">Cross-Correlation</h4>
                                    <p className="text-sm text-gray-400 mb-4">普通矩陣相乘。影像會上下左右顛倒。</p>
                                    <Image path="/notes/多媒體/Untitled 104" alt="" className="w-full rounded opacity-80" />
                                </div>
                                <div className={cn(
                                    "bg-gray-800/40 p-6 rounded-2xl border transition-colors",
                                    activeTerm === 'convolution' ? "border-blue-500 ring-1 ring-blue-500/20 bg-blue-900/10" : "border-gray-700"
                                )}>
                                    <h4 className="font-bold text-white mb-2">
                                        <TermLink term="convolution" activeTerm={activeTerm} onClick={toggleTerm} color="blue">Convolution</TermLink>
                                    </h4>
                                    <p className="text-sm text-gray-400 mb-4">Kernel 先翻轉再相乘。無翻轉情形。</p>
                                    <Image path="/notes/多媒體/Untitled 107" alt="" className="w-full rounded opacity-80" />
                                </div>
                            </div>
                        </Chapter>

                        {/* Part 11: Deep Learning */}
                        <Chapter id="dl" title="Deep Learning (CNN)" icon="🧠" color="bg-indigo-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">從全連接到 CNN</h3>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-red-500 pl-4 bg-red-900/10 p-3 rounded-r-lg">
                                            <h4 className="font-bold text-red-400 text-sm">問題：參數過多</h4>
                                            <p className="text-xs text-gray-400 mt-1">{"200x200x3 圖片 -> 1000 Hidden Units = 1.2 億個參數。"}</p>
                                            <Image path="/notes/多媒體/Untitled 112" alt="" className="h-16 mt-2 opacity-80" />
                                        </div>

                                        <div className="border-l-4 border-green-500 pl-4 bg-green-900/10 p-3 rounded-r-lg">
                                            <h4 className="font-bold text-green-400 text-sm">解法：Filters</h4>
                                            <p className="text-xs text-gray-400 mt-1">每個 Hidden Unit 只看 10x10 區域。大幅減少參數。</p>
                                            <div className="flex gap-2 mt-2">
                                                <Image path="/notes/多媒體/Untitled 113" alt="" className="h-16 opacity-80" />
                                                <Image path="/notes/多媒體/Untitled 114" alt="" className="h-16 opacity-80" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center bg-white/5 rounded-2xl p-4">
                                    <Image path="/notes/多媒體/Untitled 111" alt="NN Concept" className="w-full opacity-90" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-white mb-4">Filters 特徵截取視覺化</h3>
                                <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                                    {Array.from({ length: 21 }, (_, i) => (
                                        <div key={i} className="aspect-square bg-gray-800 rounded border border-gray-700 overflow-hidden">
                                            <Image path={`/notes/多媒體/Untitled ${116 + i}`} alt={`Feature ${i + 1}`} className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Chapter>

                    </main>

                    {/* Sidebar / Floating Panel */}
                    <aside className="lg:col-span-4 pl-6 relative">
                        <div className="sticky top-32">
                            {activeTerm ? (
                                <div className="animate-in slide-in-from-right duration-300 fade-in">
                                    <div className={cn("rounded-3xl p-8 text-white shadow-2xl border border-white/10 bg-gradient-to-br", knowledgeMap[activeTerm].color)}>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-4xl shadow-sm">{knowledgeMap[activeTerm].icon}</div>
                                            <button onClick={() => setActiveTerm(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 transition text-sm">✕</button>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{knowledgeMap[activeTerm].title}</h3>
                                        <p className="text-white/90 leading-relaxed font-medium mb-6">
                                            {knowledgeMap[activeTerm].desc}
                                        </p>
                                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                            <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Quick Note</div>
                                            <div className="font-mono text-sm">{knowledgeMap[activeTerm].note}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-3xl p-8 border border-dashed border-gray-700 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center text-2xl grayscale opacity-50">💡</div>
                                    <div className="text-gray-500">
                                        <p className="font-bold text-gray-400">互動知識庫</p>
                                        <p className="text-sm mt-2">點擊文章中 <span className="text-blue-400 underline decoration-blue-500/30">藍色</span> 或 <span className="text-green-400 underline decoration-green-500/30">綠色</span> 的關鍵字，即可在此處查看詳細圖解與公式整理。</p>
                                    </div>
                                </div>
                            )}

                            {/* Quick ToC */}
                            <div className="mt-12 pl-4 border-l border-gray-800">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">章節導覽</h4>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li><a href="#digitization" className="hover:text-blue-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 影像數位化</a></li>
                                    <li><a href="#eye" className="hover:text-pink-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> 眼睛成像</a></li>
                                    <li><a href="#color-space" className="hover:text-yellow-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> 色彩空間</a></li>
                                    <li><a href="#halftone" className="hover:text-orange-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Halftone</a></li>
                                    <li><a href="#cv" className="hover:text-teal-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> 電腦視覺</a></li>
                                    <li><a href="#dl" className="hover:text-indigo-400 transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Deep Learning</a></li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
                <p>&copy; Multimedia Systems Course Notes. Handcrafted with React.</p>
            </footer>
        </div>
    );
}