import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/testArticles",
        "/login",
        "/articles",
        "/articles/:id",
        "/articles/ajouterArticle",
        "/commandes",
        "/commandes/:id",
        "/commandes/ajouterCommande/:id",
        "/clients",
        "/clients/:id",
        "/clients/ajouterClient",
        "/users",
        "/users/:id",
        "/users/ajouterUser",
        "/itineraires",
        "/itineraires/:id",
        "/itineraires/route",
        "/itineraires/creation",
    ]

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
