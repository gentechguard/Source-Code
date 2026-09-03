import React from 'react';
import Image from "next/image";
import { Shield, Sparkles, Sun, Droplets, Layers, Zap } from 'lucide-react';
import { getWarrantyCertificateVariant } from "../lib/warranty-certificate";

// --- Types ---
export interface WarrantyData {
    warrantyId: string;
    productName: string;
    duration: string;
    serialNumber: string;
    materialConsumed: string;
    customer: {
        name: string;
        vehicleModel: string;
        vin: string;
        phone: string;
    };
    installer: {
        studioName: string;
        location: string;
        technician: string;
        date: string;
    };
}

// --- Sub-components ---

const GentechLogo: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
    <svg viewBox="0 0 200 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized G Shield Logo */}
        <path d="M30 5L10 15V35C10 48 30 55 30 55C30 55 50 48 50 35V15L30 5Z" stroke="#22d3ee" strokeWidth="3" fill="rgba(6,182,212,0.1)" />
        <path d="M30 20V40M20 30H40" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />

        {/* Text */}
        <text x="65" y="28" fill="white" fontFamily="Montserrat" fontWeight="800" fontSize="24" letterSpacing="1">GENTECH</text>
        <text x="65" y="48" fill="#22d3ee" fontFamily="Montserrat" fontWeight="600" fontSize="16" letterSpacing="4">GUARD</text>
    </svg>
);

const getFeatureIcon = (type: string, className: string) => {
    switch (type) {
        case 'gloss': return <Sparkles className={className} />;
        case 'healing': return <Zap className={className} />;
        case 'yellowing': return <Sun className={className} />;
        case 'hydrophobic': return <Droplets className={className} />;
        case 'impact': return <Shield className={className} />;
        case 'adhesion': return <Layers className={className} />;
        default: return <Shield className={className} />;
    }
};

const CoverageIcon: React.FC<{ type: string; label: string }> = ({ type, label }) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center group">
            <div className="w-12 h-12 rounded-full bg-[#00d3f3] flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.6)] border border-[#a3f4fd] group-hover:scale-110 transition-transform duration-300">
                {getFeatureIcon(type, "w-6 h-6 text-black")}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#d1d5dc] mt-1">{label}</span>
        </div>
    );
};

const GoldLogo: React.FC = () => (
    <svg viewBox="0 0 360 120" className="h-[112px] w-[360px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="goldLogoGradient" x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#fff6bd" />
                <stop offset="0.34" stopColor="#e0b753" />
                <stop offset="0.66" stopColor="#9d6923" />
                <stop offset="1" stopColor="#ffe08a" />
            </linearGradient>
            <filter id="goldLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <path d="M53 9L18 25V62C18 89 53 106 53 106C53 106 88 89 88 62V25L53 9Z" fill="#101010" stroke="url(#goldLogoGradient)" strokeWidth="5" filter="url(#goldLogoGlow)" />
        <path d="M53 24L31 34V60C31 77 53 88 53 88C53 88 75 77 75 60V34L53 24Z" stroke="#f8d783" strokeWidth="2" opacity="0.75" />
        <path d="M64 38H47C38 38 32 44 32 54C32 64 39 70 49 70H65L72 57H54" stroke="url(#goldLogoGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M76 30L63 47" stroke="#f8d783" strokeWidth="5" strokeLinecap="round" />
        <text x="110" y="57" fill="url(#goldLogoGradient)" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="42" letterSpacing="2">GENTECH</text>
        <text x="154" y="92" fill="#ffffff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24" letterSpacing="14">GUARD</text>
        <path d="M112 76H146M316 76H350" stroke="url(#goldLogoGradient)" strokeWidth="2" />
    </svg>
);

const GoldWarrantyBadge: React.FC = () => (
    <div className="relative h-[190px] w-[210px]">
        <svg viewBox="0 0 210 190" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="badgeGold" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#fff4b6" />
                    <stop offset="0.45" stopColor="#d49a32" />
                    <stop offset="1" stopColor="#704814" />
                </linearGradient>
            </defs>
            <path d="M105 9L164 33V102C164 146 105 178 105 178C105 178 46 146 46 102V33L105 9Z" fill="#111" stroke="url(#badgeGold)" strokeWidth="5" />
            <path d="M105 21L153 41V99C153 134 105 162 105 162C105 162 57 134 57 99V41L105 21Z" stroke="#f7d681" strokeWidth="2" opacity="0.8" />
            <path d="M29 68C19 86 17 112 30 136M181 68C191 86 193 112 180 136" stroke="url(#badgeGold)" strokeWidth="6" strokeLinecap="round" />
            <path d="M19 117L48 110M191 117L162 110M28 139L57 129M182 139L153 129" stroke="url(#badgeGold)" strokeWidth="4" strokeLinecap="round" />
            {[70, 84, 98, 112, 126, 140].map((x, index) => (
                <path key={x} d={`M${x} 52L${x + 3} 58L${x + 10} 59L${x + 5} 64L${x + 6} 71L${x} 68L${x - 6} 71L${x - 5} 64L${x - 10} 59L${x - 3} 58Z`} fill="#f7d681" opacity={index === 2 || index === 3 ? 1 : 0.72} />
            ))}
        </svg>
        <div className="absolute inset-x-0 top-[58px] text-center">
            <div className="text-[70px] leading-none font-black text-[#f7d681]" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>10</div>
            <div className="text-[18px] font-black uppercase tracking-[0.18em] text-[#f7d681]">Years</div>
        </div>
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[182px] bg-[#f7d681] text-black text-center font-black uppercase tracking-[0.12em] py-2 shadow-[0_5px_15px_rgba(0,0,0,0.45)]">
            Warranty
        </div>
    </div>
);

const GoldFeatureIcon: React.FC<{ type: string; label: string }> = ({ type, label }) => (
    <div className="flex w-[96px] flex-col items-center gap-3 text-center">
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#d49a32] bg-[#080705] shadow-[0_0_18px_rgba(214,165,66,0.22)]">
            {getFeatureIcon(type, "w-8 h-8 text-[#f8d783]")}
        </div>
        <span className="text-[11px] font-bold uppercase leading-tight text-white tracking-[0.08em]">{label}</span>
    </div>
);

const GoldInfoField: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
    <div className="border-b border-[#b9842e]/55 pb-3">
        <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#d6a542]">{label}</span>
        <span className={`block break-words text-[17px] leading-snug ${highlight ? "font-bold text-[#f7d681]" : "font-medium text-white"}`}>
            {value}
        </span>
    </div>
);

const qrCells = new Set([
    0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 13, 14, 16, 17,
    18, 22, 24, 26, 27, 30, 31, 33, 35, 36, 37, 38,
    40, 42, 44, 45, 47, 48, 50, 53, 54, 55, 57, 59,
    60, 62, 64, 66, 68, 70, 71, 72, 73, 76, 78, 80,
    81, 83, 84, 86, 88, 89, 90, 91, 92, 94, 96, 98
]);

const WarrantyQrMark: React.FC = () => (
    <div className="grid h-[92px] w-[92px] grid-cols-10 gap-[2px] bg-white p-[5px]">
        {Array.from({ length: 100 }, (_, index) => (
            <span key={index} className={qrCells.has(index) ? "bg-black" : "bg-white"} />
        ))}
    </div>
);

// --- Main Component ---

interface CertificateProps {
    data: WarrantyData;
}

const DefaultCertificate: React.FC<CertificateProps> = ({ data }) => {
    return (
        <div
            className="certificate-root mx-auto bg-[#020618] relative overflow-hidden text-white flex flex-col shadow-2xl print:shadow-none"
            // 794px x 1123px is the standard pixel dimension for A4 at 96 DPI.
            // We fix this size so the layout is static, then scale the parent.
            style={{ width: '794px', height: '1123px' }}
        >

            {/* Background Ambience / Tech Grid */}
            {/* Background Ambience / Tech Grid */}
            <div className="absolute inset-0 bg-tech-grid bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
            {/* Replaced filter blur with radial gradients for html2canvas compatibility */}
            <div className="absolute top-0 right-0 w-96 h-96" style={{ background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(2,6,24,0) 70%)' }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64" style={{ background: 'radial-gradient(circle, rgba(21,93,252,0.15) 0%, rgba(2,6,24,0) 70%)' }}></div>

            {/* Decorative Border Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00b8db] to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00b8db] to-transparent"></div>

            {/* Header */}
            <header className="relative z-10 pt-12 pb-6 px-12 flex justify-between items-start border-b border-[#1e293988]">
                <div>
                    <h2 className="text-[#00d3f3] text-xs font-bold tracking-[0.3em] mb-2 uppercase">Official Protection Document</h2>
                    <h1 className="text-4xl font-display font-black uppercase tracking-tight text-white">
                        Warranty <span className="text-[#00d3f3]">Certificate</span>
                    </h1>
                </div>
                <GentechLogo className="h-16 hidden" />
                <div className="relative">
                    <Image
                        src="/assets/logo-final-wide.png"
                        alt="Gentech Guard"
                        width={240}
                        height={80}
                        className="object-contain object-right"
                        unoptimized
                    />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 px-12 py-8 flex flex-col gap-8">

                {/* Primary Warranty Details - Hero Section */}
                <div className="grid grid-cols-2 gap-6 bg-[#101828] p-6 rounded-xl border border-[#1e2939]">
                    <div className="space-y-1">
                        <p className="text-[#99a1af] text-xs uppercase tracking-widest">Product Installed</p>
                        <p className="text-2xl font-display font-bold text-white">{data.productName}</p>
                        <div className="inline-block px-3 py-1 bg-[#00b8db44] text-[#00d3f3] text-xs font-bold rounded border border-[#00b8db]/30 mt-2">
                            {data.duration} WARRANTY
                        </div>
                    </div>
                    <div className="space-y-4 text-right">
                        <div>
                            <p className="text-[#99a1af] text-xs uppercase tracking-widest">Warranty ID</p>
                            <p className="text-xl font-mono text-[#53e8fb] tracking-wider">{data.warrantyId}</p>
                        </div>
                        <div>
                            <p className="text-[#99a1af] text-xs uppercase tracking-widest">Roll Serial No.</p>
                            <p className="text-sm font-mono text-white">{data.serialNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-12 mt-4">

                    {/* Customer Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 bg-[#00b8db]"></div>
                            <h3 className="font-display font-bold uppercase tracking-wider text-lg">Customer Info</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Owner Name</span>
                                <span className="text-sm font-semibold">{data.customer.name}</span>
                            </div>
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Vehicle Model</span>
                                <span className="text-sm font-semibold">{data.customer.vehicleModel}</span>
                            </div>
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">VIN / Chassis No.</span>
                                <span className="font-mono text-sm text-[#d1d5dc]">{data.customer.vin}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Contact</span>
                                <span className="text-sm text-[#d1d5dc]">{data.customer.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Installer Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 bg-[#6a7282]"></div>
                            <h3 className="font-display font-bold uppercase tracking-wider text-lg text-[#e5e7eb]">Installation Studio</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Authorized Studio</span>
                                <span className="text-sm font-semibold text-[#00d3f3]">{data.installer.studioName}</span>
                            </div>
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Location</span>
                                <span className="text-sm font-semibold">{data.installer.location}</span>
                            </div>
                            <div className="border-b border-[#1e2939] pb-2">
                                <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Technician</span>
                                <span className="text-sm text-[#d1d5dc]">{data.installer.technician}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Install Date</span>
                                    <span className="text-sm text-white">{data.installer.date}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-[#6a7282] uppercase tracking-wider mb-1">Material Used</span>
                                    <span className="text-sm text-white">{data.materialConsumed}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coverage Icons */}
                <div className="mt-8">
                    <h4 className="text-center text-xs uppercase tracking-[0.2em] text-[#6a7282] mb-6">Active Protection Features</h4>
                    <div className="flex justify-between px-4">
                        <CoverageIcon type="gloss" label="Mirror Gloss" />
                        <CoverageIcon type="healing" label="Self Healing" />
                        <CoverageIcon type="impact" label="Impact Resist" />
                        <CoverageIcon type="hydrophobic" label="Hydrophobic" />
                        <CoverageIcon type="yellowing" label="Anti-Yellowing" />
                        <CoverageIcon type="adhesion" label="Secure Bond" />
                    </div>
                </div>

                {/* After Care Section */}
                <div className="mt-auto pt-6 border-t border-[#1e2939]">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 bg-[#00d3f3] rounded-full"></div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-[#00d3f3]">Essential After Care</h5>
                    </div>
                    <p className="text-[10px] leading-relaxed text-[#99a1af] text-justify">
                        To ensure longevity, allow the film to cure for 72 hours before washing.
                        Use only pH-neutral shampoos and microfiber mitts. Avoid high-pressure water
                        sprays directly on edges (maintain 1.5ft distance). Do not use abrasive compounds,
                        polishes, or automatic car washes with stiff brushes. Promptly remove bird droppings
                        and tree sap. Heat allows the film to self-heal minor scratches.
                        Full terms available at gentechguard.com/warranty.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 bg-[#101828] py-4 px-12 flex justify-between items-center text-[10px] text-[#6a7282] border-t border-[#1e2939]">
                <div className="flex items-center gap-4">
                    <span className="text-[#0092b8] font-mono">{data.warrantyId}</span>
                    <span>|</span>
                    <span>VERIFIED AUTHENTIC</span>
                </div>
                <div className="uppercase tracking-widest font-semibold">
                    Issued by Gentech Guard
                </div>
            </footer>
        </div>
    );
};

const Ppf10Certificate: React.FC<CertificateProps> = ({ data }) => {
    const displayDuration = "10 Years";

    return (
        <div
            className="certificate-root mx-auto relative overflow-hidden text-white shadow-2xl print:shadow-none"
            style={{
                width: '794px',
                height: '1123px',
                fontFamily: '"Arial Narrow", Arial, sans-serif',
                background: 'linear-gradient(145deg, #030303 0%, #090806 42%, #000000 100%)'
            }}
        >
            <div className="absolute inset-0 opacity-[0.12]" style={{
                backgroundImage: 'linear-gradient(30deg, rgba(214,165,66,0.22) 12%, transparent 12.5%, transparent 87%, rgba(214,165,66,0.22) 87.5%, rgba(214,165,66,0.22)), linear-gradient(150deg, rgba(214,165,66,0.22) 12%, transparent 12.5%, transparent 87%, rgba(214,165,66,0.22) 87.5%, rgba(214,165,66,0.22)), linear-gradient(30deg, rgba(214,165,66,0.22) 12%, transparent 12.5%, transparent 87%, rgba(214,165,66,0.22) 87.5%, rgba(214,165,66,0.22)), linear-gradient(150deg, rgba(214,165,66,0.22) 12%, transparent 12.5%, transparent 87%, rgba(214,165,66,0.22) 87.5%, rgba(214,165,66,0.22))',
                backgroundSize: '28px 49px',
                backgroundPosition: '0 0, 0 0, 14px 24.5px, 14px 24.5px'
            }} />
            <div className="absolute inset-[16px] border-2 border-[#d6a542]" />
            <div className="absolute inset-[28px] border border-[#75511d]" />
            <div className="absolute inset-[36px] border border-[#d6a542]/35" />

            <div className="relative z-10 flex h-full flex-col px-[54px] py-[48px]">
                <header className="grid grid-cols-[1fr_1px_0.92fr] items-start gap-8 border-b border-[#d6a542] pb-8">
                    <div className="relative min-h-[148px]">
                        <GoldLogo />
                        <div className="absolute bottom-[-6px] left-0 h-[2px] w-[330px] bg-gradient-to-r from-transparent via-[#d6a542] to-transparent" />
                    </div>
                    <div className="h-[132px] w-px bg-[#d6a542]/70" />
                    <div className="pt-2 text-right uppercase">
                        <p className="mb-4 text-[14px] font-bold tracking-[0.28em] text-white">Official Protection Document</p>
                        <h1 className="text-[52px] font-black leading-[1.02] tracking-[0.08em] text-[#f7d681]" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
                            Warranty<br />Certificate
                        </h1>
                    </div>
                </header>

                <section className="grid grid-cols-[1fr_220px] items-center gap-8 py-7">
                    <div className="space-y-5">
                        <p className="max-w-[485px] text-[18px] leading-8 text-white">
                            This is to certify that the Paint Protection Film (PPF 10) installed on the vehicle is covered under Gentech Guard Warranty against manufacturing defects.
                        </p>
                        <div className="rounded-[18px] border border-[#d6a542] bg-black/55 p-7">
                            <p className="mb-3 text-[15px] font-bold uppercase tracking-[0.18em] text-[#d6a542]">Product Installed</p>
                            <p className="mb-5 text-[35px] font-black leading-tight text-white">{data.productName}</p>
                            <span className="inline-flex border border-[#d6a542] px-5 py-3 text-[14px] font-black uppercase tracking-[0.16em] text-[#f7d681]">
                                {displayDuration} Warranty
                            </span>
                            <div className="mt-5 grid grid-cols-2 gap-5 border-t border-[#d6a542]/55 pt-4 uppercase">
                                <div>
                                    <p className="mb-1 text-[11px] font-bold tracking-[0.16em] text-[#d6a542]">Warranty ID</p>
                                    <p className="font-mono text-[18px] font-bold tracking-[0.1em] text-[#f7d681]">{data.warrantyId}</p>
                                </div>
                                <div>
                                    <p className="mb-1 text-[11px] font-bold tracking-[0.16em] text-[#d6a542]">Roll Serial No.</p>
                                    <p className="font-mono text-[15px] font-bold tracking-[0.08em] text-white">{data.serialNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <GoldWarrantyBadge />
                    </div>
                </section>

                <section className="grid grid-cols-[1fr_1px_1fr] gap-8">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d6a542] text-black">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h2 className="text-[20px] font-black uppercase tracking-[0.13em] text-[#d6a542]">Customer Info</h2>
                        </div>
                        <div className="space-y-4">
                            <GoldInfoField label="Owner Name" value={data.customer.name} />
                            <GoldInfoField label="Vehicle Model" value={data.customer.vehicleModel} />
                            <GoldInfoField label="VIN / Chassis No." value={data.customer.vin} />
                            <GoldInfoField label="Contact" value={data.customer.phone} />
                        </div>
                    </div>

                    <div className="w-px bg-[#d6a542]/70" />

                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d6a542] text-black">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h2 className="text-[20px] font-black uppercase tracking-[0.13em] text-[#d6a542]">Installation Studio</h2>
                        </div>
                        <div className="space-y-4">
                            <GoldInfoField label="Authorized Studio" value={data.installer.studioName} />
                            <GoldInfoField label="Location" value={data.installer.location} />
                            <GoldInfoField label="Technician" value={data.installer.technician} />
                            <div className="grid grid-cols-2 gap-6">
                                <GoldInfoField label="Install Date" value={data.installer.date} />
                                <GoldInfoField label="Material Used" value={data.materialConsumed} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-5">
                        <div className="h-px bg-[#d6a542]" />
                        <h2 className="text-center text-[15px] font-black uppercase tracking-[0.2em] text-[#d6a542]">Active Protection Features</h2>
                        <div className="h-px bg-[#d6a542]" />
                    </div>
                    <div className="flex justify-between">
                        <GoldFeatureIcon type="gloss" label="Mirror Gloss" />
                        <GoldFeatureIcon type="healing" label="Self Healing" />
                        <GoldFeatureIcon type="impact" label="Impact Resist" />
                        <GoldFeatureIcon type="hydrophobic" label="Hydrophobic" />
                        <GoldFeatureIcon type="yellowing" label="Anti-Yellowing" />
                        <GoldFeatureIcon type="adhesion" label="Secure Bond" />
                    </div>
                </section>

                <section className="mt-auto rounded-[15px] border border-[#d6a542] bg-black/55 p-6">
                    <div className="grid grid-cols-[100px_1fr_140px] gap-5">
                        <div className="flex items-center justify-center">
                            <Shield className="h-20 w-20 text-[#f7d681]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h2 className="mb-2 text-[20px] font-black uppercase tracking-[0.16em] text-[#d6a542]">Essential After Care</h2>
                            <p className="text-[13px] leading-5 text-white/80">
                                To ensure longevity, allow the film to cure for 72 hours before washing. Use only pH-neutral shampoos and microfiber mitts. Avoid high-pressure water sprays directly on edges. Do not use abrasive compounds, polishes, or automatic car washes with stiff brushes. Heat allows the film to self-heal minor scratches.
                            </p>
                            <p className="mt-2 text-[13px] text-[#f7d681]">Full terms available at gentechguard.com/warranty</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 text-center">
                            <WarrantyQrMark />
                            <p className="text-[13px] font-black uppercase leading-5 tracking-[0.17em] text-white">Warranty Portal</p>
                        </div>
                    </div>
                </section>

                <footer className="mt-5 flex items-center justify-between border-t border-[#d6a542] pt-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white">
                    <div className="flex items-center gap-5">
                        <span className="text-[#f7d681]">{data.warrantyId}</span>
                        <span className="h-5 w-px bg-[#d6a542]" />
                        <span>Verified Authentic</span>
                    </div>
                    <div className="text-[#f7d681]">Issued By Gentech Guard</div>
                </footer>
            </div>
        </div>
    );
};

const Certificate: React.FC<CertificateProps> = ({ data }) => {
    if (getWarrantyCertificateVariant(data.productName) === "ppf10") {
        return <Ppf10Certificate data={data} />;
    }

    return <DefaultCertificate data={data} />;
};

export default Certificate;
