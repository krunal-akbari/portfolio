import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

function unquote(value?: string) {
  if (!value) {
    return "";
  }

  return value.trim().replace(/^['"]|['"]$/g, "");
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveRedirectUri() {
  const redirectFromEnv = unquote(process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);
  if (redirectFromEnv && isValidUrl(redirectFromEnv)) {
    return redirectFromEnv;
  }

  const appBaseUrl = unquote(process.env.APP_BASE_URL);
  if (appBaseUrl && isValidUrl(appBaseUrl)) {
    return new URL("/callback", appBaseUrl).toString();
  }

  return "";
}

function hasRequiredAuthConfig() {
  const cookiePassword = unquote(process.env.WORKOS_COOKIE_PASSWORD);

  return Boolean(
    unquote(process.env.WORKOS_CLIENT_ID) &&
      unquote(process.env.WORKOS_API_KEY) &&
      cookiePassword.length >= 32 &&
      resolveRedirectUri(),
  );
}

const redirectUri = resolveRedirectUri();
const middlewareImpl = hasRequiredAuthConfig()
  ? authkitMiddleware({ redirectUri })
  : null;

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!middlewareImpl) {
    return NextResponse.next();
  }

  return middlewareImpl(request, event);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
