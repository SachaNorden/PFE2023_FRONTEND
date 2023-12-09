import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/login", "/testArticles", "/itineraires", "/itineraires/route", "/users/:id"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
