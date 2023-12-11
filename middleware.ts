import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/clients",
        "/clients/:id",
        "/clients/ajouterClient",
        "/itineraires",
        "/itineraires/:id",
        "/itineraires/route",
        "/login",
        "/testArticles",
        "/users",
        "/users/:id",
        "/users/ajouterUser",
        "/livraisons/[id]",
    ]

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
