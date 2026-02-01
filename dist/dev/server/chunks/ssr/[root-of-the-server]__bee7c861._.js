module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/site-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "siteConfig",
    ()=>siteConfig
]);
const siteConfig = {
    company: {
        name: "Gentech Guard",
        legalName: "Gentech Guard Pvt Ltd",
        copyright: "© 2025 Gentech Guard®. All Rights Reserved."
    },
    contact: {
        phone: {
            display: "+91 99898 20222",
            value: "+919989820222"
        },
        email: "info@gentechguard.com",
        address: {
            line1: "Gentech Headquarters",
            line2: "Hyderabad, Telangana",
            fullAddress: "Hyderabad, Telangana, India",
            mapLink: "https://maps.google.com/?q=Gentech+Guard+Hyderabad"
        },
        whatsapp: {
            number: "919989820222",
            defaultMessage: "Hi, I'm interested in becoming a dealer."
        }
    },
    socials: {
        instagram: "https://instagram.com/gentechguard",
        facebook: "https://facebook.com/gentechguard",
        youtube: "https://youtube.com/@gentechguard"
    },
    navigation: [
        {
            name: "Home",
            href: "/home"
        },
        {
            name: "About Us",
            href: "/about"
        },
        {
            name: "Solutions",
            href: "/home#solutions"
        },
        {
            name: "GALLERY",
            href: "/gallery"
        },
        {
            name: "Process",
            href: "/home#process"
        },
        {
            name: "E-Warranty",
            href: "/warranty"
        },
        {
            name: "Contact",
            href: "/home#contact"
        } // Unified 'Contact' vs 'Contact Us'
    ],
    // Fallback products if DB fails or for static generation references
    productCategories: [
        "Gen 4 PPF",
        "Gen 5 PPF",
        "Gen Matte 5",
        "Gen Pro 6+",
        "Gen Pro Ultra 8"
    ],
    metadata: {
        title: "Gentech Guard | Premium Paint Protection Film",
        description: "Next-generation automotive protection solutions backed by industry expertise and advanced Aliphatic TPU technology."
    }
};
}),
"[project]/context/GlobalStore.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalProvider",
    ()=>GlobalProvider,
    "useGlobalStore",
    ()=>useGlobalStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site-config.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const GlobalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    products: [],
    settings: null,
    loading: true
});
const useGlobalStore = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(GlobalContext);
const GlobalProvider = ({ children })=>{
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchData = async ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://rnscmxjrkqelmaiwrouz.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_YKoBbaKznLfOehhQ0Ljj1w_RszoXBGY"));
            try {
                // Fetch Products
                const { data: productsData, error: productsError } = await supabase.from('products').select('*').order('id', {
                    ascending: true
                });
                if (productsData) {
                    const mapped = productsData.map((p)=>({
                            id: String(p.id),
                            name: p.name,
                            shortDesc: p.short_desc || p.description || "",
                            features: p.features || [],
                            specs: p.spects || [],
                            parent_id: p.parent_id || null // ✅ ADD THIS LINE
                        }));
                    setProducts(mapped);
                }
                // Fetch Settings
                const { data: settingsData } = await supabase.from('site_settings').select('*');
                let hydratedSettings = JSON.parse(JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["siteConfig"]));
                if (settingsData && settingsData.length > 0) {
                    settingsData.forEach((row)=>{
                        const keys = row.key.split('.');
                        let current = hydratedSettings;
                        for(let i = 0; i < keys.length - 1; i++){
                            if (!current[keys[i]]) current[keys[i]] = {};
                            current = current[keys[i]];
                        }
                        current[keys[keys.length - 1]] = row.value;
                    });
                }
                setSettings(hydratedSettings);
            } catch (err) {
                console.error("Failed to fetch global data", err);
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalContext.Provider, {
        value: {
            products,
            settings,
            loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/GlobalStore.tsx",
        lineNumber: 93,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bee7c861._.js.map