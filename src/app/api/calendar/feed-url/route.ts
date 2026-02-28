import { NextRequest, NextResponse } from "next/server";

import { getCalendarFeedToken, requireAllowedUser } from "@/lib/auth";

function toWebcal(url: string) {
  return url.replace(/^https?:\/\//, "webcal://");
}

export async function GET(request: NextRequest) {
  const auth = await requireAllowedUser();
  if ("error" in auth) {
    return auth.error;
  }

  const token = getCalendarFeedToken();
  const baseURL = process.env.APP_BASE_URL?.trim() || request.nextUrl.origin;

  if (!token) {
    return NextResponse.json(
      { error: "Calendar feed token is unavailable" },
      { status: 500 },
    );
  }

  let feedUrl: string;

  try {
    const route = `/api/calendar/ics?token=${encodeURIComponent(token)}`;
    feedUrl = new URL(route, baseURL).toString();
  } catch {
    return NextResponse.json(
      { error: "APP_BASE_URL is invalid" },
      { status: 500 },
    );
  }

  const googleUrl = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(feedUrl)}`;
  const appleUrl = toWebcal(feedUrl);

  return NextResponse.json({
    feedUrl,
    googleUrl,
    appleUrl,
    tokenConfigured: Boolean(process.env.CALENDAR_FEED_TOKEN?.trim()),
  });
}
