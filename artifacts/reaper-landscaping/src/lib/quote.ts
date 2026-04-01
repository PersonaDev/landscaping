export const FREQ = [
  { label: "Monthly", price: 45, text: "monthly" },
  { label: "Bi-weekly", price: 60, text: "bi-weekly", recommended: true },
  { label: "Weekly", price: 90, text: "weekly" },
] as const;

export const SCOPE = [
  {
    label: "Basic",
    addon: 0,
    text: "basic",
    services: [
      { name: "Lawn mowing", included: [0, 1, 2] },
      { name: "Edging & trimming", included: [0, 1, 2] },
      { name: "Driveway blowout", included: [0, 1, 2] },
      { name: "Weed control", included: [1, 2] },
      { name: "Garden bed care", included: [1, 2] },
      { name: "Yard haul-off", included: [2] },
      { name: "Front yard service", included: [2] },
    ],
  },
  {
    label: "Full service",
    addon: 20,
    text: "full service",
    services: [],
  },
  {
    label: "Total care",
    addon: 40,
    text: "total care",
    services: [],
  },
] as const;

export const ALL_SERVICES = [
  { name: "Lawn mowing", minScope: 0 },
  { name: "Edging & trimming", minScope: 0 },
  { name: "Driveway blowout", minScope: 0 },
  { name: "Weed control", minScope: 1 },
  { name: "Garden bed care", minScope: 1 },
  { name: "Yard haul-off", minScope: 2 },
  { name: "Front yard service", minScope: 2 },
];

export function calcPrice(freq: number, scope: number) {
  return FREQ[freq].price + SCOPE[scope].addon;
}

export function buildSMS(freq: number, scope: number, interacted: boolean): string {
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? "&" : "?";

  let body: string;
  if (!interacted) {
    body = "Hey, I found EDH Landscaping online. Can you tell me about your yard service and get me on the schedule?";
  } else {
    const price = calcPrice(freq, scope);
    body = `Hi, interested in ${SCOPE[scope].text} ${FREQ[freq].text} yard service ($${price}/mo). Can you add me to the schedule?`;
  }

  return `sms:9168472095${sep}body=${encodeURIComponent(body)}`;
}
