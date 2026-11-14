// src/lib/api.ts
// Typed fetch functions for the Dream by Moaz backend APIs.
// Mirrors the integration from the old portfolio (moaztobok/my-website).

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT ?? "https://www.dreambymoaz.com";

// ------------------------------------------------------------------
// Types (match the Mongoose models / API responses)
// ------------------------------------------------------------------

export type GalleryType = "artwork" | "photograph";

export type GalleryImage = {
  _id: string;
  imageUrl: string;
  imageType: GalleryType;
  title: string;
  description?: string;
  userId: string;
  uploadDate: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type BlogCategory =
  | "Graphic Design"
  | "Photography"
  | "Web Development";

export type BlogPost = {
  _id: string;
  title: string;
  description: string;
  content?: string; // omitted by the list endpoint (`.select('-content')`)
  author: string;
  imageUrls: string[];
  tags: string[];
  category: BlogCategory;
  uploadDate?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type ContactPayload = {
  name: string;
  email: string;
  body: string;
};

export type ImageDimensions = { width: number; height: number };

// ------------------------------------------------------------------
// Internal helper
// ------------------------------------------------------------------

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// ------------------------------------------------------------------
// Blog
// ------------------------------------------------------------------

export type BlogParams = { limit?: number };

/** GET /api/blog — list of blog posts (newest first). */
export async function fetchBlogs(params?: BlogParams): Promise<BlogPost[]> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  return getJson<BlogPost[]>(`${API_ENDPOINT}/api/blog?${qs.toString()}`);
}

/** GET /api/blog/[id] — single blog post (includes `content`). */
export async function fetchBlog(id: string): Promise<BlogPost> {
  return getJson<BlogPost>(`${API_ENDPOINT}/api/blog/${id}`);
}

// ------------------------------------------------------------------
// Gallery
// ------------------------------------------------------------------

export type GalleryParams = {
  type: GalleryType;
  limit?: number;
  page?: number;
  sort?: string; // e.g. "createdAt:asc"
};

/** GET /api/gallery — gallery images filtered by type. */
export async function fetchGallery(
  params: GalleryParams,
): Promise<GalleryImage[]> {
  const qs = new URLSearchParams({ imageType: params.type });
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.page) qs.set("page", String(params.page));
  if (params.sort) qs.set("sort", params.sort);
  return getJson<GalleryImage[]>(
    `${API_ENDPOINT}/api/gallery?${qs.toString()}`,
  );
}

// ------------------------------------------------------------------
// Contact form (Resend email)
// ------------------------------------------------------------------

/** POST /api/send — sends the contact-form email via Resend. */
export async function sendContactEmail(
  payload: ContactPayload,
): Promise<unknown> {
  return getJson(`${API_ENDPOINT}/api/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ------------------------------------------------------------------
// Image dimensions (sharp)
// ------------------------------------------------------------------

/** GET /api/image-dimensions?url=... — width/height of a remote image. */
export async function fetchImageDimensions(
  url: string,
): Promise<ImageDimensions> {
  const qs = new URLSearchParams({ url });
  return getJson<ImageDimensions>(
    `${API_ENDPOINT}/api/image-dimensions?${qs.toString()}`,
  );
}
