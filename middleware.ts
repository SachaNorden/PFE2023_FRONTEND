import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/testArticles",
        "/articles",
        "/articles/:id",
        "/articles/ajouterArticle",
        "/clients",
        "/clients/:id",
        "/clients/ajouterClient",
        "/users",
        "/users/:id",
        "/users/ajouterUser",
        "/itineraires",
        "/itineraires/details",
        "/itineraires/route",
        "/login",
    ]

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
