'use client'
import FormComponent from "@/app/ui/Form.component";
import back from "@/public/arrow-left.svg";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {fetchArticles, fetchLivraisonArticle, getItineraireById} from "@/lib/api";
import {message} from "antd";

export default function Route() {
    const [itineraire, setItineraire] = useState(null);
    const [articles, setArticles] = useState({});
    const [totals, setTotals] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const itineraireId = window.location.href.split('/').pop();

        const fetchArticlesData = async () => {
            try {
                // Récupérer les noms des articles
                const allArticles = await fetchArticles();

                // Créer un objet pour accéder facilement aux noms par ID
                const articlesById = allArticles.reduce((obj, article) => {
                    obj[article.id] = article.nom;
                    return obj;
                }, {});

                // Récupérer l'itinéraire et les articles associés
                const itineraireData = await getItineraireById(itineraireId);
                setItineraire(itineraireData);

                // Calculer les totaux pour chaque article
                for (const livraison of itineraireData.commandes) {
                    const livraisonArticles = await fetchLivraisonArticle(livraison.id);
                    for (const { article: articleId, quantite } of livraisonArticles) {
                        if (!totals[articleId]) {
                            totals[articleId] = { quantite: 0, nom: articlesById[articleId] || 'Nom inconnu' };
                        }
                        totals[articleId].quantite += quantite;
                    }
                }

                setArticles(totals);
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
    return (
        <div className="items-center justify-center h-1/3">
            <br></br>
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="flex-initial">
                    {/* Remplace ce div par ton icône de flèche */}

                </div>
                {/* Titre "Ma route" centré */}
                <div className="flex-grow text-center text-lg font-bold">
                    {itineraire.livreur && (
                        <div>Ma route: {itineraire.livreur.username}</div>
                    )}
                </div>
            </div>
            <FormComponent>
                <div>
                    <img src={back.src} alt="Back" className="w-6 h-6"/>
                    <div className="font-bold text-lg mb-4">Itinéraire {itineraire.id}:</div>
                    <p>Article totaux:</p>
                    {Object.entries(articles).map(([articleId, { quantite, nom }]) => (
                        <div key={articleId}>
                            <p>Article: {nom}</p>
                            <p>Quantité totale: {quantite}</p>
                        </div>
                    ))}
                    <button onClick={handleModifierClick} className="mt-4 bg-blue-500 text-white p-2 rounded">Sélectionner</button>
                </div>
            </FormComponent>

        </div>
    )
}
