export const siteConfig = {
    company: {
        name: "Gentech Guard",
        legalName: "Gentech Guard Pvt Ltd",
        copyright: "© 2025 Gentech Guard®. All Rights Reserved."
    },
    contact: {
        phone: {
            display: "+91 99898 20222",
            value: "+919989820222", // For tel: links
        },
        email: "info@gentechguard.com",
        address: {
            line1: "Gentech Headquarters",
            line2: "Hyderabad, Telangana",
            fullAddress: "Hyderabad, Telangana, India",
            mapLink: "https://maps.google.com/?q=Gentech+Guard+Hyderabad"
        },
        whatsapp: {
            number: "919989820222",
            defaultMessage: "Hi, I'm interested in becoming a dealer."
        }
    },
    socials: {
        instagram: "https://instagram.com/gentechguard",
        facebook: "https://facebook.com/gentechguard",
        youtube: "https://youtube.com/@gentechguard"
    },
    navigation: [
        { name: "Home", href: "/home" },
        { name: "Products", href: "/home#product-showcase" },
        { name: "Process", href: "/home#process" },
        { name: "About Us", href: "/about" },
        { name: "GALLERY", href: "/gallery" },
        { name: "E-Warranty", href: "/warranty" },
    ],
    // Fallback products if DB fails or for static generation references
    productCategories: [
        "Gen 4 PPF",
        "Gen 5 PPF",
        "Gen Matte 5",
        "Gen Pro 6+",
        "Gen Pro Ultra 8"
    ],
    metadata: {
        title: "Gentech Guard | Premium Paint Protection Film",
        description: "Next-generation automotive protection solutions backed by industry expertise and advanced Aliphatic TPU technology."
    }
};

export type SiteConfig = typeof siteConfig;
