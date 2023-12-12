'use client'
import FormComponent from "@/app/ui/Form.component";
import back from "@/public/arrow-left.svg";
import {useEffect, useState} from "react";
import {fetchLivraisonArticle, getItineraireById} from "@/lib/api";
import {message} from "antd";

export default function Route() {
    const [itineraire, setItineraire] = useState(null);
    const [articlesTotals, setArticlesTotals] = useState({});
    useEffect(() => {
        const itineraireId = window.location.href.split('/').pop();
        const fetchItineraireData = async () => {
            try {
                const data = await getItineraireById(itineraireId);
                setItineraire(data);
                const articlesFetchPromises = data.commandes.map((livraison) => fetchLivraisonArticle(livraison.id));
                const articlesResults = await Promise.all(articlesFetchPromises);
                const totals = {};
                articlesResults.forEach((articles) => {
                    articles.forEach((article) => {
                        const {nom, quantite} = article.article;
                        totals[nom] = (totals[nom] || 0) + quantite;
                    });
                });
                setArticlesTotals(totals);
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchItineraireData();
    }, []);
    if (!itineraire) {
        return <div>Chargement...</div>;
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
                    {Object.entries(articlesTotals).map(([nom, quantite]) => (
                        <p key={nom}>
                            {nom}: {quantite}
                        </p>
                    ))}


                    <button className="mt-4 bg-blue-500 text-white p-2 rounded">Sélectionner</button>

                </div>
            </FormComponent>

        </div>
    )
}
