'use client'
import FormComponent from "@/app/ui/Form.component";
import {useEffect, useState} from "react";
import {fetchLivraison, getItineraireById} from "@/lib/api";
import { message} from "antd";
import {useNavigate} from "react-router-dom";


interface Itineraire {
    id: string,
    client: object,
    livreur: string,
    status: string,
}
interface Livraison {
    id: string,
    client: string,
    date_livraison: string,
    status: string,
    isModified: boolean,
}

export default function LivraisonDetail() {
    const [itineraire, setItineraire] = useState<Itineraire>();
    const [matchedLivraisons, setMatchedLivraisons] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const urlSegments = window.location.href.split('/');
        const routeId = urlSegments[urlSegments.length - 2];

        const fetchItineraireData = async () => {
            try {
                const itineraireData  = await getItineraireById(routeId);
                setItineraire(itineraireData );

                const livraisons = await fetchLivraison()
                // Filtrer les livraisons pour ne garder que celles qui correspondent aux commandes de l'itinéraire
                const matched = livraisons.filter((livraison: any) =>
                    itineraireData.commandes.some((commande: any) =>
                            commande.client.id === livraison.client.id
                        // && itineraire.livreur.id === localstorage.getItem('userId')
                    )
                );
                setMatchedLivraisons(matched);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };

        fetchItineraireData();
    }, []);

    return (
        <div>
            <FormComponent>
                {matchedLivraisons.length > 0 && matchedLivraisons[0] ? (
                    matchedLivraisons.map((livraison: Livraison, index: number) => (
                        <div key={livraison.id} className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Livraison {livraison.id} :
                                {livraison.isModified && (
                                    <img src="/bell.svg" alt="Modifiée" className="inline ml-2 w-5 h-5" />
                                )}
                            </span>
                            {livraison.status !== "Livrée" && (
                                <button
                                    onClick={() => {
                                        if (itineraire) {  // Vérification de non-null
                                            navigate(`/itineraires/route/${itineraire.id}/livraison/${livraison.id}`);
                                            window.location.reload();
                                        } else {
                                            console.error("Erreur: itineraire est null");
                                        }
                                    }}
                                    className="text-blue-700 hover:text-blue-900 text-xs font-semibold"
                                >
                                    Détails
                                </button>
                            )}
                            {/* Ajoutez ici plus de détails sur la livraison si nécessaire */}
                        </div>
                    ))
                ) : (
                    <p>Aucune livraison correspondante trouvée.</p>
                )}
            </FormComponent>
        </div>
    )
}
