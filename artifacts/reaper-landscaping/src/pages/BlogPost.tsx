import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "../components/SiteHeader";
import { Calendar, ArrowLeft, Twitter, Facebook, Link2, Check } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetch(`/api/posts/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-20 animate-pulse space-y-4">
          <div className="h-4 bg-stone-100 rounded w-1/4" />
          <div className="h-10 bg-stone-100 rounded w-3/4" />
          <div className="h-4 bg-stone-100 rounded w-full" />
          <div className="h-4 bg-stone-100 rounded w-5/6" />
        </main>
      </>
    );
  }

  if (notFound || !post) {
    return (
      <>
        <SiteHeader />
        <main className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h1 className="font-sans text-3xl font-bold text-[#111111] mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#006837] hover:underline">
            ← Back to blog
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | EDH Landscaping Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImageUrl && <meta property="og:image" content={post.coverImageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.coverImageUrl && <meta name="twitter:image" content={post.coverImageUrl} />}
      </Helmet>
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[#6b7280] text-[14px] hover:text-[#006837] mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All posts
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-[13px] text-[#6b7280] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <time>{formatDate(post.publishedAt)}</time>
          </div>
          <h1 className="font-sans text-[36px] sm:text-[46px] font-bold text-[#111111] leading-tight mb-5">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-[18px] text-[#6b7280] leading-relaxed border-l-4 border-[#fbb03b] pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full rounded-xl mb-10 object-cover max-h-96"
          />
        )}

        <div
          className="prose prose-lg prose-stone max-w-none prose-headings:font-sans prose-headings:text-[#111111] prose-a:text-[#006837] prose-strong:text-[#111111]"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <div className="mt-14 pt-8 border-t border-stone-100">
          <p className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-4">
            Share this post
          </p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 text-[13px] font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <Twitter className="w-4 h-4" /> X / Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 text-[13px] font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-200 text-[13px] font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              {copied ? (
                <><Check className="w-4 h-4 text-[#006837]" /> Copied!</>
              ) : (
                <><Link2 className="w-4 h-4" /> Copy link</>
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 bg-[#f5f3ee] rounded-2xl p-6">
          <p className="font-semibold text-[#111111] mb-1">Need your yard handled?</p>
          <p className="text-[#6b7280] text-[14px] mb-4">
            Service starting at $45/mo. No contracts, no portals.
          </p>
          <a
            href="tel:9168472095"
            className="inline-flex items-center gap-2 bg-[#006837] text-white font-semibold px-5 py-3 rounded-xl text-[14px] hover:bg-[#005030] transition-colors"
          >
            Call (916) 847-2095
          </a>
        </div>
      </main>
    </>
  );
}
