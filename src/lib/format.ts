import type { Property } from "@/types";

export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return "₹0";

  if (value >= 1_00_00_000) {
    const cr = value / 1_00_00_000;
    return `₹${trimDecimal(cr)} Cr`;
  }

  if (value >= 1_00_000) {
    const lakh = value / 1_00_000;
    return `₹${trimDecimal(lakh)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function trimDecimal(value: number): string {
  const fixed = value.toFixed(2);
  return fixed.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
}

export function formatINRFull(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMonthly(value: number): string {
  return `${formatINRFull(value)}/mo`;
}

export function formatPropertyPrice(property: Pick<Property, "price" | "listingType">): string {
  return property.listingType === "rent"
    ? formatMonthly(property.price)
    : formatINR(property.price);
}

export function formatArea(value: number, unit: string = "sq ft"): string {
  return `${value.toLocaleString("en-IN")} ${unit}`;
}

export function formatDate(date: string | Date): string {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function formatRelativeDate(date: string): string {
  const parsed = new Date(date);
  const diff = Date.now() - parsed.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(date);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function pricePerSqft(property: Pick<Property, "price" | "builtupArea" | "listingType">): number {
  if (property.listingType === "rent") return 0;
  return Math.round(property.price / property.builtupArea);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`;
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_00_00_000) return `${trimDecimal(value / 1_00_00_000)} Cr`;
  if (value >= 1_00_000) return `${trimDecimal(value / 1_00_000)} L`;
  if (value >= 1_000) return `${trimDecimal(value / 1_000)}k`;
  return String(value);
}
