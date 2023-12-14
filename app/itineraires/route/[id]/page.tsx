'use client'
import FormComponent from "@/app/ui/Form.component";
import back from "@/public/arrow-left.svg";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {fetchLivraisonArticle, getItineraireById} from "@/lib/api";
import {message} from "antd";

interface Itineraire {
    id: string,
    client: object,
    livreur: Livreur,
    status: string,
}

interface Livreur {
    id: string,
    username: string,
    isAdmin: boolean,
}

interface ArticleTotal {
    nom: string,
    quantite: number,
}
export default function Route() {
    const [itineraire, setItineraire] = useState<Itineraire>();
    const [articlesTotals, setArticlesTotals] = useState<{ [key: string]: ArticleTotal }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const itineraireId = window.location.href.split('/').pop();
        const fetchItineraireData = async () => {
            try {
                // @ts-ignore
                const data = await getItineraireById(itineraireId);
                setItineraire(data);
                const articlesFetchPromises = data.commandes.map((livraison: any) => fetchLivraisonArticle(livraison.id));
                console.log(articlesFetchPromises);
                const articlesResults = await Promise.all(articlesFetchPromises);
                let totals = {};
                articlesResults.forEach((articles) => {

                    articles.forEach((article: { article: { nom: any; }; quantite: any; }) => {
                        const {nom} = article.article;
                        const quantite= article.quantite
                        // @ts-ignore
                        totals[nom] = (totals[nom] || 0) + quantite;
                    });
                });
                setArticlesTotals(totals);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchItineraireData();
    }, []);
    if (!itineraire) {
        return <div>Chargement...</div>;
    }

    function handleModifierClick() {
        // @ts-ignore
        navigate(`/itineraires/route/${itineraire.id}/livraison`, { state: { itineraire } });
        window.location.reload();
    }
    return (
        <div className="items-center justify-center h-1/3">
            <br></br>
            <div className="w-full flex items-center justify-between px-4 py-4">
                <div className="flex-initial">

                </div>
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
                    {Object.values(articlesTotals).map((articleTotal) => (
                        <p key={articleTotal.nom}>
                            {articleTotal.nom}: {articleTotal.quantite}
                        </p>
                    ))}
                    <button onClick={handleModifierClick} className="mt-4 bg-blue-500 text-white p-2 rounded">Sélectionner</button>
                </div>
            </FormComponent>

        </div>
    )
}
