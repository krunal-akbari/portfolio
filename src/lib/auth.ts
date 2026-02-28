import type { User } from "@workos-inc/node";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

function unquote(value?: string) {
  if (!value) {
    return "";
  }

  return value.trim().replace(/^['"]|['"]$/g, "");
}

function hasValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveRedirectUri() {
  const redirectFromEnv = unquote(process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);
  if (redirectFromEnv && hasValidHttpUrl(redirectFromEnv)) {
    return redirectFromEnv;
  }

  const appBaseUrl = unquote(process.env.APP_BASE_URL);
  if (appBaseUrl && hasValidHttpUrl(appBaseUrl)) {
    return new URL("/callback", appBaseUrl).toString();
  }

  return "";
}

export function hasRequiredAuthConfig() {
  const clientId = unquote(process.env.WORKOS_CLIENT_ID);
  const apiKey = unquote(process.env.WORKOS_API_KEY);
  const cookiePassword = unquote(process.env.WORKOS_COOKIE_PASSWORD);

  if (!clientId || !apiKey) {
    return false;
  }

  if (cookiePassword.length < 32) {
    return false;
  }

  if (!resolveRedirectUri()) {
    return false;
  }

  return true;
}

export function getCalendarFeedToken() {
  const explicitToken = process.env.CALENDAR_FEED_TOKEN?.trim();
  if (explicitToken) {
    return explicitToken;
  }

  const seed = `${process.env.WORKOS_COOKIE_PASSWORD ?? ""}:${process.env.ALLOWED_EMAIL ?? ""}`;
  if (seed === ":") {
    return null;
  }

  return createHash("sha256").update(seed).digest("hex");
}

export async function requireAllowedUser() {
  if (!hasRequiredAuthConfig()) {
    return { user: null as User | null };
  }

  const { user } = await withAuth();

  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  const allowedEmail = normalizeEmail(process.env.ALLOWED_EMAIL);
  if (!allowedEmail) {
    return {
      error: NextResponse.json(
        { error: "Server misconfiguration: ALLOWED_EMAIL is missing" },
        { status: 500 },
      ),
    } as const;
  }

  const currentEmail = normalizeEmail(user.email);
  if (currentEmail !== allowedEmail) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    } as const;
  }

  return { user } as { user: User };
}

export function isValidCalendarFeedToken(token: string | null) {
  const expected = getCalendarFeedToken();
  if (!expected || !token) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(token);

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}
