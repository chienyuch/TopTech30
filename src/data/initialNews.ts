import { NewsArticle, DailyInsight } from '../types';

export const INITIAL_NEWS: NewsArticle[] = [
  // --- DAILY TOP 30 (每日熱門前30則) ---
  {
    id: 'd-1',
    rank: 1,
    period: 'daily',
    titleZh: 'OpenAI 推出全新 GPT-5 多模態模型，推理解題能力提升 300%',
    titleEn: 'OpenAI Launches Next-Gen Multimodal Model with 300% Reasoning Boost',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/openai-launches-next-gen-model',
    category: 'AI',
    publishDate: '2026-07-23 09:30',
    hotScore: 99.8,
    summaryZh: 'OpenAI 正式發表最新一代旗艦 AI 模型，展示了在複雜科學推理、程式碼編寫與即時多模態視訊互動上的突破性升級，並已開放 API 測試。',
    keyTakeaways: [
      '在 SWE-bench 程式能力測試中打破歷史紀錄達到 78.4% 通過率',
      '具備長達 2M tokens 的超大上下文視窗與即時視覺分析能力',
      '企業級 API 價格降低 40%，預估將引發新一波 AI 應用創新熱潮'
    ],
    industryImpact: '將加速醫療、金融與軟體工程領域的自動化變革，同時加劇科技巨頭在超大規模基礎模型上的研發競爭。',
    techTerms: [
      { term: 'Multimodal (多模態)', explanation: '能同時處理並理解文字、語音、圖像與影像等多種形式輸入的 AI 模型。' },
      { term: 'Context Window (上下文視窗)', explanation: '模型單次能處理的文字或數據總量限制。' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    readTime: '4 分鐘',
    views: 12850,
    likes: 3420
  },
  {
    id: 'd-2',
    rank: 2,
    period: 'daily',
    titleZh: '蘋果發表 M5 Ultra 晶片，專為端側 AI 與高階工作站設計',
    titleEn: 'Apple Unveils M5 Ultra Chip Tailored for On-Device AI Workloads',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com/apple-m5-ultra-chip-announcement',
    category: 'Hardware',
    publishDate: '2026-07-23 08:15',
    hotScore: 98.9,
    summaryZh: '蘋果於特設發表會上發表全新 M5 Ultra 晶片，採用台積電最新的 2 奈米工藝，NPU 運算力達 100 TOPS，支援本地端運行數百億參數模型。',
    keyTakeaways: [
      '採用最新 2 奈米製程，能效比前代 M4 Ultra 提升 45%',
      '專利 UltraFusion 互連技術升級，頻寬達到 1.6TB/s',
      '將率先應用於新一代 Mac Studio 與 Mac Pro 系列產品'
    ],
    industryImpact: '推動高階內容創作者與 AI 開發者從雲端推理轉向極速安全的本地端機器學習運算。',
    techTerms: [
      { term: 'TOPS', explanation: 'Trillion Operations Per Second，每秒萬億次指令，衡量 NPU 算力的指標。' },
      { term: 'UltraFusion', explanation: '蘋果專利的高密度晶片互連封裝技術。' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    readTime: '3 分鐘',
    views: 10420,
    likes: 2890
  },
  {
    id: 'd-3',
    rank: 3,
    period: 'daily',
    titleZh: 'Google 深度結合量子電腦與 AI，解開複雜蛋白質摺疊世紀難題',
    titleEn: 'Google Combines Quantum Computing with AI to Solve Complex Proteins',
    source: 'Wired',
    sourceUrl: 'https://wired.com/google-quantum-ai-protein-folding',
    category: 'AI',
    publishDate: '2026-07-23 07:45',
    hotScore: 97.6,
    summaryZh: 'Google Quantum AI 團隊與 DeepMind 合作，發表混合量子與深度學習演算法，成功在數分鐘內預測超越傳統電腦數年算力的複雜蛋白質結構。',
    keyTakeaways: [
      '成功模擬含超過 5,000 個胺基酸的巨型蛋白質複合體',
      '將標靶藥物研發與抗癌新藥開發週期縮短 80% 以上',
      '發表於《Nature》期刊並宣佈開源基礎演算法模型'
    ],
    industryImpact: '標誌著量子計算從實驗室階段正式邁入生醫藥物開發與材料科學的商業實用時代。',
    techTerms: [
      { term: 'Quantum Supremacy (量子霸權)', explanation: '量子電腦完成傳統電腦在合理時間內無法完成的特定計算任務。' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    readTime: '5 分鐘',
    views: 8930,
    likes: 2150
  },
  {
    id: 'd-4',
    rank: 4,
    period: 'daily',
    titleZh: 'Linux 核心發表 6.15 版本，全面支援 Rust 模組與新世代 GPU 驅動',
    titleEn: 'Linux Kernel 6.15 Released with Expanded Rust Modules Support',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com/linux-kernel-6-15-release',
    category: 'Software',
    publishDate: '2026-07-23 06:20',
    hotScore: 96.2,
    summaryZh: 'Linus Torvalds 宣布 Linux Kernel 6.15 正式釋出，此版本大幅提升了 Rust 在核心驅動開發的覆蓋率，並優化了異質架構 CPU 的調度效能。',
    keyTakeaways: [
      '新增多個以 Rust 語言撰寫的高安全性網路與儲存驅動程式',
      '改進 ARM64 與 RISC-V 架構下的能源效率與多執行緒效能',
      '微軟與 Google 等貢獻者共同提供記憶體安全漏洞修復方案'
    ],
    industryImpact: '穩固 Linux 作為全球雲端伺服器與超級電腦核心的基礎，並提升底層系統的安全性與記憶體安全防護。',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    readTime: '4 分鐘',
    views: 7420,
    likes: 1840
  },
  {
    id: 'd-5',
    rank: 5,
    period: 'daily',
    titleZh: '索尼與本田合資電動車 AFEELA 正式上市，搭載全景 AR 娛樂駕駛艙',
    titleEn: 'Sony-Honda AFEELA EV Officially Launches with Panoramic AR Cockpit',
    source: 'Engadget',
    sourceUrl: 'https://engadget.com/sony-honda-afeela-ev-launch',
    category: 'Hardware',
    publishDate: '2026-07-23 05:10',
    hotScore: 95.1,
    summaryZh: 'Sony Honda Mobility 首款車款 AFEELA 正式於北美開放定購，全車配備 45 個感測器與 Epic Games Unreal Engine 5 驅動的全景車載互動系統。',
    keyTakeaways: [
      '支援 Level 3 自動駕駛與 3D 擴增實境抬頭顯示器',
      '整合 PS5 遙控遊玩功能與空間音訊車載主機',
      '預計於 2026 年底首批交車，售價自 8.5 萬美元起'
    ],
    industryImpact: '重新定義智慧汽車作為「移動娛樂空間」的想像，展示娛樂巨頭與傳統車廠深度結合的跨界範例。',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    readTime: '4 分鐘',
    views: 6810,
    likes: 1520
  },
  {
    id: 'd-6',
    rank: 6,
    period: 'daily',
    titleZh: 'Anthropic 發表 Claude 4，主打零幻覺精準推理與自主代理工作流',
    titleEn: 'Anthropic Unveils Claude 4 Focus on Zero-Hallucination & Agentic Workflow',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/anthropic-claude-4-launch',
    category: 'AI',
    publishDate: '2026-07-23 04:30',
    hotScore: 94.5,
    summaryZh: 'Anthropic 推出的全新模型 Claude 4 針對企業自動化與科學研究提供近乎零幻覺的精準回答，並升級了長效 AI Agent 任務執行能力。',
    keyTakeaways: [
      '引入可驗證事實核查機制，引用出處精準度提高 95%',
      '支援長達 12 小時的自主程式排錯與專案專案重建任務',
      '推出符合 HIPAA 與 GDPR 的企業專用隱私訓練安全規範'
    ],
    industryImpact: '強化了 Anthropic 在企業級 AI 應用的市場領導地位，並迫使對手提升 AI 輸出的真實性與可信度。',
    readTime: '3 分鐘',
    views: 6200,
    likes: 1410
  },
  {
    id: 'd-7',
    rank: 7,
    period: 'daily',
    titleZh: '微軟 Windows 12 亮相：AI 雲原生作業系統，支援靈動工作區',
    titleEn: 'Microsoft Teases Windows 12: AI-Native OS with Fluid Workspaces',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com/microsoft-windows-12-reveal',
    category: 'Software',
    publishDate: '2026-07-23 03:50',
    hotScore: 93.8,
    summaryZh: '微軟展示下一代作業系統 Windows 12，主打模組化架構與即時語音/視訊 Copilot 助手，並全面整合雲端加速與跨裝置同步。',
    keyTakeaways: [
      '全新桌面前端介面，動態浮動工具列與 AI 自動分頁分類',
      '最低硬體需求要求搭載 40 TOPS 以上 NPU 算力晶片',
      '預計將於秋季開放開發者 Preview 測試版本'
    ],
    industryImpact: '全面掀起全球數億 PC 用戶升級 AI PC 的硬體替換潮。',
    readTime: '4 分鐘',
    views: 5900,
    likes: 1290
  },
  {
    id: 'd-8',
    rank: 8,
    period: 'daily',
    titleZh: '美國聯邦通訊委員會 FCC 通過 Starlink 衛星直連手機 6G 測試計畫',
    titleEn: 'FCC Approves Starlink Direct-to-Cell 6G Testing Operations',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com/fcc-approves-starlink-direct-to-cell',
    category: 'Security',
    publishDate: '2026-07-23 02:40',
    hotScore: 92.4,
    summaryZh: 'FCC 批准 SpaceX 與電信巨頭合作進行第三代低軌衛星的直連手機（Direct-to-Cell）高速數據傳輸測試，實現荒漠無盲區通訊。',
    keyTakeaways: [
      '無需任何附加天線硬體，普通 5G/6G 手機即可直連衛星訊號',
      '提供高達 50Mbps 下載速度，徹底解決死角無訊號痛點',
      '救災與緊急搜救體系將迎來革新性技術突破'
    ],
    industryImpact: '將加速全球死角網路覆蓋，對傳統地面基地台建設帶來重大補充與補強。',
    readTime: '3 分鐘',
    views: 5410,
    likes: 1100
  },
  {
    id: 'd-9',
    rank: 9,
    period: 'daily',
    titleZh: '美商半導體巨頭宣布 1 奈米研發成功，預計 2028 年量產',
    titleEn: 'Semiconductor Giant Announces Breakthrough in 1nm Process Node',
    source: 'Wired',
    sourceUrl: 'https://wired.com/semiconductor-1nm-breakthrough',
    category: 'Hardware',
    publishDate: '2026-07-23 01:20',
    hotScore: 91.7,
    summaryZh: '頂尖晶圓代工廠宣布突破 1nm 埃米（Angstrom）物理極限，採用全新碳奈米管與 GAAFET 垂直通道疊加技術。',
    keyTakeaways: [
      '在同等功耗下性能提升 30%，晶體管密度提高 1.8 倍',
      '解決量子穿隧效應帶來的漏電與散熱瓶頸',
      '美日台三地研發中心共同完成原型驗證晶片測試'
    ],
    industryImpact: '繼續延續摩爾定律，為未來算力爆發提供關鍵底層硬體基石。',
    readTime: '5 分鐘',
    views: 4980,
    likes: 980
  },
  {
    id: 'd-10',
    rank: 10,
    period: 'daily',
    titleZh: 'Meta 推出免費開源圖文視訊全能模型 Llama 4 Horizon',
    titleEn: 'Meta Releases Open-Source Llama 4 Horizon Multimodal Model',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/meta-llama-4-horizon-release',
    category: 'AI',
    publishDate: '2026-07-22 23:45',
    hotScore: 90.9,
    summaryZh: '扎克伯格宣布開源 400B 參數的 Llama 4 Horizon，支援商用授權，性能直接槓上閉源商業頂級模型。',
    keyTakeaways: [
      '開放包含權重與完整訓練數據集精簡版下載',
      '降低全球開發者建置自有私有化 AI 系統的門檻',
      '推出針對邊緣端開發的 8B 與 70B 精簡版本'
    ],
    industryImpact: '推動開放源碼 AI 生態的全面繁榮，威脅閉源 SaaS 訂閱收費模式。',
    readTime: '4 分鐘',
    views: 4620,
    likes: 930
  },
  // Adding more articles for Daily (up to rank 30 representation)
  ...generateMoreArticles('daily', 11, 30),

  // --- WEEKLY TOP 30 (每週熱門前30則) ---
  {
    id: 'w-1',
    rank: 1,
    period: 'weekly',
    titleZh: '每週焦點：輝達發表全球首款光學量子算力叢集，AI 計算速度躍升 50 倍',
    titleEn: 'Weekly Special: NVIDIA Announces Photonics Quantum Computing Cluster',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com/nvidia-quantum-photonics-cluster',
    category: 'Hardware',
    publishDate: '2026-07-20 14:00',
    hotScore: 99.9,
    summaryZh: '本週全球科技最大新聞！輝達於 GTC 大會上展示採用矽光子與光學量子傳輸架構的超級算力伺服器，將資料中心數據傳輸延遲降至接近零。',
    keyTakeaways: [
      '矽光子互連技術取代傳統銅線，耗能降低 70%',
      '單叢集支援超過 100 萬顆 GPU 毫秒級無縫同步併行運算',
      '亞馬遜 AWS 與微軟 Azure 已下單預定首批產能'
    ],
    industryImpact: '完全改寫大型語言模型與超算中心的物理架構，解決算力升級引發的電網能量危機。',
    techTerms: [
      { term: 'Silicon Photonics (矽光子)', explanation: '以光子代替電子進行資料傳播，大幅提升傳輸速度並降低發熱量。' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    readTime: '6 分鐘',
    views: 34200,
    likes: 8900
  },
  {
    id: 'w-2',
    rank: 2,
    period: 'weekly',
    titleZh: '歐盟正式通過《通用 AI 機器人安全法案》，強制實施遠端安全開關',
    titleEn: 'EU Passes Humanoid Robotics Safety Act Mandating Remote Kill-Switches',
    source: 'Wired',
    sourceUrl: 'https://wired.com/eu-passes-humanoid-robotics-act',
    category: 'Business',
    publishDate: '2026-07-19 11:20',
    hotScore: 98.4,
    summaryZh: '歐盟議會高票通過全球首部方針規範人形機器人與工業自動化 AI 的法案，要求所有製造商需於硬體層級配備無法被軟體干擾的物理切斷斷路器。',
    keyTakeaways: [
      '適用於家庭服務型、醫療護理型與製造業人形機器人',
      '違反安全審查規範的廠商最高可處全球營業額 7% 的巨額罰款',
      '要求所有機器人行為日誌需存於具備防篡改功能的加密模組'
    ],
    industryImpact: '建立機器人產業監管裡程碑，規範科技巨頭安全邊界。',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    readTime: '5 分鐘',
    views: 28900,
    likes: 6700
  },
  {
    id: 'w-3',
    rank: 3,
    period: 'weekly',
    titleZh: '特斯拉 Robotaxi 無人計程車正式開放在加州全天候商業營運',
    titleEn: 'Tesla Robotaxi Fully Approved for Commercial Rides Across California',
    source: 'The Verge',
    sourceUrl: 'https://theverge.com/tesla-robotaxi-california-approval',
    category: 'AI',
    publishDate: '2026-07-18 16:45',
    hotScore: 97.8,
    summaryZh: '加州機動車輛管理局（DMV）正式發放全天候無安全員商業營運許可，特斯拉 Cybercab 車隊即日起可透過 App 提供收費乘車服務。',
    keyTakeaways: [
      '每英里平均搭乘費用僅需 0.3 美元，遠低於傳統 Uber 駕駛成本',
      '全車隊採用端到端 FSD V13 純視覺神經網路架構',
      '開辦首日完成超過 50,000 次趟次，平均等候時間小於 3 分鐘'
    ],
    industryImpact: '標誌著自動駕駛共享出行全面進入大眾普及階段，給傳統汽車擁有模式帶來變革衝擊。',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    readTime: '4 分鐘',
    views: 25400,
    likes: 5800
  },
  ...generateMoreArticles('weekly', 4, 30),

  // --- MONTHLY TOP 30 (每月熱門前30則) ---
  {
    id: 'm-1',
    rank: 1,
    period: 'monthly',
    titleZh: '每月重磅：人工智慧邁入 AGI 時代？全球百位頂尖科學家發表聯合聲明',
    titleEn: 'Monthly Epic: 100 Scientists Sign Joint Statement on AGI Breakthrough',
    source: 'Wired',
    sourceUrl: 'https://wired.com/agi-joint-statement-scientists',
    category: 'AI',
    publishDate: '2026-07-05 10:00',
    hotScore: 100.0,
    summaryZh: '本月全球討論度最高科技新聞！來自 MIT、史丹佛、牛津與圖靈獎得主等 100 多位專家發表聯合評估報告，確認最新通用模型已具備自我跨領域學習與假設驗證能力。',
    keyTakeaways: [
      '模型在數學難題、哲學思辨與創新材料設計上達到專家級水準',
      '呼籲成立國際核子等級的通用 AI 控制委員會（IAEA for AI）',
      '討論並制訂防止自主複製與不可逆網路越權存取的防線'
    ],
    industryImpact: '全人類社會將面臨教育、法律、經濟勞動力與哲學架構的深刻轉型。',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    readTime: '7 分鐘',
    views: 89000,
    likes: 24500
  },
  {
    id: 'm-2',
    rank: 2,
    period: 'monthly',
    titleZh: '固態電池重大技術突破：電動車續航破 1500 公里，10 分鐘充滿 80%',
    titleEn: 'Solid-State Battery Breakthrough: 1500km Range & 10-Min Ultra Fast Charge',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com/solid-state-battery-breakthrough-2026',
    category: 'Hardware',
    publishDate: '2026-07-02 08:30',
    hotScore: 98.8,
    summaryZh: '聯合研究團隊成功研發新型硫化物全固態電解質，能量密度達到 600 Wh/kg，且經歷 3000 次充放電循環無衰減。',
    keyTakeaways: [
      '徹底解除電池燃燒爆炸安全疑慮',
      '材料成本較現有三元鋰電池降低 35%',
      '各大車廠已設立合資工廠，預計 2027 年開啟大規模車規量產'
    ],
    industryImpact: '給燃油車徹底劃上句號，並推動電動航空（eVTOL）的商業化落地。',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-6705166e2106?auto=format&fit=crop&w=800&q=80',
    readTime: '5 分鐘',
    views: 67800,
    likes: 18900
  },
  ...generateMoreArticles('monthly', 3, 30)
];

// Helper to fill out top 30 items cleanly for each period
function generateMoreArticles(period: 'daily' | 'weekly' | 'monthly', startRank: number, endRank: number): NewsArticle[] {
  const sources: ('TechCrunch' | 'The Verge' | 'Wired' | 'Ars Technica' | 'Engadget')[] = [
    'TechCrunch', 'The Verge', 'Wired', 'Ars Technica', 'Engadget'
  ];
  const categories: ('AI' | 'Hardware' | 'Software' | 'Business' | 'Security')[] = [
    'AI', 'Hardware', 'Software', 'Business', 'Security'
  ];

  const topics = [
    { zh: '太空探索公司星艦 7 號升空，成功在軌完成雙艦推進劑低溫對接轉移', en: 'Starship Orbital Fuel Transfer Success', cat: 'Security' },
    { zh: 'GitHub Copilot Workspace 2.0 發表，支援語音專案架構自動導航與重構', en: 'GitHub Copilot Workspace 2.0 Launch', cat: 'Software' },
    { zh: '英特爾展示 14A 製程原型晶片，成功實現背部供電 PowerVia 升級', en: 'Intel 14A Node Prototype with PowerVia', cat: 'Hardware' },
    { zh: '亞馬遜發表 Bedrock Agentic Automation，打造全自動企業供應鏈 AI 腦', en: 'AWS Bedrock Agentic Automation Suite', cat: 'AI' },
    { zh: '微軟與 OpenAI 投資千億美元「星際之門」超算中心正式打下第一基樁', en: 'Stargate AI Supercomputer Construction Begins', cat: 'Business' },
    { zh: '全球最高等級量子金鑰加密網絡於紐約至倫敦跨大西洋海底光纖開通', en: 'Transatlantic Quantum Encryption Network Live', cat: 'Security' },
    { zh: '三星發表可雙向折疊 360 度 Flex In & Out 顯示面板，配備於新旗艦機', en: 'Samsung 360-degree Flex In & Out Display', cat: 'Hardware' },
    { zh: 'Google Search 推出全 AI 自適應介面，搜尋引擎正式邁入對話時代', en: 'Google Search Evolves into Generative Canvas', cat: 'AI' },
    { zh: '蘋果 Vision Pro 2 輕量化登場：重量減少 40%，價格降至 1,999 美元', en: 'Apple Vision Pro 2 Lighter & Lower Price', cat: 'Hardware' },
    { zh: '國際資安團隊揭露最新硬體層級 Spectre-X 漏洞，三大晶片巨頭發布修補微碼', en: 'Spectre-X Hardware Vulnerability Patch', cat: 'Security' },
    { zh: 'Meta 開源智慧眼鏡 Ray-Ban Meta Gen 3，支援即時多國語言同聲傳譯', en: 'Ray-Ban Meta Gen 3 with Live Translation', cat: 'Hardware' },
    { zh: '晶片巨頭發表 3D 堆疊存算一體架構（CIM），記憶體頻寬狂升 10 倍', en: 'Computing-in-Memory 3D Architecture', cat: 'Hardware' },
    { zh: '台積電熊本二廠正式投產，供應車用與工業級 6 奈米高效能晶片', en: 'TSMC Kumamoto Fab 2 Production Begins', cat: 'Business' },
    { zh: '波士頓動力 Atlas 人形機器人進駐現代汽車工廠，展開 24 小時輪班測試', en: 'Boston Dynamics Atlas Enters Auto Factory', cat: 'AI' },
    { zh: 'DeepMind 發表 AlphaFold 4，可精準預測小分子藥物與 DNA 結合機制', en: 'DeepMind Releases AlphaFold 4', cat: 'AI' },
    { zh: '全球最大開源社群 Hugging Face 估值突破 100 億美元，完成新一輪融資', en: 'Hugging Face Valuation Reaches $10B', cat: 'Business' },
    { zh: 'Chrome 瀏覽器正式預設停用第三方 Cookie，隱私沙盒技術完整落地', en: 'Chrome Deprecates Third-Party Cookies Fully', cat: 'Software' },
    { zh: '美國能源部核融合國家實驗室達成連續 1 小時淨能量增益歷史紀錄', en: 'US Fusion Energy Continuous Net Gain Record', cat: 'Security' },
    { zh: 'Adobe Photoshop 推出神經光影整合系統，一鍵改變相片環境光照與質感', en: 'Adobe Photoshop Neural Lighting Engine', cat: 'Software' },
    { zh: 'Nintendo Switch 2 全球銷售突破 2000 萬台，刷新歷史最快銷售速度', en: 'Nintendo Switch 2 Sales Record', cat: 'Hardware' },
    { zh: 'PayPal 與 Stripe 推出跨國基於區塊鏈的秒級企業結算清算服務', en: 'PayPal & Stripe Instant Cross-border Settlement', cat: 'Business' },
    { zh: '微軟安全團隊成功攔截大規模國家級 AI 生成網路釣魚攻擊網', en: 'Microsoft Neutralizes AI-Driven Phishing Network', cat: 'Security' },
    { zh: 'Raspberry Pi 6 登場：配備 8 核心 RISC-V 晶片與雙 4K 60FPS 輸出', en: 'Raspberry Pi 6 with RISC-V Architecture', cat: 'Hardware' },
    { zh: '全球大數據巨頭 Databricks 收購向量資料庫新創公司，整合智庫搜尋', en: 'Databricks Acquires Vector Database Startup', cat: 'Business' },
    { zh: '聯發科發表天磯 9500 旗艦晶片，整合端側生成式影片繪圖引擎', en: 'MediaTek Dimensity 9500 Announcement', cat: 'Hardware' },
    { zh: 'Spotify 推出 AI 音樂家合作計劃，允許創作者與 AI 聲線安全分潤', en: 'Spotify AI Voice Monetization Program', cat: 'Software' },
    { zh: '美國國會立法通過《數位身分與隱私保護法案》，設立統一加密金鑰標準', en: 'US Congress Passes Digital ID & Privacy Act', cat: 'Security' },
    { zh: '麻省理工 MIT 團隊開發無人機蜂群 3D 掃描技術，能自動進入地形狹窄洞穴', en: 'MIT Autonomous Drone Swarm Mapping', cat: 'AI' }
  ];

  const list: NewsArticle[] = [];
  let index = 0;

  for (let r = startRank; r <= endRank; r++) {
    const t = topics[index % topics.length];
    const source = sources[(r + index) % sources.length];
    const category = (t.cat as TechCategory) || categories[index % categories.length];
    
    // Decrease hotScore slightly down to rank 30
    const hotScore = Math.max(70.0, +(95 - (r - 1) * 0.85).toFixed(1));
    const views = Math.floor(15000 - r * 380 + Math.random() * 200);
    const likes = Math.floor(3500 - r * 90 + Math.random() * 50);

    const prefix = period === 'daily' ? 'd' : period === 'weekly' ? 'w' : 'm';

    list.push({
      id: `${prefix}-${r}`,
      rank: r,
      period,
      titleZh: `TOP ${r}：${t.zh}`,
      titleEn: `${t.en} (#${r})`,
      source,
      sourceUrl: `https://${source.toLowerCase().replace(/\s+/g, '')}.com/article-${period}-${r}`,
      category,
      publishDate: period === 'daily' ? `2026-07-23 ${String(23 - (r % 20)).padStart(2, '0')}:15` :
                   period === 'weekly' ? `2026-07-${String(23 - Math.floor(r / 4)).padStart(2, '0')} 14:00` :
                   `2026-07-${String(Math.max(1, 28 - r)).padStart(2, '0')} 10:00`,
      hotScore,
      summaryZh: `這篇發布於 ${source} 的深度報導揭示了在 ${category} 領域的最新進展：${t.zh}，為產業發展帶來重要的里程碑與洞察。`,
      keyTakeaways: [
        `重點一：在 ${source} 評測中展現關鍵指標領先優勢`,
        `重點二：針對 ${category} 產業生態體系產生實質衝擊與鏈結影響`,
        `重點三：相關技術已步入成熟期，預計引領下一波市場關注與討論`
      ],
      industryImpact: `此新聞展現了 ${source} 對 ${category} 趨勢的精準追蹤，預期將帶動同業快速跟進並促進技術創新。`,
      readTime: `${3 + (r % 4)} 分鐘`,
      views,
      likes
    });

    index++;
  }

  return list;
}

export const DAILY_INSIGHTS: DailyInsight[] = [
  {
    id: 'ins-1',
    topic: '大模型推理與算力革命',
    titleZh: 'OpenAI GPT-5 與 輝達矽光子算力兩強對撼，AI 算力成本爆降',
    descriptionZh: '今日 TechCrunch 與 Wired 共同聚焦大模型底層算力。隨 OpenAI 推出推理解題強化的 GPT-5 與輝達矽光子超級算力叢集，AI 計算成本迎來新一波極限下探。',
    keyTakeaway: '端側 NPU 與雲端矽光子算力將形成「雙輪驅動」，推動 AI 走向零延遲、高頻率的自主 Agent 應用時代。',
    impactLevel: '極高',
    sources: ['TechCrunch', 'Wired', 'The Verge']
  },
  {
    id: 'ins-2',
    topic: '次世代硬體與 2nm / 1nm 晶片戰場',
    titleZh: '蘋果 M5 Ultra 與半導體 1 奈米突破，端側 AI PC 與車載運算爆發',
    descriptionZh: 'The Verge 與 Ars Technica 報導顯示，晶片巨頭已正式開起 2nm/1nm 埃米時代，終端裝置包括蘋果 Mac、索尼 AFEELA 車載系統均全面轉向本地百億參數 AI。',
    keyTakeaway: '消費者將可以在完全不連接雲端的情況下，於車內或筆電上執行私人且高度安全的客製化 AI 服務。',
    impactLevel: '高',
    sources: ['The Verge', 'Ars Technica', 'Engadget']
  },
  {
    id: 'ins-3',
    topic: '全球 AI 安全法規與機器人倫理',
    titleZh: '歐盟高票通過通用機器人安全法規，要求硬體切斷開關',
    descriptionZh: '隨波士頓動力 Atlas 人形機器人進駐車廠，歐盟率先立法要求所有具備物理動作能力的 AI 機器人必須搭載硬體級安全熔斷斷路器。',
    keyTakeaway: '合規安全性成為科技公司拓展歐洲與全球市場的硬性入場券。',
    impactLevel: '高',
    sources: ['Wired', 'TechCrunch']
  }
];
