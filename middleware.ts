import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/clients",
        "/clients/:id",
        "/clients/ajouterClient",
        "/itineraires",
        "/itineraires/details",
        "/itineraires/route",
        "/login",
        "/testArticles",
        "/users",
        "/users/:id",
        "/users/ajouterUser",
    ]
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
