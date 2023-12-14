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

export default function Route() {
    const [itineraire, setItineraire] = useState(null);
    const [articles, setArticles] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const itineraireId = window.location.href.split('/').pop();
        const fetchArticlesData = async () => {
            try {
                const allArticles = await fetchArticles();
                const articlesById = allArticles.reduce((obj, article) => {
                    obj[article.id] = article.nom;
                    return obj;
                }, {});

                const itineraireData = await getItineraireById(itineraireId);
                setItineraire(itineraireData);

                const newTotals = {}; // Créer un nouvel objet pour les totaux
                for (const client of itineraireData.clients) {
                    const livraisonArticlesId = await fetchLivraisonParClient(client.id);
                    const livraisonArticle = await getArticlesByLivraisonsId(livraisonArticlesId);
                    for (const { article: articleId, quantite } of livraisonArticle) {
                        if (!newTotals[articleId]) {
                            newTotals[articleId] = { quantite: 0, nom: articlesById[articleId] || 'Nom inconnu' };
                        }
                        newTotals[articleId].quantite += quantite;
                    }
                }

                setArticles(newTotals); // Mettre à jour l'état avec les nouveaux totaux
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
        navigate(`/itineraires/route/${itineraire.id}/livraison`, { state: { itineraire } });
        window.location.reload();
    }

    function handleBackClick() {
        // Prendre l'URL actuelle et diviser en segments
        const urlSegments = window.location.pathname.split('/');

        // Enlever les deux derniers segments
        const newPath = urlSegments.slice(0, -2).join('/');
        // Rediriger vers la nouvelle URL
        navigate(newPath);
        window.location.reload()
    }

    return (
        <div className="items-center justify-center h-1/3">
            <br></br>
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="flex-grow text-center text-lg font-bold">
                    {itineraire.livreur && (
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
