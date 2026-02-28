import { handleAuth } from "@workos-inc/authkit-nextjs";

export const GET = handleAuth({
  returnPathname: "/",
  baseURL: process.env.APP_BASE_URL,
});
