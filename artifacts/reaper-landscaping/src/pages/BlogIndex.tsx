import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { SiteHeader } from "../components/SiteHeader";
import { Calendar, ArrowRight } from "lucide-react";

interface PostCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
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

export default function BlogIndex() {
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | EDH Landscaping — El Dorado Hills Lawn Tips & Updates</title>
        <meta
          name="description"
          content="Lawn care tips, seasonal advice, and updates from EDH Landscaping serving El Dorado Hills, Folsom, Granite Bay, and greater Sacramento."
        />
      </Helmet>
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
        <header className="mb-14">
          <p className="text-[#1a5c30] text-[13px] font-semibold uppercase tracking-widest mb-3">
            EDH Landscaping
          </p>
          <h1 className="font-serif text-[40px] sm:text-[52px] font-bold text-[#111810] leading-tight">
            Lawn Care Blog
          </h1>
          <p className="mt-4 text-[#6b7280] text-[17px] leading-relaxed">
            Seasonal tips, yard advice, and local landscaping updates for El Dorado Hills homeowners.
          </p>
        </header>

        {loading && (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-stone-100 rounded w-1/4 mb-3" />
                <div className="h-7 bg-stone-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-stone-100 rounded w-full mb-1" />
                <div className="h-4 bg-stone-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[#6b7280] text-[17px]">No posts yet — check back soon.</p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="divide-y divide-stone-100">
            {posts.map((post) => (
              <article key={post.id} className="py-10 group">
                {post.coverImageUrl && (
                  <Link href={`/blog/${post.slug}`}>
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-52 object-cover rounded-xl mb-6 group-hover:opacity-95 transition-opacity"
                    />
                  </Link>
                )}
                <div className="flex items-center gap-2 text-[13px] text-[#6b7280] mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <time>{formatDate(post.publishedAt)}</time>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-serif text-[26px] font-bold text-[#111810] leading-snug mb-3 group-hover:text-[#1a5c30] transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-[#6b7280] text-[16px] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[#1a5c30] text-[14px] font-semibold hover:gap-2.5 transition-all"
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-100 py-10 text-center">
        <p className="text-stone-400 text-[13px]">
          &copy; {new Date().getFullYear()} EDH Landscaping ·{" "}
          <a href="tel:9168472095" className="hover:text-[#1a5c30]">
            (916) 847-2095
          </a>
        </p>
      </footer>
    </>
  );
}
