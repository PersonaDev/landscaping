import { useState, useEffect } from "react";
import type { PlanConfig } from "../lib/quote";
import { DEFAULT_FREQ, DEFAULT_SCOPE, DEFAULT_SERVICES } from "../lib/quote";

const API_BASE = import.meta.env.PROD ? "" : "";

export function usePlanConfig() {
  const [config, setConfig] = useState<PlanConfig>({
    frequencies: DEFAULT_FREQ,
    scopes: DEFAULT_SCOPE,
    services: DEFAULT_SERVICES,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/plan-config`)
      .then((r) => r.json())
      .then((data) => {
        if (data.frequencies && data.scopes && data.services) {
          setConfig(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
}
