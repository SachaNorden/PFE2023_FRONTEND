import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/login", "/testArticles", "/itineraires", "/users/:id"]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
