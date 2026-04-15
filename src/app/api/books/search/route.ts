import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({ docs: [] });
  }

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,cover_i,subject,number_of_pages_median`
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch from Open Library" }, { status: 500 });
  }

  const data = await res.json();

  // Transform into our format
  const books = (data.docs || []).map((doc: Record<string, unknown>) => ({
    key: doc.key as string,
    title: doc.title as string,
    author: Array.isArray(doc.author_name) ? (doc.author_name as string[])[0] : "Unknown",
    year: doc.first_publish_year as number | undefined,
    coverId: doc.cover_i as number | undefined,
    subjects: Array.isArray(doc.subject) ? (doc.subject as string[]).slice(0, 5) : [],
    pages: doc.number_of_pages_median as number | undefined,
  }));

  return NextResponse.json({ books });
}
