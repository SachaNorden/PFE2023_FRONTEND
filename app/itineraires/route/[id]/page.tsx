'use client'
import FormComponent from "@/app/ui/Form.component";
import back from "@/public/arrow-left.svg";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {fetchArticles, fetchLivraisonParClient, getArticlesByLivraisonsId, getItineraireById} from "@/lib/api";
import MenuDer from "@/app/ui/menu/menu";
import LogOutButton from "@/app/ui/logOutButton";
import {Itineraire, ArticleTotal} from "@/types/index"



export default function Route() {
    const [itineraire, setItineraire] = useState<Itineraire>();
    const [articles, setArticles] = useState<{ [key: string]: ArticleTotal }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const itineraireId = window.location.href.split('/').pop();
        const fetchArticlesData = async () => {
            try {
                const allArticles = await fetchArticles();
                // @ts-ignore
                const articlesById = allArticles.reduce((obj, article) => {
                    obj[article.id] = article.nom;
                    return obj;
                }, {});
                // @ts-ignore
                const itineraireData = await getItineraireById(itineraireId);
                setItineraire(itineraireData);
                const newTotals = {};
                for (const client of itineraireData.clients) {
                    const livraisonArticlesId = await fetchLivraisonParClient(client.id);
                    const livraisonArticle = await getArticlesByLivraisonsId(livraisonArticlesId);

                    // @ts-ignore
                    if (!livraisonArticle || !Array.isArray(livraisonArticle)) {
                        // Gérer le cas où livraisonArticle n'est pas itérable
                        console.error("Les données de livraisonArticle ne sont pas valides:", livraisonArticle);
                        continue; // Passe à l'itération suivante
                    }

                    // @ts-ignore
                    for await (const {article: articleId, quantite} of livraisonArticle) {
                        // @ts-ignore
                        if (!newTotals[articleId]) {
                            // @ts-ignore
                            newTotals[articleId] = {quantite: 0, nom: articlesById[articleId] || 'Nom inconnu'};
                        }
                        // @ts-ignore
                        newTotals[articleId].quantite += quantite;
                    }
                }
                setArticles(newTotals);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchArticlesData();
    }, []);
    if (!itineraire) {
        return <div>Chargement...</div>;
    }

    function handleModifierClick() {
        // @ts-ignore
        navigate(`/itineraires/route/${itineraire.id}/livraison`, {state: {itineraire}});
        window.location.reload();
    }

    function handleBackClick() {
        const urlSegments = window.location.pathname.split('/');
        const newPath = urlSegments.slice(0, -2).join('/');
        navigate(newPath);
        window.location.reload()
    }

    return (
        <>
            <MenuDer/>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md">
                    <FormComponent>
                        <div className="text-center text-lg font-bold mb-4">
                            {itineraire && itineraire.livreur && (
                                <div>Ma route: {itineraire.livreur.username}</div>
                            )}
                        </div>
                        <div>
                            <img
                                src={back.src}
                                onClick={handleBackClick}
                                alt="Back"
                                className="w-6 h-6 mb-4 cursor-pointer"
                            />
                            <div className="font-bold text-lg mb-4">Itinéraire {itineraire.id}:</div>
                            <table className="w-full border-collapse">
                                <thead>
                                <tr className="border-b">
                                    <th className="py-2">Article</th>
                                    <th className="py-2">Quantité totale</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(articles).map(([articleId, {quantite, nom}]) => (
                                    <tr key={articleId} className="border-b">
                                        <td className="py-2">{nom}</td>
                                        <td className="py-2">{quantite}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button
                                onClick={handleModifierClick}
                                className="mt-4 bg-blue-500 text-white p-2 rounded"
                            >
                                Sélectionner
                            </button>
                        </div>
                    </FormComponent>
                </div>
            </div>
            <LogOutButton/>
        </>
    );

}
