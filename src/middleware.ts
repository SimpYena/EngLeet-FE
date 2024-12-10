import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseCookies } from "nookies";

export async function middleware(request: NextRequest) {
  const cookies = parseCookies();

  let pathname = request.nextUrl.pathname;
  const specific = process.env.NEXT_PUBLIC_SPECIFIC ?? "/";

  if (pathname.split("/").includes("application")) {
    pathname = specific;
  }

  // login/register middleware
  if (
    pathname.split("/").includes("login") ||
    pathname.split("/").includes("register")
  ) {
    if (cookies['el-access-token'] !== undefined) {
      pathname = specific;
    }
  }

  // Allow the request to proceed as is if no changes are needed
  return NextResponse.next();
}

// Apply the middleware to specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
