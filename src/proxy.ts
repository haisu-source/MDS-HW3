import { clerkMiddleware } from "@clerk/nextjs/server";

// Let Clerk handle session management without forcing redirects.
// Auth protection is handled in API routes (server-side) and
// page components (client-side via useAuth).
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
