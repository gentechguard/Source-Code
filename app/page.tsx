"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Beams from "@/components/Beams";
import MetallicPaint from "@/components/MetallicPaint";

export default function EntryPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check if this is the Admin APK version
      const isAdminApk = process.env.NEXT_PUBLIC_ADMIN_APK === 'true';

      if (isAdminApk) {
        // Force redirect to admin if it's the admin app
        router.replace("/admin");
        return;
      }

      // Check if mobile
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setShowSplash(true);
      } else {
        // If desktop, redirect immediately
        router.replace("/home");
      }
    };

    checkDevice();
  }, [router]);

  const handleEnter = () => {
    router.push("/home");
  };

  // While checking or if redirecting desktop, show black loader or nothing
  if (isMobile === null || (!isMobile && !showSplash)) {
    return <div className="min-h-[100dvh] bg-black" />;
  }

  return (
    <main className="min-h-[100dvh] bg-black flex flex-col items-center justify-center relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black object-cover" />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center p-8 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="fixed inset-0 z-[-1]">
                <Beams
                  beamWidth={2.0}
                  beamHeight={25}
                  beamNumber={50}
                  speed={2.5}
                  noiseIntensity={3.5}
                  scale={0.15}
                  rotation={25}
                />
              </div>
              <Image
                src="/assets/logo-final-wide.png"
                alt="Gentech Guard"
                width={240}
                height={80}
                className="object-contain w-full h-auto hidden"
                priority
              />
              <div className="h-48 w-48 justify-self-center">
                <MetallicPaint
                  src="/assets/gentech-shield-bitmap.svg"
                  params={{
                    edge: 0.0,
                    patternScale: 2,
                    speed: 0.3,
                    liquid: 0.05
                  }}
                />
              </div>
              <div className="h-24 w-80 justify-self-center">
                <MetallicPaint
                  src="/assets/gentech-text-bitmap.svg"
                  params={{
                    edge: 0.0,
                    patternScale: 2,
                    speed: 0.3,
                    liquid: 0.05
                  }}
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-xs mt-8"
              >
                <button
                  onClick={handleEnter}
                  className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Enter <ArrowRight size={18} />
                </button>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-6">
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
