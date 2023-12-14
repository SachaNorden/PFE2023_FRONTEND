'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchLivraisonParClient, getItineraireById, getLivraisonById} from "@/lib/api";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
import back from "@/public/arrow-left.svg";


interface Itineraire {
    id: string,
    client: object,
    livreur: string,
    status: string,
}

interface Livraison {
    id: string,
    client: Client,
    date_livraison: string,
    status: string,
    isModified: boolean,
}

interface Client {
    id: string,
    nom: string,
}

export default function LivraisonDetail() {
    const [itineraire, setItineraire] = useState<Itineraire | null>(null);
    const [livraisonsDetail, setLivraisonsDetail] = useState<Livraison[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const urlSegments = window.location.href.split('/');
        const itineraireId = urlSegments[urlSegments.length - 2];

        const fetchItineraireData = async () => {
            try {
                const itineraireData = await getItineraireById(itineraireId);
                setItineraire(itineraireData);
                for (const client of itineraireData.clients) {
                    const livraisonsIds = await fetchLivraisonParClient(client.id);
                    for (const livraisonId of livraisonsIds) {
                        const livraisonDetail = await getLivraisonById(livraisonId);
                        // @ts-ignore
                        setLivraisonsDetail(prev => [...prev, {...livraisonDetail, client}]);
                    }
                }
            } catch (error) {
                message.error("Erreur lors de la récupération des données.");
            }
        };

        fetchItineraireData();
    }, []);

    function handleBackClick() {
        const newPath = window.location.pathname.split('/').slice(0, -1).join('/');
        navigate(newPath);
        window.location.reload();
    }

    return (
        <div>
            <FormComponent>
                <img src={back.src} onClick={handleBackClick} alt="Back" className="w-6 h-6"/>
                {livraisonsDetail.length > 0 ? (
                    livraisonsDetail.map((livraison: Livraison, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Livraison {livraison.id} pour {livraison.client.nom} :
                            {livraison.isModified && (
                                <img src="/bell.svg" alt="Modifiée" className="inline ml-2 w-5 h-5"/>
                            )}
                        </span>
                            {livraison.status !== "Livrée" && (
                                <button
                                    onClick={() => {
                                        // @ts-ignore
                                        navigate(`/itineraires/route/${itineraire.id}/livraison/${livraison.id}`);
                                        window.location.reload();
                                    }}
                                    className="text-blue-700 hover:text-blue-900 text-xs font-semibold"
                                >
                                    Détails
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Chargement des détails de livraison...</p>
                )}
            </FormComponent>
        </div>
    )

}
