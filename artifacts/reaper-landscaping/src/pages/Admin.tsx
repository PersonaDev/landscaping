import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Helmet } from "react-helmet-async";
import {
  LogOut, Plus, Edit2, Trash2, Eye, EyeOff,
  Bold, Italic, List, ListOrdered, Heading2, Undo, Redo, Save, X,
  DollarSign, ChevronUp, ChevronDown, Grip,
  ShieldCheck, ShieldAlert, KeyRound, Download, Copy, Check
} from "lucide-react";
import type { PlanConfig, FreqOption, ScopeOption, ServiceItem } from "../lib/quote";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const LEGACY_TOKEN_KEY = "edh_admin_token";

function clearLegacyToken() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore
  }
}

const jsonHeaders = { "Content-Type": "application/json" } as const;

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [needs2fa, setNeeds2fa] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const body: { password: string; code?: string } = { password };
      if (needs2fa && code.trim()) body.code = code.trim();
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: jsonHeaders,
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) {
        if (data.requires2fa) {
          setNeeds2fa(true);
          if (needs2fa) setError(data.error ?? "Invalid code");
          return;
        }
        throw new Error(data.error ?? "Login failed");
      }
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center px-5">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
        <div className="mb-7">
          <div className="w-9 h-9 bg-[#006837] rounded-lg flex items-center justify-center mb-4">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <h1 className="font-sans text-2xl font-bold text-[#111111]">Admin Login</h1>
          <p className="text-stone-500 text-sm mt-1">EDH Landscaping blog admin</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={needs2fa}
            className="w-full min-h-[44px] border border-stone-200 rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent disabled:bg-stone-50 disabled:text-stone-500"
          />
          {needs2fa && (
            <div>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="6-digit code or recovery code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                autoFocus
                className="w-full min-h-[44px] border border-stone-200 rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent font-mono tracking-wider"
              />
              <p className="text-xs text-stone-500 mt-1.5">
                Enter the code from your authenticator app, or one of your recovery codes.
              </p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] bg-[#006837] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#005030] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : needs2fa ? "Verify & Sign In" : "Sign In"}
          </button>
          {needs2fa && (
            <button
              type="button"
              onClick={() => { setNeeds2fa(false); setCode(""); setError(""); }}
              className="w-full text-xs text-stone-500 hover:text-stone-700"
            >
              Use a different password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick, active, children, title,
}: { onClick: () => void; active?: boolean; children: React.ReactNode; title?: string }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-1.5 rounded transition-colors ${active ? "bg-[#006837] text-white" : "text-stone-600 hover:bg-stone-100"}`}
    >
      {children}
    </button>
  );
}

function PostEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Post | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(!!initial);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initial?.body ?? "",
    editorProps: {
      attributes: {
        class: "min-h-[200px] sm:min-h-[300px] outline-none prose prose-stone max-w-none",
      },
    },
  });

  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEdited]);

  async function save() {
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const body = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        body: editor?.getHTML() ?? "",
        coverImageUrl: coverImageUrl.trim() || null,
        published,
      };
      const method = initial ? "PUT" : "POST";
      const url = initial ? `/api/posts/${initial.slug}` : "/api/posts";
      const r = await fetch(url, {
        method,
        headers: jsonHeaders,
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Save failed");
      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-5 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
          <h2 className="font-sans text-lg sm:text-xl font-bold text-[#111111]">
            {initial ? "Edit Post" : "New Post"}
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onCancel}
              className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" /> <span className="hidden sm:inline">Cancel</span>
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-1.5 min-h-[44px] bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Slug
            </label>
            <input
              value={slug}
              onChange={(e) => { setSlugEdited(true); setSlug(e.target.value); }}
              placeholder="post-url-slug"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary shown on the blog index…"
              rows={2}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Cover Image URL (optional)
            </label>
            <input
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Content
            </label>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-0.5 p-2 border-b border-stone-100 bg-stone-50 flex-wrap">
                <ToolbarButton title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")}>
                  <Bold className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")}>
                  <Italic className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton title="Heading" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })}>
                  <Heading2 className="w-4 h-4" />
                </ToolbarButton>
                <div className="w-px h-5 bg-stone-200 mx-1" />
                <ToolbarButton title="Bullet list" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")}>
                  <List className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton title="Numbered list" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")}>
                  <ListOrdered className="w-4 h-4" />
                </ToolbarButton>
                <div className="w-px h-5 bg-stone-200 mx-1" />
                <ToolbarButton title="Undo" onClick={() => editor?.chain().focus().undo().run()}>
                  <Undo className="w-4 h-4" />
                </ToolbarButton>
                <ToolbarButton title="Redo" onClick={() => editor?.chain().focus().redo().run()}>
                  <Redo className="w-4 h-4" />
                </ToolbarButton>
              </div>
              <div className="p-4">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative w-11 h-6 rounded-full transition-colors ${published ? "bg-[#006837]" : "bg-stone-200"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${published ? "translate-x-5" : ""}`}
              />
            </button>
            <span className="text-sm text-stone-700 font-medium">
              {published ? "Published" : "Draft"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanConfigEditor() {
  const [config, setConfig] = useState<PlanConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/plan-config")
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!config) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const r = await fetch("/api/plan-config", {
        method: "PUT",
        headers: jsonHeaders,
        credentials: "same-origin",
        body: JSON.stringify(config),
      });
      if (!r.ok) {
        const data = await r.json();
        throw new Error(data.error || "Save failed");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function updateFreq(index: number, field: keyof FreqOption, value: any) {
    if (!config) return;
    const updated = [...config.frequencies];
    updated[index] = { ...updated[index], [field]: field === "price" ? Number(value) || 0 : value };
    setConfig({ ...config, frequencies: updated });
  }

  function addFreq() {
    if (!config) return;
    setConfig({ ...config, frequencies: [...config.frequencies, { label: "", price: 0, text: "" }] });
  }

  function removeFreq(index: number) {
    if (!config) return;
    setConfig({ ...config, frequencies: config.frequencies.filter((_, i) => i !== index) });
  }

  function updateScope(index: number, field: keyof ScopeOption, value: any) {
    if (!config) return;
    const updated = [...config.scopes];
    updated[index] = { ...updated[index], [field]: field === "addon" ? Number(value) || 0 : value };
    setConfig({ ...config, scopes: updated });
  }

  function addScope() {
    if (!config) return;
    setConfig({ ...config, scopes: [...config.scopes, { label: "", addon: 0, text: "" }] });
  }

  function removeScope(index: number) {
    if (!config) return;
    setConfig({ ...config, scopes: config.scopes.filter((_, i) => i !== index) });
  }

  function updateService(index: number, field: keyof ServiceItem, value: any) {
    if (!config) return;
    const updated = [...config.services];
    updated[index] = { ...updated[index], [field]: field === "minScope" ? Number(value) || 0 : value };
    setConfig({ ...config, services: updated });
  }

  function addService() {
    if (!config) return;
    setConfig({ ...config, services: [...config.services, { name: "", minScope: 0 }] });
  }

  function removeService(index: number) {
    if (!config) return;
    setConfig({ ...config, services: config.services.filter((_, i) => i !== index) });
  }

  function moveService(index: number, dir: -1 | 1) {
    if (!config) return;
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= config.services.length) return;
    const updated = [...config.services];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setConfig({ ...config, services: updated });
  }

  if (loading) return <div className="py-10 text-center text-stone-400">Loading plan config...</div>;
  if (!config) return <div className="py-10 text-center text-red-500">Failed to load config</div>;

  const scopeLabels = config.scopes.map((s) => s.label || `Tier ${config.scopes.indexOf(s)}`);

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <h3 className="font-bold text-[#111111] text-[15px] mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#006837]" />
          Frequency Options
        </h3>
        <div className="space-y-3">
          {config.frequencies.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  value={f.label}
                  onChange={(e) => updateFreq(i, "label", e.target.value)}
                  placeholder="Label"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
                <input
                  type="number"
                  value={f.price}
                  onChange={(e) => updateFreq(i, "price", e.target.value)}
                  placeholder="Price"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
                <input
                  value={f.text}
                  onChange={(e) => updateFreq(i, "text", e.target.value)}
                  placeholder="SMS text"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
              </div>
              <label className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={!!f.recommended}
                  onChange={(e) => updateFreq(i, "recommended", e.target.checked)}
                  className="accent-[#006837]"
                />
                Popular
              </label>
              <button
                onClick={() => removeFreq(i)}
                className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addFreq}
          className="mt-3 flex items-center gap-1.5 text-[#006837] text-sm font-medium hover:underline"
        >
          <Plus className="w-4 h-4" /> Add frequency
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <h3 className="font-bold text-[#111111] text-[15px] mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#006837]" />
          Service Levels
        </h3>
        <div className="space-y-3">
          {config.scopes.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  value={s.label}
                  onChange={(e) => updateScope(i, "label", e.target.value)}
                  placeholder="Label"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
                <input
                  type="number"
                  value={s.addon}
                  onChange={(e) => updateScope(i, "addon", e.target.value)}
                  placeholder="Add-on $"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
                <input
                  value={s.text}
                  onChange={(e) => updateScope(i, "text", e.target.value)}
                  placeholder="SMS text"
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                />
              </div>
              <button
                onClick={() => removeScope(i)}
                className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addScope}
          className="mt-3 flex items-center gap-1.5 text-[#006837] text-sm font-medium hover:underline"
        >
          <Plus className="w-4 h-4" /> Add service level
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <h3 className="font-bold text-[#111111] text-[15px] mb-1 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#006837]" />
          Services Included
        </h3>
        <p className="text-stone-400 text-xs mb-4">Min scope = minimum service level to include (0 = {scopeLabels[0] || "Basic"}, 1 = {scopeLabels[1] || "Full"}, 2 = {scopeLabels[2] || "Total"})</p>
        <div className="space-y-2">
          {config.services.map((svc, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 rounded-xl">
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  onClick={() => moveService(i, -1)}
                  disabled={i === 0}
                  className="p-0.5 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveService(i, 1)}
                  disabled={i === config.services.length - 1}
                  className="p-0.5 text-stone-400 hover:text-stone-600 disabled:opacity-30"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                value={svc.name}
                onChange={(e) => updateService(i, "name", e.target.value)}
                placeholder="Service name"
                className="flex-1 min-w-[160px] border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
              />
              <select
                value={svc.minScope}
                onChange={(e) => updateService(i, "minScope", e.target.value)}
                className="border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent bg-white"
              >
                {config.scopes.map((s, si) => (
                  <option key={si} value={si}>{s.label || `Tier ${si}`}</option>
                ))}
              </select>
              <button
                onClick={() => removeService(i)}
                className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addService}
          className="mt-3 flex items-center gap-1.5 text-[#006837] text-sm font-medium hover:underline"
        >
          <Plus className="w-4 h-4" /> Add service
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-[#006837] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#005030] transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Plan Config"}
        </button>
        {saved && <span className="text-green-600 text-sm font-medium">Saved!</span>}
      </div>
    </div>
  );
}

function TwoFactorSettings() {
  const [status, setStatus] = useState<{ enabled: boolean; pending: boolean; remainingRecoveryCodes: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [setup, setSetup] = useState<{ secret: string; otpauthUrl: string; qrDataUrl: string } | null>(null);
  const [enrollCode, setEnrollCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);
  const [disablePassword, setDisablePassword] = useState("");
  const [showDisable, setShowDisable] = useState(false);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/auth/2fa/status", { credentials: "same-origin" });
      if (r.ok) setStatus(await r.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function startSetup() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/2fa/setup", { method: "POST", credentials: "same-origin" });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Setup failed");
      setSetup(data);
      setRecoveryCodes(null);
      setEnrollCode("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function confirmSetup() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/2fa/enable", {
        method: "POST",
        headers: jsonHeaders,
        credentials: "same-origin",
        body: JSON.stringify({ code: enrollCode.trim() }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Could not enable two-factor auth");
      setRecoveryCodes(data.recoveryCodes);
      setSetup(null);
      setEnrollCode("");
      await refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: jsonHeaders,
        credentials: "same-origin",
        body: JSON.stringify({ password: disablePassword }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Could not disable two-factor auth");
      setShowDisable(false);
      setDisablePassword("");
      setRecoveryCodes(null);
      await refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function downloadCodes() {
    if (!recoveryCodes) return;
    const blob = new Blob(
      [
        "EDH Landscaping Admin — Two-Factor Recovery Codes\n",
        "Keep these codes somewhere safe. Each one can be used once if you lose access to your authenticator.\n\n",
        recoveryCodes.join("\n") + "\n",
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edh-admin-recovery-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyCodes() {
    if (!recoveryCodes) return;
    try {
      await navigator.clipboard.writeText(recoveryCodes.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  if (loading) {
    return <div className="py-10 text-center text-stone-400">Loading…</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-stone-100 p-6">
        <div className="flex items-start gap-3 mb-4">
          {status?.enabled ? (
            <ShieldCheck className="w-5 h-5 text-[#006837] mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5" />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-[#111111] text-[15px]">Two-Factor Authentication</h3>
            <p className="text-stone-500 text-sm mt-1">
              {status?.enabled
                ? "Two-factor authentication is on. You'll be asked for a 6-digit code at every sign in."
                : "Add an extra layer of protection. You'll need an authenticator app like Google Authenticator or 1Password."}
            </p>
            {status?.enabled && (
              <p className="text-stone-400 text-xs mt-2">
                {status.remainingRecoveryCodes} recovery code{status.remainingRecoveryCodes === 1 ? "" : "s"} remaining.
              </p>
            )}
          </div>
        </div>

        {!status?.enabled && !setup && !recoveryCodes && (
          <button
            onClick={startSetup}
            disabled={busy}
            className="flex items-center gap-2 bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors disabled:opacity-60"
          >
            <KeyRound className="w-4 h-4" />
            {busy ? "Starting…" : "Set up two-factor"}
          </button>
        )}

        {setup && (
          <div className="space-y-4 mt-2">
            <div className="text-sm text-stone-700">
              Scan this QR code with your authenticator app, then enter the 6-digit code it shows to confirm.
            </div>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <img src={setup.qrDataUrl} alt="TOTP QR code" className="w-44 h-44 border border-stone-200 rounded-xl bg-white p-2" />
              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Manual entry key</p>
                  <p className="font-mono text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 break-all">{setup.secret}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    value={enrollCode}
                    onChange={(e) => setEnrollCode(e.target.value)}
                    className="w-full sm:w-48 border border-stone-200 rounded-lg px-3 py-2 text-base font-mono tracking-wider outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={confirmSetup}
                    disabled={busy || !/^\d{6}$/.test(enrollCode.trim())}
                    className="bg-[#006837] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#005030] transition-colors disabled:opacity-60"
                  >
                    {busy ? "Verifying…" : "Verify & enable"}
                  </button>
                  <button
                    onClick={() => { setSetup(null); setEnrollCode(""); setError(""); }}
                    className="text-stone-500 text-sm px-3 py-2 hover:text-stone-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {recoveryCodes && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm font-semibold text-amber-900 mb-1">Save your recovery codes</p>
            <p className="text-xs text-amber-800 mb-3">
              Store these somewhere safe. Each code can be used once to sign in if you lose your authenticator. They will not be shown again.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {recoveryCodes.map((c) => (
                <code key={c} className="font-mono text-sm bg-white border border-amber-200 rounded px-2 py-1 text-center">{c}</code>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadCodes}
                className="flex items-center gap-1.5 bg-[#006837] text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-[#005030] transition-colors"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button
                onClick={copyCodes}
                className="flex items-center gap-1.5 border border-stone-200 text-stone-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => setRecoveryCodes(null)}
                className="text-stone-500 text-sm px-3 py-2 hover:text-stone-700 ml-auto"
              >
                I've saved them
              </button>
            </div>
          </div>
        )}

        {status?.enabled && !showDisable && (
          <button
            onClick={() => setShowDisable(true)}
            className="mt-4 text-red-600 text-sm font-medium hover:underline"
          >
            Disable two-factor authentication
          </button>
        )}

        {status?.enabled && showDisable && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl space-y-3">
            <p className="text-sm text-red-800">
              Re-enter your admin password to confirm disabling two-factor authentication.
            </p>
            <input
              type="password"
              placeholder="Admin password"
              value={disablePassword}
              onChange={(e) => setDisablePassword(e.target.value)}
              className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={disable}
                disabled={busy || !disablePassword}
                className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {busy ? "Disabling…" : "Disable"}
              </button>
              <button
                onClick={() => { setShowDisable(false); setDisablePassword(""); setError(""); }}
                className="text-stone-500 text-sm px-3 py-2 hover:text-stone-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type AdminTab = "posts" | "plan" | "security";

export default function Admin() {
  const [authState, setAuthState] = useState<"loading" | "in" | "out">("loading");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Post | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [tab, setTab] = useState<AdminTab>("posts");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/posts/all", { credentials: "same-origin" });
      if (r.status === 401) { setAuthState("out"); return; }
      const data = await r.json();
      setPosts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearLegacyToken();
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/auth/me", { credentials: "same-origin" });
        if (cancelled) return;
        setAuthState(r.ok ? "in" : "out");
      } catch {
        if (!cancelled) setAuthState("out");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (authState === "in") fetchPosts();
  }, [authState, fetchPosts]);

  async function togglePublish(post: Post) {
    await fetch(`/api/posts/${post.slug}`, {
      method: "PUT",
      headers: jsonHeaders,
      credentials: "same-origin",
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  }

  async function deletePost(slug: string) {
    setDeleting(slug);
    try {
      await fetch(`/api/posts/${slug}`, { method: "DELETE", credentials: "same-origin" });
      fetchPosts();
    } finally {
      setDeleting(null);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } catch {
      // ignore — clear UI state anyway
    }
    setAuthState("out");
    setPosts([]);
  }

  if (authState === "loading") {
    return <div className="min-h-screen bg-[#f5f3ee]" />;
  }

  if (authState === "out") {
    return <LoginScreen onLogin={() => setAuthState("in")} />;
  }

  if (editing !== undefined) {
    return (
      <PostEditor
        initial={editing ?? null}
        onSave={() => { setEditing(undefined); fetchPosts(); }}
        onCancel={() => setEditing(undefined)}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin | EDH Landscaping Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-[#f5f3ee]">
        <header className="bg-white border-b border-stone-100 px-5 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#006837] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">E</span>
              </div>
              <div>
                <p className="font-semibold text-[#111111] text-sm leading-none">EDH Landscaping</p>
                <p className="text-stone-400 text-[11px] leading-none mt-0.5">Blog Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 py-10">

          <div className="flex items-center gap-1 mb-6 sm:mb-8 bg-stone-100 rounded-xl p-1 w-full sm:w-fit overflow-x-auto">
            {([["posts", "Blog Posts"], ["plan", "Plan Builder"], ["security", "Security"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 sm:flex-none min-h-[40px] px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  tab === key
                    ? "bg-white text-[#111111] shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "posts" && (
            <>
              <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 flex-wrap">
                <h1 className="font-sans text-xl sm:text-2xl font-bold text-[#111111]">Posts</h1>
                <button
                  onClick={() => setEditing(null)}
                  className="flex items-center gap-2 min-h-[44px] bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors"
                >
                  <Plus className="w-4 h-4" /> New post
                </button>
              </div>

              {loading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />
                  ))}
                </div>
              )}

              {!loading && posts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
                  <p className="text-stone-400 text-[15px] mb-4">No posts yet</p>
                  <button
                    onClick={() => setEditing(null)}
                    className="inline-flex items-center gap-2 bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Write your first post
                  </button>
                </div>
              )}

              {!loading && posts.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden divide-y divide-stone-50">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-stone-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              post.published ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {post.published ? "Live" : "Draft"}
                          </span>
                        </div>
                        <p className="font-medium text-[#111111] text-[15px] truncate">{post.title}</p>
                        <p className="text-stone-400 text-[12px] mt-0.5">{formatDate(post.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => togglePublish(post)}
                          title={post.published ? "Unpublish" : "Publish"}
                          className="p-2 text-stone-400 hover:text-[#006837] transition-colors rounded-lg hover:bg-stone-100"
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setEditing(post)}
                          title="Edit"
                          className="p-2 text-stone-400 hover:text-[#006837] transition-colors rounded-lg hover:bg-stone-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                              deletePost(post.slug);
                            }
                          }}
                          disabled={deleting === post.slug}
                          title="Delete"
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "plan" && (
            <>
              <div className="mb-8">
                <h1 className="font-sans text-2xl font-bold text-[#111111]">Plan Builder Config</h1>
                <p className="text-stone-500 text-sm mt-1">Edit pricing, service levels, and what's included in each plan.</p>
              </div>
              <PlanConfigEditor />
            </>
          )}

          {tab === "security" && (
            <>
              <div className="mb-8">
                <h1 className="font-sans text-2xl font-bold text-[#111111]">Security</h1>
                <p className="text-stone-500 text-sm mt-1">Manage admin sign-in protections.</p>
              </div>
              <TwoFactorSettings />
            </>
          )}
        </main>
      </div>
    </>
  );
}
