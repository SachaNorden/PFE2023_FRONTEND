import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/testArticles",
        "/login",
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
        "/itineraires/:id",
        "/itineraires/route",
        "/itineraires/creation",
        "/livraisons/:id/articles",
        "/itineraires/route/:id",
        "/itineraires/route/:id/livraison",
        "/itineraires/route/:id/livraison/:idLivraison",
        "/itineraires/route/:id/livraison/:idLivraison/article"

    ]

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
