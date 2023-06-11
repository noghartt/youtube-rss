import { JSDOM } from 'jsdom';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  const query = await fetch(url);
  const window = new JSDOM(await query.text()).window;
  const rssTag = window.document.querySelector('link[type="application/rss+xml"]');

  if (!rssTag) {
    return NextResponse.json({ error: 'No RSS feed found' }, { status: 404 });
  }

  return NextResponse.json({ rss: rssTag.getAttribute('href') });
};
