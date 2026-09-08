import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { Calendar, ArrowLeft, ArrowRight, Twitter, Facebook, Link2, Check } from "lucide-react";

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

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
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
      <SEO
        title={`${post.title} | EDH Landscaping Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        pageType="article"
        image={post.coverImageUrl ?? undefined}
        article={{ publishedAt: post.publishedAt }}
      />
      <SiteHeader />

      <main className="blog-post-page">
        <header className="blog-post-masthead">
          <div className="blog-post-masthead-inner">
            <Link href="/blog" className="blog-back-link">
              <ArrowLeft className="w-4 h-4" /> Blog
            </Link>
            <div className="blog-post-meta">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.body)} min read</span>
              <span aria-hidden="true">·</span>
              <span>EDH Landscaping</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="blog-post-deck">{post.excerpt}</p>}
          </div>
        </header>

        <div className="blog-post-wrap">
          {post.coverImageUrl && (
            <figure className="blog-cover-frame">
              <img src={post.coverImageUrl} alt={post.title} className="blog-cover-image" />
            </figure>
          )}

          <div className="blog-reading-layout">
            <article>
              <div
                className="blog-article-body"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />

              <div className="blog-share-row">
                <p>Share this article</p>
                <div>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-4 h-4" /> X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </a>
                  <button onClick={copyLink}>
                    {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Link2 className="w-4 h-4" /> Copy link</>}
                  </button>
                </div>
              </div>
            </article>

            <aside className="blog-quote-card" aria-label="Get a landscaping quote">
              <p className="blog-quote-card-title">Want help with the yard?</p>
              <p>Build a starting residential estimate, or send us a commercial property for a walkthrough.</p>
              <a className="blog-quote-primary" href="/">
                Residential estimate <ArrowRight className="w-4 h-4" />
              </a>
              <a className="blog-quote-secondary" href="/commercial-hoa">
                Commercial &amp; HOA
              </a>
              <a className="blog-quote-phone" href="tel:9168472095">
                Call (916) 847-2095
              </a>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
