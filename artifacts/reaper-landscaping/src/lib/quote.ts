export interface FreqOption {
  label: string;
  price: number;
  text: string;
  recommended?: boolean;
}

export interface ScopeOption {
  label: string;
  addon: number;
  text: string;
}

export interface ServiceItem {
  name: string;
  minScope: number;
}

export interface PlanConfig {
  frequencies: FreqOption[];
  scopes: ScopeOption[];
  services: ServiceItem[];
}

export const DEFAULT_FREQ: FreqOption[] = [
  { label: "Monthly", price: 45, text: "monthly" },
  { label: "Bi-weekly", price: 60, text: "bi-weekly", recommended: true },
  { label: "Weekly", price: 90, text: "weekly" },
];

export const DEFAULT_SCOPE: ScopeOption[] = [
  { label: "Basic", addon: 0, text: "basic" },
  { label: "Full service", addon: 20, text: "full service" },
  { label: "Total care", addon: 40, text: "total care" },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  { name: "Lawn mowing", minScope: 0 },
  { name: "Edging & trimming", minScope: 0 },
  { name: "Driveway blowout", minScope: 0 },
  { name: "Weed control", minScope: 0 },
  { name: "Garden bed care", minScope: 1 },
  { name: "Yard haul-off", minScope: 2 },
  { name: "Front yard service", minScope: 2 },
];

export const FREQ = DEFAULT_FREQ;
export const SCOPE = DEFAULT_SCOPE;
export const ALL_SERVICES = DEFAULT_SERVICES;

export function calcPrice(freq: number, scope: number, frequencies?: FreqOption[], scopes?: ScopeOption[]) {
  const f = frequencies || DEFAULT_FREQ;
  const s = scopes || DEFAULT_SCOPE;
  return (f[freq]?.price ?? 45) + (s[scope]?.addon ?? 0);
}

export function buildSMS(freq: number, scope: number, interacted: boolean, frequencies?: FreqOption[], scopes?: ScopeOption[]): string {
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? "&" : "?";
  const f = frequencies || DEFAULT_FREQ;
  const s = scopes || DEFAULT_SCOPE;

  let body: string;
  if (!interacted) {
    body = "Hey, I found EDH Landscaping online. Can you tell me about your yard service and get me on the schedule?";
  } else {
    const price = calcPrice(freq, scope, f, s);
    body = `Hi, interested in ${s[scope]?.text || "basic"} ${f[freq]?.text || "monthly"} yard service ($${price}/mo). Can you add me to the schedule?`;
  }

  return `sms:9168472095${sep}body=${encodeURIComponent(body)}`;
}
