    'use client'
    import FormComponent from "@/app/ui/Form.component";
    import {useEffect, useState} from "react";
    import {fetchLivraisonParClient, getItineraireById, getLivraisonById} from "@/lib/api";
    import {Button, message} from "antd";
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
        adresse_complete: String,
    }

    const getStatusColorClass = (status: string) => {
        switch (status) {
            case 'En cours':
                return 'text-sm text-green-500 font-bold';
            case 'Livrée':
                return 'text-sm text-red-500 font-bold';
            case 'En préparation':
                return 'text-sm text-gray-500 font-bold';
            default:
                return 'text-sm text-gray-400 font-bold';
        }
    };

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

                    let newLivraisonsDetail: any[] | ((prevState: Livraison[]) => Livraison[]) = []; // Initialise un tableau vide

                    for (const client of itineraireData.clients) {
                        const livraisonsIds = await fetchLivraisonParClient(client.id);
                        for (const livraisonId of livraisonsIds) {
                            const livraisonDetail = await getLivraisonById(livraisonId);
                            // @ts-ignore
                            newLivraisonsDetail = [...newLivraisonsDetail, {...livraisonDetail, client}];
                        }
                    }

                    setLivraisonsDetail(newLivraisonsDetail); // Met à jour livraisonsDetail après la boucle
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
                                <div>
                                    <span className="text-sm font-medium">
                                        Livraison {livraison.id} pour {livraison.client.nom} :
                                        <span className={getStatusColorClass(livraison?.status)}>
                                            {livraison?.status ?? 'Non spécifié'}
                                        </span>
                                        {livraison.isModified && (
                                            <img src="/bell.svg" alt="Modifiée" className="inline ml-2 w-5 h-5"/>
                                        )}
                                    </span>
                                    <p>{livraison.client.adresse_complete}</p>
                                </div>
                                {livraison.status !== "Livrée" && (
                                    <Button
                                        onClick={() => {
                                            // @ts-ignore
                                            navigate(`/itineraires/route/${itineraire.id}/livraison/${livraison.id}`);
                                            window.location.reload();
                                        }}
                                        className="text-blue-700 hover:text-blue-900 text-xs font-semibold"
                                    >
                                        Détails
                                    </Button>
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
