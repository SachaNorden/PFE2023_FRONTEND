'use client'
import FormComponent from "@/app/ui/Form.component";
import back from "@/public/arrow-left.svg";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
    fetchArticles,
    fetchLivraisonArticle,
    fetchLivraisonParClient,
    getArticlesByLivraisonsId,
    getItineraireById
} from "@/lib/api";
import {message} from "antd";

interface Itineraire {
    id: string,
    client: object,
    livreur: {
        id: string,
        username: string,
        isAdmin: boolean,
    },
    status: string,
}

interface ArticleTotal {
    nom: string,
    quantite: number,
}

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
                        console.log(livraisonArticle)
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
        navigate(`/itineraires/route/${itineraire.id}/livraison`, { state: { itineraire } });
        window.location.reload();
    }

    function handleBackClick() {
        const urlSegments = window.location.pathname.split('/');
        const newPath = urlSegments.slice(0, -2).join('/');
        navigate(newPath);
        window.location.reload()
    }

    return (
        <div className="items-center justify-center h-1/3">
            <br></br>
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="flex-grow text-center text-lg font-bold">
                    {itineraire && itineraire.livreur && (
                        <div>Ma route: {itineraire.livreur.username}</div>
                    )}
                </div>
            </div>
            <FormComponent>
                <div>
                    <img src={back.src} onClick={handleBackClick} alt="Back" className="w-6 h-6"/>
                    <div className="font-bold text-lg mb-4">Itinéraire {itineraire.id}:</div>
                    <p>Article totaux:</p>
                    {Object.entries(articles).map(([articleId, { quantite, nom }]) => {
                        return (
                            <div key={articleId}>
                                <p>Article: {nom}</p>
                                <p>Quantité totale: {quantite}</p>
                            </div>
                        );
                    })}
                    <button onClick={handleModifierClick} className="mt-4 bg-blue-500 text-white p-2 rounded">Sélectionner</button>
                </div>
            </FormComponent>

        </div>
    )
}
