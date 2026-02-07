// app/our-network/components/IndiaMap.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import IndiaMap from "@react-map/india";
import { Dealer } from "@/types/dealer";
import { PinPopup } from "./PinPopup";

interface IndiaMapProps {
  dealers: Dealer[];
  selectedDealer: string | null;
  hoveredDealer: string | null;
  onSelectDealer: (id: string | null) => void;
  onHoverDealer: (id: string | null) => void;
}

export function IndiaMapComponent({ 
  dealers, 
  selectedDealer, 
  hoveredDealer,
  onSelectDealer, 
  onHoverDealer 
}: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Create a map of state names to dealer counts for coloring
  const stateData = useMemo(() => {
    const data: Record<string, { 
      count: number; 
      hasPremium: boolean;
      dealers: Dealer[];
    }> = {};
    
    dealers.forEach(dealer => {
      const stateName = dealer.state;
      if (!data[stateName]) {
        data[stateName] = { count: 0, hasPremium: false, dealers: [] };
      }
      data[stateName].count += 1;
      data[stateName].dealers.push(dealer);
      if (dealer.dealer_type === 'premium') {
        data[stateName].hasPremium = true;
      }
    });
    
    return data;
  }, [dealers]);

  // Custom color scheme matching Gentech Guard theme
  const getStateColor = (stateName: string) => {
    const state = stateData[stateName];
    if (!state) return "#1E293B"; // Dark blue-gray for no dealers
    
    if (state.hasPremium) return "#00A8FF"; // Cyan for premium
    return "#3B82F6"; // Blue for standard
  };

  const handleStateClick = (stateName: string) => {
    const stateDealers = stateData[stateName]?.dealers || [];
    if (stateDealers.length > 0) {
      // Select first dealer in state or cycle through them
      onSelectDealer(stateDealers[0].id);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-[#0A0A0A] via-[#0F172A] to-[#0A0A0A] rounded-3xl overflow-hidden border border-white/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00A8FF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,168,255,0.1) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* India Map */}
      <div className="absolute inset-0 p-8">
        <IndiaMap
          type="select-single"
          size="100%"
          mapColor={getStateColor(hoveredState || "")}
          strokeColor="#00A8FF"
          strokeWidth="0.5"
          hoverColor="#00A8FF"
          hoverStrokeColor="#FFFFFF"
          hoverStrokeWidth="1"
          onSelect={(stateName) => handleStateClick(stateName)}
          onHover={(stateName) => setHoveredState(stateName)}
          selectColor="#00A8FF"
          hints={true}
          hintTextColor="#FFFFFF"
          hintBackgroundColor="rgba(0, 168, 255, 0.9)"
          hintPadding="10px"
          hintBorderRadius="8px"
          hintFontSize="14px"
          hintFontWeight="600"
        />
      </div>

      {/* Dealer Pins Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {dealers.map((dealer, index) => (
          <DealerPinOverlay
            key={dealer.id}
            dealer={dealer}
            index={index}
            isSelected={selectedDealer === dealer.id}
            isHovered={hoveredDealer === dealer.id}
            onSelect={() => onSelectDealer(dealer.id)}
            onHover={() => onHoverDealer(dealer.id)}
            onLeave={() => onHoverDealer(null)}
          />
        ))}
      </div>

      {/* Selected Dealer Popup */}
      <AnimatePresence>
        {selectedDealer && (
          <PinPopup
            dealer={dealers.find(d => d.id === selectedDealer)!}
            onClose={() => onSelectDealer(null)}
          />
        )}
      </AnimatePresence>

      {/* Map Legend */}
      <motion.div
        className="absolute bottom-6 left-6 flex flex-col gap-3 p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">
          Dealer Network
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00A8FF] shadow-[0_0_10px_rgba(0,168,255,0.8)]" />
          <span className="text-sm text-white/80">Premium Dealer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="text-sm text-white/80">Standard Dealer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1E293B] border border-white/20" />
          <span className="text-sm text-white/80">No Dealers Yet</span>
        </div>
      </motion.div>

      {/* Stats Overlay */}
      <motion.div
        className="absolute top-6 right-6 flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">
          <div className="text-2xl font-bold text-[#00A8FF]">{dealers.length}</div>
          <div className="text-xs text-white/60">Total Dealers</div>
        </div>
        <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">
          <div className="text-2xl font-bold text-white">
            {Object.keys(stateData).length}
          </div>
          <div className="text-xs text-white/60">States Covered</div>
        </div>
      </motion.div>
    </div>
  );
}

// Individual dealer pin component
interface DealerPinOverlayProps {
  dealer: Dealer;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

function DealerPinOverlay({
  dealer,
  index,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onLeave
}: DealerPinOverlayProps) {
  const getColor = () => {
    switch (dealer.dealer_type) {
      case "premium": return "#00A8FF";
      case "coming_soon": return "#F59E0B";
      default: return "#3B82F6";
    }
  };

  const color = getColor();
  
  // Convert percentage coordinates to CSS positioning
  const left = `${dealer.map_position_x}%`;
  const top = `${dealer.map_position_y}%`;

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{ left, top }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 300 }}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Pulse Ring */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        style={{ backgroundColor: color, opacity: 0.2 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }}
      />

      {/* Pin */}
      <motion.div
        className="relative w-4 h-4 -ml-2 -mt-2"
        animate={{
          scale: isHovered || isSelected ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="w-full h-full rounded-full border-2 border-[#0A0A0A]"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 ${isHovered || isSelected ? 12 : 6}px ${color}`
          }}
        />
        <div className="absolute inset-1 rounded-full bg-[#0A0A0A]" />
      </motion.div>

      {/* Label on Hover */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 whitespace-nowrap pointer-events-none z-10"
          >
            <div className="text-xs font-semibold text-white">{dealer.city}</div>
            <div className="text-[10px] text-white/60 capitalize">{dealer.dealer_type.replace("_", " ")}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}