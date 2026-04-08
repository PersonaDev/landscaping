import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LawnIcon } from "@/components/LawnIcon";
import { TrendingUp, Eye, Calendar, ExternalLink } from "lucide-react";

interface Analytics {
  total: number;
  month: number;
  daily: { day: string; count: number }[];
  topPages: { path: string; count: number }[];
}

function fmt(n: number) {
  return n.toLocaleString();
}

function label(path: string) {
  if (path === "/" || path === "") return "Home";
  return path.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function DayChart({ daily }: { daily: { day: string; count: number }[] }) {
  if (!daily.length) return <p className="text-stone-400 text-sm">No data yet</p>;
  const max = Math.max(...daily.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-20">
      {daily.map((d) => {
        const height = Math.max(4, Math.round((d.count / max) * 80));
        const short = d.day.slice(5); // MM-DD
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div
              className="w-full bg-[#1a5c30] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ height }}
            />
            <span className="text-[9px] text-stone-400 leading-none">{short}</span>
            <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#111810] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
              {d.count} view{d.count !== 1 ? "s" : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Stats() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Could not load analytics."); setLoading(false); });
  }, []);

  return (
    <>
      <Helmet>
        <title>Site Stats | EDH Landscaping</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-[#f5f3ee]">
        {/* Header */}
        <header className="bg-white border-b border-stone-100 px-5 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1a5c30] flex items-center justify-center">
                <LawnIcon className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="font-semibold text-[#111810] text-sm leading-none">EDH Landscaping</p>
                <p className="text-stone-400 text-[11px] leading-none mt-0.5">Website Analytics</p>
              </div>
            </div>
            <a
              href="/"
              className="text-sm text-stone-500 hover:text-[#1a5c30] flex items-center gap-1 transition-colors"
            >
              Visit site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-5 py-10">
          {loading && (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-24 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {data && (
            <div className="space-y-5">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl px-5 py-5 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-[#1a5c30]" />
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">All-time views</span>
                  </div>
                  <p className="text-3xl font-bold text-[#111810]">{fmt(data.total)}</p>
                </div>
                <div className="bg-white rounded-2xl px-5 py-5 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#1a5c30]" />
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">Last 30 days</span>
                  </div>
                  <p className="text-3xl font-bold text-[#111810]">{fmt(data.month)}</p>
                </div>
              </div>

              {/* Daily chart */}
              <div className="bg-white rounded-2xl px-5 py-5 border border-stone-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-[#1a5c30]" />
                  <span className="text-sm font-semibold text-[#111810]">Last 14 days</span>
                </div>
                <DayChart daily={data.daily} />
              </div>

              {/* Top pages */}
              <div className="bg-white rounded-2xl px-5 py-5 border border-stone-100">
                <p className="text-sm font-semibold text-[#111810] mb-4">Top pages (last 30 days)</p>
                {data.topPages.length === 0 ? (
                  <p className="text-stone-400 text-sm">No data yet — check back after some visitors.</p>
                ) : (
                  <div className="space-y-3">
                    {data.topPages.map((p, i) => {
                      const maxCount = data.topPages[0]?.count || 1;
                      const pct = Math.round((p.count / maxCount) * 100);
                      return (
                        <div key={p.path}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-[#111810] font-medium flex items-center gap-1.5">
                              <span className="text-stone-400 text-[11px] w-4">{i + 1}.</span>
                              {label(p.path)}
                              <span className="text-stone-400 text-[11px]">{p.path}</span>
                            </span>
                            <span className="text-sm font-semibold text-[#1a5c30]">{fmt(p.count)}</span>
                          </div>
                          <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1a5c30] rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] text-stone-400">
                Data updates in real time · edhlandscaping.com
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
