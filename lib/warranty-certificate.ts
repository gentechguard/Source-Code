export type WarrantyCertificateVariant = "default" | "ppf10";

export function isPpf10WarrantyProduct(productName: string | null | undefined): boolean {
  if (!productName) return false;

  const normalized = productName
    .toUpperCase()
    .replace(/([A-Z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2")
    .replace(/[^A-Z0-9]+/g, " ");

  return /\bPPF\b/.test(normalized) && /\b10\b/.test(normalized);
}

export function getWarrantyCertificateVariant(
  productName: string | null | undefined
): WarrantyCertificateVariant {
  return isPpf10WarrantyProduct(productName) ? "ppf10" : "default";
}
