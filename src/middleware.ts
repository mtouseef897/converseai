import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ['/', '/api/create-chat','/api/get-feedback','/shared-chat/:sharedLink', '/feedbacks','/api/testme','/api/chat','/api/stripe','/api/get-messages','/about','/contact','/faqs','/blogs','/pricing'], // Add '/api/create-chat' to public routes if you don't want auth here
   // Optional: If you want to prevent Clerk from authenticating certain routes altogether, you can add this:
});


export const config = {
  matcher: [
    /*
     * Protect all routes unless explicitly public
     * Ensure that `_next/static` and similar Next.js internal routes are skipped
     */
    '/((?!_next|.*\\.(?:html|css|js|json|jpg|jpeg|png|gif|svg|ico|woff2)).*)',
    '/(api|trpc)(.*)', // Always run for API routes
  ],
};


