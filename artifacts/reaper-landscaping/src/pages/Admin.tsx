import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Helmet } from "react-helmet-async";
import {
  LogOut, Plus, Edit2, Trash2, Eye, EyeOff,
  Bold, Italic, List, ListOrdered, Heading2, Undo, Redo, Save, X
} from "lucide-react";

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

const TOKEN_KEY = "edh_admin_token";

function useToken() {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const setToken = (t: string | null) => {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
    setTokenState(t);
  };
  return [token, setToken] as const;
}

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Login failed");
      onLogin(data.token);
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
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#006837] focus:border-transparent"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#006837] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[#005030] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
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
  token,
  initial,
  onSave,
  onCancel,
}: {
  token: string;
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
        class: "min-h-[300px] outline-none prose prose-stone max-w-none",
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
        headers: authHeaders(token),
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
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans text-xl font-bold text-[#111111]">
            {initial ? "Edit Post" : "New Post"}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-1.5 bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors disabled:opacity-60"
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

export default function Admin() {
  const [token, setToken] = useToken();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Post | null | undefined>(undefined);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const r = await fetch("/api/posts/all", { headers: { Authorization: `Bearer ${t}` } });
      if (r.status === 401) { setToken(null); return; }
      const data = await r.json();
      setPosts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchPosts(token);
  }, [token]);

  async function togglePublish(post: Post) {
    if (!token) return;
    await fetch(`/api/posts/${post.slug}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts(token);
  }

  async function deletePost(slug: string) {
    if (!token) return;
    setDeleting(slug);
    try {
      await fetch(`/api/posts/${slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      fetchPosts(token);
    } finally {
      setDeleting(null);
    }
  }

  if (!token) {
    return <LoginScreen onLogin={(t) => setToken(t)} />;
  }

  if (editing !== undefined) {
    return (
      <PostEditor
        token={token}
        initial={editing ?? null}
        onSave={() => { setEditing(undefined); fetchPosts(token); }}
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
              onClick={() => setToken(null)}
              className="flex items-center gap-1.5 text-stone-500 text-sm hover:text-stone-700 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 py-10">

          <div className="flex items-center justify-between mb-8">
            <h1 className="font-sans text-2xl font-bold text-[#111111]">Posts</h1>
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 bg-[#006837] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#005030] transition-colors"
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
        </main>
      </div>
    </>
  );
}
