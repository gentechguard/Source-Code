'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, ShieldCheck, Zap } from 'lucide-react';
import { useGlobalStore, Product } from '@/context/GlobalStore';
import Image from 'next/image';

// Debug helper - logs the exact URL being generated
const getProductImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) {
    console.log('No image path provided');
    return null;
  }
  
  // Replace with your actual Supabase URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rnscmxjrkqelmaiwrouz.supabase.co';
  const fullUrl = `${supabaseUrl}/storage/v1/object/public/product/${imagePath}`;
  
  console.log('Generated Image URL:', fullUrl);
  return fullUrl;
};

// Helper to safely parse specs
const parseSpecs = (specs: any): Array<{label: string, value: string}> => {
  if (!specs) return [];
  
  if (Array.isArray(specs)) {
    return specs.map(s => ({
      label: s.label || s.key || String(s).split(':')[0] || 'Spec',
      value: String(s.value || s.val || s)
    }));
  }
  
  if (typeof specs === 'object') {
    return Object.entries(specs).map(([key, value]) => {
      const label = key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      let displayValue = value;
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
      } else {
        displayValue = String(value);
      }
      
      return { label, value: displayValue };
    });
  }
  
  if (typeof specs === 'string') {
    try {
      const parsed = JSON.parse(specs);
      return parseSpecs(parsed);
    } catch {
      return [];
    }
  }
  
  return [];
};

const parseFeatures = (features: any): string[] => {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  if (typeof features === 'string') {
    try {
      return JSON.parse(features);
    } catch {
      return features ? [features] : [];
    }
  }
  return [];
};

export default function ProductShowcase() {
  const { products, loading } = useGlobalStore();
  const [selectedParent, setSelectedParent] = useState<Product | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoadStatus, setImageLoadStatus] = useState<'loading' | 'error' | 'success'>('loading');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const isSyncingRef = useRef(false);

  const displayedProducts = selectedParent
    ? products.filter(p => p.parent_id === selectedParent.id)
    : products.filter(p => !p.parent_id);

  const syncBackgrounds = useCallback(() => {
    if (!isSyncingRef.current) return;
    const container = containerRef.current;
    if (!container || cardsRef.current.length === 0) {
      rafIdRef.current = requestAnimationFrame(syncBackgrounds);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const xOffset = containerRect.left - cardRect.left;
      card.style.backgroundSize = `${containerRect.width}px ${containerRect.height}px`;
      card.style.backgroundPositionX = `${xOffset}px`;
    });
    rafIdRef.current = requestAnimationFrame(syncBackgrounds);
  }, []);

  useEffect(() => {
    if (!isTransitioning && !loading && displayedProducts.length > 0) {
      const timeoutId = setTimeout(() => {
        isSyncingRef.current = true;
        rafIdRef.current = requestAnimationFrame(syncBackgrounds);
      }, 50);
      return () => {
        clearTimeout(timeoutId);
        isSyncingRef.current = false;
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }
  }, [displayedProducts.length, loading, isTransitioning, syncBackgrounds]);

  useEffect(() => {
    return () => {
      isSyncingRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Debug: Log active product when modal opens
  useEffect(() => {
    if (activeProduct) {
      console.log('Active Product:', activeProduct);
      console.log('Image URL from DB:', activeProduct.image_url);
      setImageLoadStatus('loading');
    }
  }, [activeProduct]);

  const handleCardClick = (product: Product) => {
    const hasChildren = products.some(p => p.parent_id === product.id);
    if (hasChildren) {
      setIsTransitioning(true);
      isSyncingRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      cardsRef.current = [];
      setTimeout(() => {
        setSelectedParent(product);
        setIsTransitioning(false);
      }, 100);
    } else {
      setActiveProduct(product);
    }
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    isSyncingRef.current = false;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    cardsRef.current = [];
    setTimeout(() => {
      setSelectedParent(null);
      setIsTransitioning(false);
    }, 100);
  };

  if (loading) {
    return (
      <section id="product-showcase" className="bg-black py-20">
        <div className="h-[500px] flex items-center justify-center text-white">
          <div className="animate-pulse">Loading Products...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="product-showcase" className="bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8 h-16 flex items-center justify-between relative">
          <AnimatePresence mode="wait">
            {selectedParent ? (
              <motion.div
                key="back-button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <button
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" size={20} />
                  <span className="uppercase tracking-widest text-sm font-bold">Back to All Solutions</span>
                </button>
              </motion.div>
            ) : (
              <div key="spacer" className="w-px" />
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {selectedParent ? (
              <motion.div
                key="children-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-0 bottom-0 flex items-center"
              >
                <div className="text-right">
                  <span className="text-blue-400 text-xs tracking-widest uppercase block mb-1">
                    {selectedParent.name} Variants
                  </span>
                  <p className="text-gray-500 text-xs">
                    {displayedProducts.length} options available
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="main-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                  Our <span className="text-blue-400">Solutions</span> Range
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                  Click any product to explore specific variants tailored to your needs
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Products Grid */}
        <div 
          ref={containerRef}
          className="relative z-10 flex flex-col md:flex-row gap-4 mx-4 md:mx-20 my-8 aspect-[9/16] md:aspect-video"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedParent ? 'children' : 'parents'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="contents"
            >
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleCardClick(product)}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className={`
                    group relative flex-1 hover:flex-[2] min-w-0
                    transition-[flex] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
                    overflow-hidden cursor-pointer 
                    border border-white/10 bg-[#111] rounded-2xl
                    will-change-[flex]
                  `}
                  style={{
                    backgroundImage: "url('/assets/solutions_bg.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500 z-10 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="whitespace-nowrap text-xl md:text-2xl font-black tracking-widest text-white/90 uppercase rotate-0 md:-rotate-90 drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-20">
                    <div className="w-full text-left pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      <span className="text-blue-400 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">
                        {selectedParent ? 'View Details' : 'Click for Options'}
                      </span>
                      <h4 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-white/90 text-sm md:text-base line-clamp-2 mb-4 md:mb-6 font-medium">
                        {product.shortDesc || product.short_desc || 'Premium Protection Solution'}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(product);
                        }}
                        className="border border-blue-400 text-blue-400 font-bold tracking-widest uppercase text-[10px] md:text-xs px-5 py-2 hover:bg-blue-400 hover:text-white transition-colors duration-300 pointer-events-auto"
                      >
                        {selectedParent ? 'View Solution' : 'Explore'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL - FIXED WITH DEBUG */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl shadow-blue-400/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 z-30 text-white/50 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1"
              >
                <X size={24} />
              </button>

              {/* Modal Left: Product Image */}
              <div className="w-full md:w-2/5 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden min-h-[300px] md:min-h-[500px] flex flex-col">
                
                {/* Debug Info - Remove after testing */}
                <div className="absolute top-4 left-4 z-30 bg-black/80 text-white text-xs p-2 rounded max-w-[90%] break-all">
                  <div>DB Path: {activeProduct.image_url || 'NULL'}</div>
                  <div>Status: {imageLoadStatus}</div>
                </div>

                <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
                  {(() => {
                    const imageUrl = getProductImageUrl(activeProduct.image_url);
                    
                    if (!imageUrl) {
                      return (
                        <div className="text-center">
                          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase leading-tight">
                            {activeProduct.name}
                          </h2>
                          <div className="h-1 w-24 bg-blue-400 mx-auto shadow-[0_0_20px_rgba(0,170,255,0.8)]" />
                          <p className="text-red-400 text-xs mt-4">No image URL in database</p>
                        </div>
                      );
                    }

                    return (
                      <div className="relative w-full h-[250px] md:h-[400px]">
                        <Image
                          src={imageUrl}
                          alt={activeProduct.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority
                          onLoad={() => {
                            console.log('Image loaded successfully:', imageUrl);
                            setImageLoadStatus('success');
                          }}
                          onError={(e) => {
                            console.error('Image failed to load:', imageUrl);
                            console.error('Error event:', e);
                            setImageLoadStatus('error');
                          }}
                        />
                        {imageLoadStatus === 'loading' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20" />
              </div>

              {/* Modal Right: Details */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                
                {activeProduct.image_url && imageLoadStatus !== 'error' && (
                  <div className="mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight">
                      {activeProduct.name}
                    </h2>
                    {(activeProduct.short_desc || activeProduct.shortDesc) && (
                      <p className="text-gray-400 text-sm mt-2">
                        {activeProduct.short_desc || activeProduct.shortDesc}
                      </p>
                    )}
                  </div>
                )}

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={20} />
                    Product Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {(() => {
                      const features = parseFeatures(activeProduct.features);
                      if (features.length === 0) {
                        return <p className="text-white/30 text-sm italic">No features listed</p>;
                      }
                      return features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                          <span className="text-white/80 text-sm font-medium leading-relaxed">{feature}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Specs */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={20} className="text-blue-400" />
                    Technical Specs
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(() => {
                      const specEntries = parseSpecs(activeProduct.specs);
                      
                      if (specEntries.length === 0) {
                        return (
                          <div className="col-span-2 text-white/30 text-sm italic bg-white/5 rounded-lg p-4 border border-white/5">
                            Specifications not available for this product
                          </div>
                        );
                      }
                      
                      return specEntries.map((spec, i) => (
                        <div 
                          key={i} 
                          className="bg-white/5 rounded-lg p-3 border border-white/5 hover:border-blue-400/30 transition-colors"
                        >
                          <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-1 line-clamp-1">
                            {spec.label}
                          </p>
                          <p className="text-white font-bold text-sm md:text-base break-words line-clamp-2">
                            {spec.value}
                          </p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}