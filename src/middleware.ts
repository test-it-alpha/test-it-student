// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NO_SIDEBAR_ROUTES = ["/contest", "/auth"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If the path starts with any of the no-sidebar routes, hide the sidebar
  NO_SIDEBAR_ROUTES.forEach((route) => {
    if (pathname.startsWith(route)) {
      const response = NextResponse.next();
      response.headers.set("x-hide-sidebar", "true");
      return response;
    }
  });

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Apply to all routes
};
