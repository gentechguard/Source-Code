"use client";

import { useState } from "react";
import { User, Car, Wrench, ArrowRight, ArrowLeft, Upload, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const steps = [
    { id: 1, title: "Owner Info", icon: User },
    { id: 2, title: "Vehicle Details", icon: Car },
    { id: 3, title: "Installation", icon: Wrench },
];

import { siteConfig } from "@/lib/site-config";
import { useGlobalStore } from "@/context/GlobalStore";
import GlassSurface from "./GlassSurface";

// const ppfCategories = siteConfig.productCategories; // We will use GlobalStore if available

// Formatting helper for Indian Reg Numbers (Simple standardized styling)
const formatRegNumber = (val: string) => {
    // Remove non-alphanumeric chars and convert to upper
    const clean = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Attempt basic pattern matching: TS09AB1234 -> TS 09 AB 1234
    // 2 chars (State), 2 chars (RTO), 1-3 chars (Series), 4 digits (Num)
    // This regex is a 'best effort' formatter for standard plates.

    // Regex breakdown:
    // ^([A-Z]{2})       Group 1: State (2 letters)
    // ([0-9]{1,2})      Group 2: RTO (1-2 digits)
    // ([A-Z]{0,3})      Group 3: Series (0-3 letters optional)
    // ([0-9]{1,4})$     Group 4: Num (1-4 digits)

    const match = clean.match(/^([A-Z]{2})([0-9]{1,2})([A-Z]{0,3})([0-9]{1,4})$/);

    if (match) {
        // Pad RTO to 2 chars if needed? Usually standard is input as is.
        // Let's just space them out.
        const state = match[1];
        const rto = match[2].padStart(2, '0'); // '4' -> '04'
        const series = match[3];
        const num = match[4].padStart(4, '0'); // '123' -> '0123'

        return `${state} ${rto} ${series ? series + ' ' : ''}${num}`;
    }

    return clean; // Return cleaned raw if it doesn't match standard pattern fully yet
};

const formatPhoneNumber = (val: string) => {
    // Keep only numbers
    const clean = val.replace(/\D/g, '');
    // Limit to 10 digits
    return clean.slice(0, 10);
};

export default function WarrantyForm() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        regNumber: "",
        chassisNumber: "",
        ppfRoll: "",
        ppfCategory: "",
        dealerName: "",
        installerMobile: "",
        installationLocation: "",
        message: "",
    });

    // Dynamic Categories
    const { products } = useGlobalStore();
    const ppfCategories = products.length > 0
        ? products.map(p => p.name)
        : siteConfig.productCategories;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [files, setFiles] = useState<{
        vehicleImage: File | null;
        rcImage: File | null;
    }>({
        vehicleImage: null,
        rcImage: null,
    });

    const updateField = (field: string, value: string) => {
        let finalValue = value;
        if (field === 'regNumber') {
            // Just uppercase while typing, format on blur/submit usually, but user asked to reformat 'before submitting'.
            // We'll keep it uppercase for display.
            finalValue = value.toUpperCase();
        }
        if (field === 'phone' || field === 'installerMobile') {
            finalValue = formatPhoneNumber(value);
        }

        setFormData((prev) => ({ ...prev, [field]: finalValue }));
        setError(""); // Clear error on change
    };

    const handleFileChange = (field: "vehicleImage" | "rcImage", file: File | null) => {
        setFiles((prev) => ({ ...prev, [field]: file }));
    };

    const validateStep = (currentStep: number) => {
        const d = formData;
        if (currentStep === 1) {
            // Name and Phone are mandatory. Email is optional.
            if (!d.name || !d.phone) return "Please fill in Name and Phone.";
            if (d.phone.length < 10) return "Phone number must be 10 digits.";
        }
        if (currentStep === 2) {
            // Reg and Roll and Category are mandatory. Chassis is optional.
            if (!d.regNumber) return "Registration Number is required.";
            if (!d.ppfRoll) return "PPF Roll Number is required.";
            if (!d.ppfCategory) return "PPF Category is required.";

            // PPF Roll Validation
            const rollPrefix = d.ppfRoll.toUpperCase().slice(0, 2);
            if (!['GT', 'GN', 'GR'].includes(rollPrefix)) {
                return "Invalid PPF Roll Number. Please check the code on your warranty card.";
            }

            // check Reg Number format roughly (at least state code and numbers)
            if (d.regNumber.length < 6) return "Please enter a valid Registration Number";
        }
        if (currentStep === 3) {
            if (!d.dealerName || !d.installerMobile || !d.installationLocation) return "Please fill in all required dealer details.";
            if (d.installerMobile.length < 10) return "Installer mobile must be 10 digits.";
        }
        return null; // Valid
    };

    const handleNext = () => {
        const errorMsg = validateStep(step);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        setError("");
        setStep((s) => Math.min(s + 1, 3));
    };

    const handleBack = () => {
        setError("");
        setStep((s) => Math.max(s - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errorMsg = validateStep(3);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            // Initialize Supabase
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            let vehicleImgUrl = "";
            let rcImgUrl = "";

            // Helper to upload
            const uploadFile = async (file: File, path: string) => {
                const ext = file.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
                const filePath = `${path}/${fileName}`;

                const { data, error } = await supabase.storage
                    .from('warranty-uploads') // Ensure this bucket exists or use a public one
                    .upload(filePath, file);

                if (error) throw error;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('warranty-uploads')
                    .getPublicUrl(filePath);

                return publicUrl;
            };

            // Upload Images if present
            if (files.vehicleImage) {
                vehicleImgUrl = await uploadFile(files.vehicleImage, 'vehicle_images');
            }
            if (files.rcImage) {
                rcImgUrl = await uploadFile(files.rcImage, 'rc_images');
            }

            const cleanPPFRoll = formData.ppfRoll.replace(/[^a-zA-Z0-9]/g, '');
            const cleanChassis = formData.chassisNumber ? formData.chassisNumber.replace(/[^a-zA-Z0-9]/g, '') : "";

            // Insert Record
            const { error: insertError } = await supabase
                .from('warranty_registrations')
                .insert({
                    name: formData.name,
                    phone: `+91${formData.phone}`,
                    email: formData.email,
                    reg_number: formatRegNumber(formData.regNumber),
                    chassis_number: cleanChassis,
                    ppf_roll: cleanPPFRoll,
                    ppf_category: formData.ppfCategory,
                    dealer_name: formData.dealerName,
                    installer_mobile: `+91${formData.installerMobile}`,
                    installation_location: formData.installationLocation,
                    message: formData.message,
                    vehicle_image_url: vehicleImgUrl,
                    rc_image_url: rcImgUrl,
                    status: 'pending' // Default status
                });

            if (insertError) throw insertError;

            setIsSubmitted(true);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-20 px-8 bg-dark-bg/50 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                    <CheckCircle className="text-green-500" size={40} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Registration Successful!</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                    Your warranty has been officially registered with Gentech Guard. A confirmation email has been sent to you.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-primary-blue text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                >
                    Register Another
                </button>
            </div>
        );
    }

    return (
        <GlassSurface
            borderRadius={24}
            opacity={0.85}
            backgroundOpacity={0.1}
            blur={20}
            borderWidth={0.1}
            width="auto"
            height="auto"
            className="p-0 shadow-2xl"
        >
            <div className="w-full mx-auto rounded-3xl overflow-hidden">
                {/* Header / Steps */}
                <div className="bg-black/10 border-b border-white/5 p-4 md:p-8">
                    <div className="flex justify-between items-center relative">
                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = step >= s.id;
                            const isCurrent = step === s.id;
                            return (
                                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                                    <div
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 border ${isActive
                                            ? "bg-primary-blue border-primary-blue text-white shadow-[0_0_15px_rgba(0,170,255,0.5)]"
                                            : "bg-white/5 border-white/10 text-white/30"
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    <span
                                        className={`text-[10px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-primary-blue" : "text-white/20"
                                            }`}
                                    >
                                        {s.title}
                                    </span>
                                </div>
                            );
                        })}
                        {/* Progress Bar Line */}
                        <div className="absolute top-5 md:top-6 left-0 w-full h-[2px] bg-white/5 -z-0">
                            <div
                                className="h-full bg-primary-blue transition-all duration-500"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-10 relative">
                    <AnimatePresence mode="wait">
                        <motion.form
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {step === 1 && (
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => updateField("name", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none"
                                            placeholder="Enter vehicle owner's name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Phone Number <span className="text-red-500">*</span></label>
                                        <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary-blue focus-within:ring-1 focus-within:ring-primary-blue transition-all">
                                            <span className="bg-white/5 text-white/50 px-4 py-4 flex items-center justify-center border-r border-white/10">+91</span>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => updateField("phone", e.target.value)}
                                                className="flex-1 bg-transparent border-none p-4 text-white placeholder:text-white/20 outline-none"
                                                placeholder="9876543210"
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Email Address <span className="text-white/20">(Optional)</span></label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Registration Number <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.regNumber}
                                                onChange={(e) => updateField("regNumber", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none uppercase font-mono"
                                                placeholder="TS 09 AB 1234"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Chassis / VIN <span className="text-white/20">(Optional)</span></label>
                                            <input
                                                type="text"
                                                value={formData.chassisNumber}
                                                onChange={(e) => updateField("chassisNumber", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none uppercase"
                                                placeholder="MA3..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">PPF Roll Code <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.ppfRoll}
                                                onChange={(e) => updateField("ppfRoll", e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none uppercase"
                                                placeholder="GT-12345"
                                            />
                                            <p className="text-[10px] text-white/30 ml-1">Must start with GT, GN, or GR</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">PPF Product Category <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <div
                                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                                    className={`w-full bg-white/5 border ${dropdownOpen ? 'border-primary-blue ring-1 ring-primary-blue' : 'border-white/10'} rounded-xl p-4 text-white cursor-pointer flex justify-between items-center transition-all hover:bg-white/10`}
                                                >
                                                    <span className={formData.ppfCategory ? "text-white" : "text-white/20"}>
                                                        {formData.ppfCategory || "Select Category"}
                                                    </span>
                                                    <ArrowRight size={14} className={`text-white/50 transition-transform duration-300 ${dropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                                                </div>

                                                <AnimatePresence>
                                                    {dropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                                                        >
                                                            {ppfCategories.map((cat) => (
                                                                <div
                                                                    key={cat}
                                                                    onClick={() => {
                                                                        updateField("ppfCategory", cat);
                                                                        setDropdownOpen(false);
                                                                    }}
                                                                    className={`p-4 cursor-pointer text-sm font-medium transition-colors border-b border-white/5 last:border-none flex items-center justify-between group ${formData.ppfCategory === cat
                                                                        ? "bg-primary-blue/10 text-primary-blue"
                                                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                                                        }`}
                                                                >
                                                                    {cat}
                                                                    {formData.ppfCategory === cat && <CheckCircle size={14} />}
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            {/* Overlay to close dropdown when clicking outside */}
                                            {dropdownOpen && (
                                                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Vehicle Image <span className="text-white/20">(Optional)</span></label>
                                            <div className="border border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange("vehicleImage", e.target.files?.[0] || null)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="text-primary-blue" size={24} />
                                                    <span className="text-sm text-white/70">
                                                        {files.vehicleImage ? files.vehicleImage.name : "Click to upload vehicle photo"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Vehicle Image <span className="text-white/20">(Optional)</span></label>
                                            <div className="border border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange("rcImage", e.target.files?.[0] || null)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="text-primary-blue" size={24} />
                                                    <span className="text-sm text-white/70">
                                                        {files.rcImage ? files.rcImage.name : "Click to upload RC photo"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Dealer / Studio Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.dealerName}
                                            onChange={(e) => updateField("dealerName", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none"
                                            placeholder="Gentech Authorized Studio"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Installer Mobile <span className="text-red-500">*</span></label>
                                        <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary-blue focus-within:ring-1 focus-within:ring-primary-blue transition-all">
                                            <span className="bg-white/5 text-white/50 px-4 py-4 flex items-center justify-center border-r border-white/10">+91</span>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.installerMobile}
                                                onChange={(e) => updateField("installerMobile", e.target.value)}
                                                className="flex-1 bg-transparent border-none p-4 text-white placeholder:text-white/20 outline-none"
                                                placeholder="9876543210"
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">City / Location <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.installationLocation}
                                            onChange={(e) => updateField("installationLocation", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none"
                                            placeholder="Hyderabad, Khajaguda"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Additional Message <span className="text-white/20">(Optional)</span></label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => updateField("message", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all outline-none h-24 resize-none"
                                            placeholder="Any notes..."
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.form>
                    </AnimatePresence>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-6 md:p-8 border-t border-white/5 flex justify-between bg-black/10">
                    <button
                        onClick={handleBack}
                        disabled={step === 1 || isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-3 bg-primary-blue text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(0,170,255,0.3)] hover:shadow-[0_0_30px_rgba(0,170,255,0.5)]"
                        >
                            Next <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-3 bg-primary-blue text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(0,170,255,0.3)] hover:shadow-[0_0_30px_rgba(0,170,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} /> Submitting...
                                </>
                            ) : (
                                <>Submit Warranty</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </GlassSurface>
    );
}
