"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dealer } from "@/types/dealer";
import { MapPin, Phone, Mail, Star, Store, Clock, ArrowRight } from "lucide-react";

interface DealerListProps {
  dealers: Dealer[];
  onSelectDealer: (id: string) => void;
}

export function DealerList({ dealers, onSelectDealer }: DealerListProps) {
  // Group dealers by state
  const groupedDealers = dealers.reduce((acc, dealer) => {
    if (!acc[dealer.state]) {
      acc[dealer.state] = [];
    }
    acc[dealer.state].push(dealer);
    return acc;
  }, {} as Record<string, Dealer[]>);

  const sortedStates = Object.keys(groupedDealers).sort();

  return (
    <div className="w-full h-full overflow-y-auto pr-2 space-y-6">
      <AnimatePresence mode="popLayout">
        {sortedStates.map((state, stateIndex) => (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: stateIndex * 0.1 }}
          >
            {/* State Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00A8FF]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#00A8FF]" />
              </div>
              <h3 className="text-lg font-bold text-white">{state}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              <span className="text-sm text-white/40">
                {groupedDealers[state].length} dealers
              </span>
            </div>

            {/* Dealers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedDealers[state].map((dealer, index) => (
                <DealerCard
                  key={dealer.id}
                  dealer={dealer}
                  index={index}
                  onClick={() => onSelectDealer(dealer.id)}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {dealers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Store className="w-10 h-10 text-white/20" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No dealers found</h3>
          <p className="text-white/60">Try adjusting your filters</p>
        </motion.div>
      )}
    </div>
  );
}

interface DealerCardProps {
  dealer: Dealer;
  index: number;
  onClick: () => void;
}

function DealerCard({ dealer, index, onClick }: DealerCardProps) {
  const getTypeConfig = () => {
    switch (dealer.dealer_type) {
      case "premium":
        return {
          icon: <Star className="w-4 h-4" />,
          color: "#00A8FF",
          label: "Premium"
        };
      case "coming_soon":
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "#F59E0B",
          label: "Coming Soon"
        };
      default:
        return {
          icon: <Store className="w-4 h-4" />,
          color: "#FFFFFF",
          label: "Standard"
        };
    }
  };

  const config = getTypeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ 
              backgroundColor: `${config.color}20`,
              color: config.color
            }}
          >
            {config.icon}
            {config.label}
          </span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#00A8FF] group-hover:translate-x-1 transition-all" />
      </div>

      {/* Name */}
      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00A8FF] transition-colors">
        {dealer.dealer_name}
      </h4>

      {/* Location */}
      <div className="flex items-start gap-2 mb-3">
        <MapPin className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-white/60">{dealer.city}, {dealer.state}</p>
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${dealer.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-[#00A8FF] transition-colors"
        >
          <Phone className="w-4 h-4" />
          {dealer.phone}
        </a>
        {dealer.email && (
          <a
            href={`mailto:${dealer.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-white/60 hover:text-[#00A8FF] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        )}
      </div>
    </motion.div>
  );
}
