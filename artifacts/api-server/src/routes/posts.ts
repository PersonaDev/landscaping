import { Router } from "express";
import { db, postsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../lib/auth.js";

const router = Router();

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
      .where(eq(postsTable.published, true))
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
      .where(eq(postsTable.slug, req.params.slug))
      .limit(1);
    if (!post || !post.published) {
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
    const { title, slug, excerpt, body, coverImageUrl, published } = req.body as {
      title: string;
      slug: string;
      excerpt: string;
      body: string;
      coverImageUrl?: string;
      published: boolean;
    };

    if (!title || !slug) {
      res.status(400).json({ error: "Title and slug are required" });
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
        publishedAt: published ? new Date() : null,
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
    const { title, slug: newSlug, excerpt, body, coverImageUrl, published } = req.body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      body?: string;
      coverImageUrl?: string | null;
      published?: boolean;
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

    const [updated] = await db
      .update(postsTable)
      .set({
        title: title ?? existing.title,
        slug: newSlug ?? existing.slug,
        excerpt: excerpt ?? existing.excerpt,
        body: body ?? existing.body,
        coverImageUrl: coverImageUrl !== undefined ? coverImageUrl : existing.coverImageUrl,
        published: nowPublished,
        publishedAt: !wasPublished && nowPublished ? new Date() : existing.publishedAt,
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
