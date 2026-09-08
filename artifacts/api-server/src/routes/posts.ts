import { Router } from "express";
import { db, postsTable } from "@workspace/db";
import { and, desc, eq, isNull, lte, or } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

function parsePublishDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

router.get("/posts", async (_req, res) => {
  try {
    const posts = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        excerpt: postsTable.excerpt,
        coverImageUrl: postsTable.coverImageUrl,
        publishedAt: postsTable.publishedAt,
        createdAt: postsTable.createdAt,
      })
      .from(postsTable)
      .where(
        and(
          eq(postsTable.published, true),
          or(isNull(postsTable.publishedAt), lte(postsTable.publishedAt, new Date())),
        ),
      )
      .orderBy(desc(postsTable.publishedAt));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/posts/all", requireAuth, async (_req, res) => {
  try {
    const posts = await db
      .select()
      .from(postsTable)
      .orderBy(desc(postsTable.createdAt));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/posts/:slug", async (req, res) => {
  try {
    const [post] = await db
      .select()
      .from(postsTable)
      .where(
        and(
          eq(postsTable.slug, req.params.slug),
          eq(postsTable.published, true),
          or(isNull(postsTable.publishedAt), lte(postsTable.publishedAt, new Date())),
        ),
      )
      .limit(1);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

router.post("/posts", requireAuth, async (req, res) => {
  try {
    const { title, slug, excerpt, body, coverImageUrl, published, publishedAt } = req.body as {
      title: string;
      slug: string;
      excerpt: string;
      body: string;
      coverImageUrl?: string;
      published: boolean;
      publishedAt?: string | null;
    };

    if (!title || !slug) {
      res.status(400).json({ error: "Title and slug are required" });
      return;
    }

    const requestedPublishDate = parsePublishDate(publishedAt);
    if (published && publishedAt && !requestedPublishDate) {
      res.status(400).json({ error: "Publish date must be valid" });
      return;
    }

    const [post] = await db
      .insert(postsTable)
      .values({
        title,
        slug,
        excerpt: excerpt ?? "",
        body: body ?? "",
        coverImageUrl: coverImageUrl ?? null,
        published: published ?? false,
        publishedAt: published
          ? (requestedPublishDate ?? new Date())
          : null,
      })
      .returning();

    res.status(201).json(post);
  } catch (err: any) {
    if (err?.code === "23505") {
      res.status(409).json({ error: "A post with that slug already exists" });
      return;
    }
    res.status(500).json({ error: "Failed to create post" });
  }
});

router.put("/posts/:slug", requireAuth, async (req, res) => {
  try {
    const { title, slug: newSlug, excerpt, body, coverImageUrl, published, publishedAt } = req.body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      body?: string;
      coverImageUrl?: string | null;
      published?: boolean;
      publishedAt?: string | null;
    };

    const [existing] = await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.slug, req.params.slug))
      .limit(1);

    if (!existing) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    const wasPublished = existing.published;
    const nowPublished = published ?? existing.published;
    const requestedPublishDate = parsePublishDate(publishedAt);
    if (publishedAt && !requestedPublishDate) {
      res.status(400).json({ error: "Publish date must be valid" });
      return;
    }

    const [updated] = await db
      .update(postsTable)
      .set({
        title: title ?? existing.title,
        slug: newSlug ?? existing.slug,
        excerpt: excerpt ?? existing.excerpt,
        body: body ?? existing.body,
        coverImageUrl: coverImageUrl !== undefined ? coverImageUrl : existing.coverImageUrl,
        published: nowPublished,
        publishedAt: !nowPublished
          ? null
          : requestedPublishDate
            ? requestedPublishDate
            : (!wasPublished ? new Date() : existing.publishedAt),
        updatedAt: new Date(),
      })
      .where(eq(postsTable.slug, req.params.slug))
      .returning();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

router.delete("/posts/:slug", requireAuth, async (req, res) => {
  try {
    const [deleted] = await db
      .delete(postsTable)
      .where(eq(postsTable.slug, req.params.slug))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
