"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "@/lib/site-config";

// -- TYPES --
export type Product = {
    id: string;
    name: string;
    shortDesc: string;
    features: string[];
    specs: { label: string; value: string }[];
    parent_id?: string | null; 
    image_url?: string;
};

type GlobalContextType = {
    products: Product[];
    settings: any;
    loading: boolean;
};

const GlobalContext = createContext<GlobalContextType>({
    products: [],
    settings: null,
    loading: true,
});

export const useGlobalStore = () => useContext(GlobalContext);

// -- PROVIDER --
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            try {
                // Fetch Products
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('*')
                    .order('id', { ascending: true });

                if (productsData) {
                    const mapped = productsData.map((p: any) => ({
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

                let hydratedSettings = JSON.parse(JSON.stringify(siteConfig));

                if (settingsData && settingsData.length > 0) {
                    settingsData.forEach((row: any) => {
                        const keys = row.key.split('.');
                        let current = hydratedSettings;
                        for (let i = 0; i < keys.length - 1; i++) {
                            if (!current[keys[i]]) current[keys[i]] = {};
                            current = current[keys[i]];
                        }
                        current[keys[keys.length - 1]] = row.value;
                    });
                }
                setSettings(hydratedSettings);

            } catch (err) {
                console.error("Failed to fetch global data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <GlobalContext.Provider value={{ products, settings, loading }}>
            {children}
        </GlobalContext.Provider>
    );
};