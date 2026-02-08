"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useShouldUseWebGL, useDeviceCapability } from "@/lib/hooks/useDeviceCapability";

// Mobile-friendly components (always loaded)
import MetallicPaintMobile from "@/components/MetallicPaintMobile";
import BeamsMobile from "@/components/BeamsMobile";

// Heavy WebGL components (lazy loaded for desktop only)
const Beams = lazy(() => import("@/components/Beams"));
const MetallicPaint = lazy(() => import("@/components/MetallicPaint"));

// Loading fallback for lazy components
function WebGLLoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function EntryPage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Device capability detection
  const { isMobile, isClient, prefersReducedMotion } = useDeviceCapability();
  const shouldUseWebGL = useShouldUseWebGL();

  useEffect(() => {
    if (!isClient) return;

    const checkDevice = () => {
      // Check if this is the Admin APK version
      const isAdminApk = process.env.NEXT_PUBLIC_ADMIN_APK === 'true';

      if (isAdminApk) {
        // Force redirect to admin if it's the admin app
        router.replace("/admin");
        return;
      }

      // Always show splash on mobile, redirect on desktop
      if (isMobile) {
        setShowSplash(true);
      } else {
        setShouldRedirect(true);
      }
    };

    checkDevice();
  }, [router, isMobile, isClient]);

  // Handle desktop redirect
  useEffect(() => {
    if (shouldRedirect && isClient && !isMobile) {
      router.replace("/home");
    }
  }, [shouldRedirect, isClient, isMobile, router]);

  const handleEnter = () => {
    router.push("/home");
  };

  // Animation variants - simplified for mobile
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] as const
      }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : 0.2,
        duration: prefersReducedMotion ? 0.1 : 0.6
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : 0.4,
        duration: prefersReducedMotion ? 0.1 : 0.5
      }
    }
  };

  // While checking or if redirecting desktop, show minimal loader
  if (!isClient || (shouldRedirect && !isMobile)) {
    return <div className="min-h-[100dvh] bg-black" style={{ minHeight: '100dvh', background: '#000' }} />;
  }

  return (
    <main className="min-h-[100dvh] bg-black flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: '100dvh', background: '#000' }}>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center p-4 sm:p-6 md:p-8 text-center w-full max-w-md mx-auto"
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Background Beams - Conditional rendering */}
              <div className="fixed inset-0 z-[-1]">
                {shouldUseWebGL ? (
                  <Suspense fallback={<BeamsMobile beamCount={6} />}>
                    <Beams
                      beamWidth={2.0}
                      beamHeight={25}
                      beamNumber={50}
                      speed={2.5}
                      noiseIntensity={3.5}
                      scale={0.15}
                      rotation={25}
                    />
                  </Suspense>
                ) : (
                  <BeamsMobile beamCount={8} />
                )}
              </div>

              {/* Hidden wide logo for SEO/accessibility */}
              <Image
                src="/assets/logo-final-wide.png"
                alt="Gentech Guard"
                width={240}
                height={80}
                className="object-contain w-full h-auto hidden"
                style={{ display: 'none' }}
                priority
              />

              {/* Shield Logo - Responsive sizing */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
                {shouldUseWebGL ? (
                  <Suspense fallback={<MetallicPaintMobile src="/assets/gentech-shield-bitmap.svg" alt="Gentech Guard Shield" />}>
                    <MetallicPaint
                      src="/assets/gentech-shield-bitmap.svg"
                      params={{
                        edge: 0.0,
                        patternScale: 2,
                        speed: 0.3,
                        liquid: 0.05
                      }}
                    />
                  </Suspense>
                ) : (
                  <MetallicPaintMobile
                    src="/assets/gentech-shield-bitmap.svg"
                    alt="Gentech Guard Shield"
                  />
                )}
              </div>

              {/* Text Logo - Responsive sizing */}
              <div className="w-64 h-16 sm:w-72 sm:h-20 md:w-80 md:h-24 flex items-center justify-center mt-2">
                {shouldUseWebGL ? (
                  <Suspense fallback={<MetallicPaintMobile src="/assets/gentech-text-bitmap.svg" alt="Gentech Guard" />}>
                    <MetallicPaint
                      src="/assets/gentech-text-bitmap.svg"
                      params={{
                        edge: 0.0,
                        patternScale: 2,
                        speed: 0.3,
                        liquid: 0.05
                      }}
                    />
                  </Suspense>
                ) : (
                  <MetallicPaintMobile
                    src="/assets/gentech-text-bitmap.svg"
                    alt="Gentech Guard"
                  />
                )}
              </div>

              {/* Enter Button */}
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-xs mt-6 sm:mt-8"
              >
                <button
                  onClick={handleEnter}
                  className="w-full bg-white text-black font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm sm:text-base touch-manipulation"
                >
                  Enter <ArrowRight size={18} />
                </button>
                <p className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-widest mt-4 sm:mt-6">
                  Premium Paint Protection
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
