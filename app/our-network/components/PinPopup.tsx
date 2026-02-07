// app/our-network/components/PinPopup.tsx
"use client";

import { motion } from "framer-motion";
import { Dealer } from "@/types/dealer";
import { MapPin, Phone, Mail, X, Navigation } from "lucide-react";

interface PinPopupProps {
  dealer: Dealer;
  onClose: () => void;
}

export function PinPopup({ dealer, onClose }: PinPopupProps) {
  const getTypeColor = () => {
    switch (dealer.dealer_type) {
      case "premium":
        return "#00A8FF";
      case "coming_soon":
        return "#F59E0B";
      default:
        return "#FFFFFF";
    }
  };

  const color = getTypeColor();

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-50"
      style={{ transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {/* Popup Card */}
      <div 
        className="relative w-80 p-6 rounded-2xl border backdrop-blur-xl"
        style={{
          background: "rgba(17, 17, 17, 0.95)",
          borderColor: `${color}40`,
          boxShadow: `0 25px 50px rgba(0,0,0,0.5), 0 0 30px ${color}20`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {/* Type Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span 
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {dealer.dealer_type.replace("_", " ")}
          </span>
        </div>

        {/* Dealer Name */}
        <h3 className="text-xl font-bold text-white mb-2 pr-6">
          {dealer.dealer_name}
        </h3>

        {/* Contact Person */}
        {dealer.contact_person && (
          <p className="text-sm text-white/60 mb-4">
            Contact: {dealer.contact_person}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

        {/* Location */}
        <div className="flex items-start gap-3 mb-3">
          <MapPin className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-white/80">{dealer.address}</p>
            <p className="text-sm text-white/60">{dealer.city}, {dealer.state} {dealer.pincode}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 mb-3">
          <Phone className="w-5 h-5 text-white/40 flex-shrink-0" />
          <a 
            href={`tel:${dealer.phone}`}
            className="text-sm text-white/80 hover:text-[#00A8FF] transition-colors"
          >
            {dealer.phone}
          </a>
        </div>

        {/* Email */}
        {dealer.email && (
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-white/40 flex-shrink-0" />
            <a 
              href={`mailto:${dealer.email}`}
              className="text-sm text-white/80 hover:text-[#00A8FF] transition-colors truncate"
            >
              {dealer.email}
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <a
            href={`https://maps.google.com/?q=${dealer.latitude || dealer.city}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A8FF] hover:bg-[#00A8FF]/90 text-black font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
          <a
            href={`tel:${dealer.phone}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all border border-white/10"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>

      {/* Arrow Pointer */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
        style={{
          background: "rgba(17, 17, 17, 0.95)",
          borderRight: `1px solid ${color}40`,
          borderBottom: `1px solid ${color}40`
        }}
      />
    </motion.div>
  );
}