"use client";

import { useState, useMemo, useCallback } from "react";
import { Dealer, DealerFilter } from "@/types/dealer";
import { dealers as allDealers } from "@/lib/dealers/data";

export function useDealerData() {
  const [filters, setFilters] = useState<DealerFilter>({
    type: "all",
    state: null,
    search: ""
  });

  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const [hoveredDealer, setHoveredDealer] = useState<string | null>(null);

  const filteredDealers = useMemo(() => {
    return allDealers.filter((dealer) => {
      // Type filter
      if (filters.type !== "all" && dealer.dealer_type !== filters.type) {
        return false;
      }

      // State filter
      if (filters.state && filters.state !== "All States" && dealer.state !== filters.state) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchName = dealer.dealer_name.toLowerCase().includes(searchLower);
        const matchCity = dealer.city.toLowerCase().includes(searchLower);
        const matchState = dealer.state.toLowerCase().includes(searchLower);
        if (!matchName && !matchCity && !matchState) {
          return false;
        }
      }

      return dealer.is_active;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const active = allDealers.filter(d => d.is_active);
    return {
      total: active.length,
      premium: active.filter(d => d.dealer_type === "premium").length,
      standard: active.filter(d => d.dealer_type === "standard").length,
      comingSoon: active.filter(d => d.dealer_type === "coming_soon").length,
      cities: new Set(active.map(d => d.city)).size,
      states: new Set(active.map(d => d.state)).size
    };
  }, []);

  const updateFilter = useCallback((key: keyof DealerFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ type: "all", state: null, search: "" });
  }, []);

  const selectDealer = useCallback((id: string | null) => {
    setSelectedDealer(id);
  }, []);

  const hoverDealer = useCallback((id: string | null) => {
    setHoveredDealer(id);
  }, []);

  return {
    dealers: filteredDealers,
    allDealers,
    filters,
    stats,
    selectedDealer,
    hoveredDealer,
    updateFilter,
    clearFilters,
    selectDealer,
    hoverDealer
  };
}
