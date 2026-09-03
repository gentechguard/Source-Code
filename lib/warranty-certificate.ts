export type WarrantyCertificateVariant = "default" | "gentech10";

export function isGentech10WarrantyProduct(productName: string | null | undefined): boolean {
  if (!productName) return false;

  const normalized = productName
    .toUpperCase()
    .replace(/([A-Z])([0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Z])/g, "$1 $2")
    .replace(/[^A-Z0-9]+/g, " ");

  return /\b(?:GENTECH|GEN TECH) 10\b/.test(normalized);
}

export function getWarrantyCertificateVariant(
  productName: string | null | undefined
): WarrantyCertificateVariant {
  return isGentech10WarrantyProduct(productName) ? "gentech10" : "default";
}
