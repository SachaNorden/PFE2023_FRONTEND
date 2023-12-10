import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/clients",
        "/clients/:id",
        "/clients/ajouterClient",
        "/itineraires",
        "/itineraires/route",
        "/login",
        "/testArticles",
        "/users/:id",
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
